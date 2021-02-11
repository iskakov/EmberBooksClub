import DS from 'ember-data';

export default DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr(),
  passwordConfirmation: DS.attr(),

  reports: DS.hasMany('report'),
  group: DS.belongsTo('group')
});
