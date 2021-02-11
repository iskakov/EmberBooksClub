import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  actions: {
    async deleteAuthor() {
      try {
        await this.model.destroyRecord();
        this.transitionToRoute('author.index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
