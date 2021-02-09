import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  actions: {
    async onSubmit(author) {
      try {
        this.get('model').setProperties(author);
        await this.get('model').save();

        this.transitionToRoute('author.index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
