import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isAdmin: DS.attr('string'),
  isWrite: DS.attr('string'),

  speakers: DS.hasMany('speaker')
});
