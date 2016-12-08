import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('dashboard');
    }
  },

  actions: {
    signUp(firstName,email,password) {
      const auth = this.get('firebaseApp').auth();
      auth.createUserWithEmailAndPassword(email, password).
      then((userResponse) => {
        const user = this.store.createRecord('user', {
          firstName: firstName,
          email: userResponse.email,
        });
        // First we save the user, then we can go about updating their pantry and shopping list.
        user.save().then(() => {
          //Create a new empty pantry
          const pantry = this.get('store').createRecord('pantry');

          //Create a new empty shopping list
          const shoppingList = this.get('store').createRecord('shopping-list', {
            name: "Shopping List",
          });


          user.set('pantry', pantry);
          user.set('shoppingList', shoppingList);
          pantry.save();
          shoppingList.save();

          return user.save().then(() => {
            this.transitionTo('sign-in');
          });
        });
      });
    }
  }
});
