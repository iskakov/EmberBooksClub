import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  actions: {
    async saveBook(book) {
      try {
        const newBook = this.store.createRecord('book', book);

        await newBook.save();

        this.transitionToRoute('book.index');
      }
      catch(e) {
        this.send('error', e)
      }
    }
  }
});
