import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  name: DS.attr('String'),
  users: hasMany('user', {async: true , inverse: 'pantry'}),
  unconfirmedUsers: hasMany('user', {inverse: 'pendingPantry'}),
  shoppingItems: hasMany('shopping-list-item'),
  purchasedItems: hasMany('purchased-list-item'),

  consumedItems: Ember.computed('purchasedItems', function() {
    //Default is false so we sort in ascending order
    const purchasedItems = this.get('purchasedItems');
    purchasedItems.forEach((item) => {
      console.log(item.get('name'));
    });
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  }),

});
