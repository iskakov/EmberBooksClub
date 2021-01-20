import DS from 'ember-data';

export default DS.Model.extend({
  date: DS.attr('date-string'),
  shortReview: DS.attr('string'),
  raiting: DS.attr('number'),
  presentationUrl: DS.attr('string'),
  videoUrl: DS.attr('string'),

  book: DS.belongsTo('book'),
  speaker: DS.belongsTo('speaker')
});
