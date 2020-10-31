import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  actions: {
    async deleteBook(book) {
      alert('Book deleted!!!');
      await this.get('dataService').deleteBook(book);
      this.transitionToRoute('book.index');
    }
  }
});
