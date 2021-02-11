import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveBook(book) {
      try {
        let newBook = this.get('store').createRecord('book', book);
        await newBook.save();

        this.transitionToRoute('author.detail', this.get('model.author.id'));
      }
      catch (e) {
        this.send('error', e);
      }
    }
  }
});
