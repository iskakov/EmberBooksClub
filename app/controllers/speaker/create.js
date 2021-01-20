import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async saveSpeaker(speaker) {
      try {
        const newspeaker = this.store.createRecord('speaker', speaker);

        await newspeaker.save();

        this.transitionToRoute('speaker.index');
      }
      catch(e) {
        this.send('error', e)
      }
    }
  }
});
