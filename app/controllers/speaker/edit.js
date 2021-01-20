import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  actions: {
    async onsubmit(speaker) {
      try {
        this.get('model').setProperties(speaker);
        await this.get('model').save();

        this.transitionToRoute('speaker.index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
