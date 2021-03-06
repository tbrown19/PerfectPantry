import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  user: DS.belongsTo('user', {async: true}),
  purchasedListItems: hasMany('purchased-list-item', { async: true }),

});
