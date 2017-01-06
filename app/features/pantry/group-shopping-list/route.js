import Ember from 'ember';
import moment from 'moment';

export default Ember.Route.extend({

  model: function () {
    return this.modelFor('application').get('purchasedList');
  },


  actions: {
    purchaseItem(item){

      const price = window.prompt("Enter the price of the item");
      //Make sure the value is a digit only.
      if (!isNaN(price) && price > 0) {
        console.log("so you want to buy: " + item.get('name'));
        console.log("And it costs: " + price);


        //Create a new purchased list item taking attributes from the shopping list item object
        const purchasedItem = this.get('store').createRecord('purchased-list-item', {
          name: item.get('name'),
          quantity: item.get('quantity'),
          price: price,
          purchasedDate: moment().format(),
          purchasedDateFormatted: moment().format('MM-DD-YYYY')
        });

        const pantry = this.modelFor('pantry');
        pantry.get('purchasedItems').pushObject(purchasedItem);
        pantry.save();
        console.log(purchasedItem.get('purchasedDate'));
        //Then add it to the shopping list and save both objects.
        const purchasedList = this.currentModel;
        purchasedList.get('purchasedListItems').pushObject(purchasedItem);
        purchasedList.save().then(function () {
          purchasedItem.save();
        });

      }


    }
  }
});
