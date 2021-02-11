import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  currentUser: service(),
  moment: service(),
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
    },

    searchSpeaker(query) {
      return this.get('store').query('speaker', { q: query })
    },

    searchBook(query) {
      return this.get('store').query('book', { q: query })
    }
  },
  async didReceiveAttrs(){
    this._super(...arguments);
    let currBook = this.get('book') ? this.get('book') : this.get('report.book');
    let currDate = this.get('report') ? this.get('report.date') : this.get('moment').moment(new Date()).format('YYYY-MM-DD');
    let currSpeaker = this.get('report') ? this.get('report.speaker') : this.get('currentUser.user');
    this.setProperties({
      book: currBook,
      speaker:  currSpeaker,
      date: currDate,
      shortReview: this.get('report.shortReview'),
      raiting: this.get('report.raiting'),
      presentationUrl: this.get('report.presentationUrl'),
      videoUrl: this.get('report.videoUrl'),
      id: this.get('report.id') ? this.get('report.id') : undefined
    })
  }
});
