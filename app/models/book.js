import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  author: DS.belongsTo('author'),
  countPages: DS.attr('number'),
  descUrl: DS.attr('string'),
  imgUrl: DS.attr('string'),

  reports: DS.hasMany('report')
});
