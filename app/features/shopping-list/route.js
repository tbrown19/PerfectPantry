import Ember from 'ember';

export default Ember.Route.extend({

  userID: "",


  beforeModel(){
    //Before the model loads get the users ID so that it can be used to find their pantry.
    var userEmail = this.get('session').get('currentUser.email');
    this.store.query('user', {
      orderBy: 'email', equalTo: userEmail
    }).then((allUsers) => {
      //Then select the user, set their pantry to the current one, and save both models.
      this.set('userID', allUsers.objectAt(0).get('shoppingList.id'));
    });
  },

  model(){
    //Put the return ember rsvp hash inside of this
    //Needs to be inside of this find all because the promise needs a chance to complete first.
    // return this.store.findAll('shopping-list').then((shoppingLists) => {
    //   var shoppingList = shoppingLists.filterBy("id", this.get('userID')).objectAt(0);
    //   return shoppingList.get('shoppingListItems').then((items) => {
    //     return Ember.RSVP.hash({
    //       shoppingList: shoppingList,
    //       shoppingListItems: items
    //     });
    //   });
    // });

    return this.store.findAll('shopping-list').then((shoppingLists) => {
      return shoppingLists.filterBy("id", this.get('userID')).objectAt(0);
    });

  },


  actions: {
    addNewItems(itemName){

      console.log("does this get called? aka the route actions?");
      //Create a new shopping list item
      var newItem = this.get('store').createRecord('shopping-list-item', {
        name: itemName
      });


      this.get('store').findAll('shopping-list').then((shoppingLists) => {
        //Set the shopping list equal to the first object(should be only object)
        let shoppingList = shoppingLists.filterBy("id", this.get('userID')).objectAt(0);
        //Then push the newly created item to the shopping list
        shoppingList.get('shoppingListItems').pushObject(newItem);
        //Then first save the new item, then save the shopping list.
        shoppingList.save().then(function () {
          newItem.save();
        });
      });

    }
  }
});

