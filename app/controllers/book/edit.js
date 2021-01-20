import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  actions: {
    async onsubmit(book) {
      try {
        this.get('model').setProperties(book);
        await this.get('model').save();

        this.transitionToRoute('book.index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
