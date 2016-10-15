import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  shoppingListItems: hasMany('shopping-list-item'),
  user: DS.belongsTo('user')


});