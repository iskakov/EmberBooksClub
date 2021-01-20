import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service('store'),
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('id'),
        book: this.get('book'),
        speaker: this.get('speaker'),
        date: this.get('date'),
        shortReview: this.get('shortReview'),
        raiting: this.get('raiting'),
        presentationUrl: this.get('presentationUrl'),
        videoUrl: this.get('videoUrl')
      })
    }
  },
  async didReceiveAttrs(){
    this._super(...arguments);
    let books =  await this.get('store').findAll('book');
    let speakers =  await this.get('store').findAll('speaker');
    this.setProperties({
      book: this.get('report.book'),
      books: books,
      speakers: speakers,
      speaker:  this.get('report.speaker'),
      date: this.get('report.date'),
      shortReview: this.get('report.shortReview'),
      raiting: this.get('report.raiting'),
      presentationUrl: this.get('report.presentationUrl'),
      videoUrl: this.get('report.videoUrl'),
      id: this.get('report.id') ? this.get('report.id') : undefined
    })
  }
});
