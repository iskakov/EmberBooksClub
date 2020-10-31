import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  model({ id }) {
    return this.get('dataService').getSpeaker(id);
  },

  actions: {
    async deleteSpeaker(speaker) {
      await this.get('dataService').deleteBook(speaker);
      this.transitionToRoute('speaker.index');
    }
  }
});
