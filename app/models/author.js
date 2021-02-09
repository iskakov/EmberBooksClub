import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  yearsOfLife: DS.attr('string'),

  books: DS.hasMany('book')
});
