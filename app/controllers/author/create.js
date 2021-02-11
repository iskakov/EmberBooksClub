import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async saveAuthor(author) {
      try {
        const newAuthor = this.store.createRecord('author', author);

        await newAuthor.save();

        this.transitionToRoute('author.index');
      }
      catch(e) {
        this.send('error', e)
      }
    }
  }
});
