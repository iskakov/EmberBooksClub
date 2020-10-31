import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),
  setProperties(){
    
  },
  actions: {
    async onsubmit(book) {
      await this.get('dataService').updateBook(book);
      this.transitionToRoute('book.index');
    }
  }
});
