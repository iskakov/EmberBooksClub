import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  isAdmin: DS.attr('boolean'),
  isWrite: DS.attr('boolean'),

  speakers: DS.hasMany('speaker')
});
