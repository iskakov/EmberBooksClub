import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('id'), 
        countPages: this.get('countPages'), 
        imgUrl: this.get('imgUrl'), 
        descUrl: this.get('descUrl'), 
        author: this.get('author'), 
        title: this.get('title')
      })
    }
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.setProperties({
      title: this.get('book.title'),
      countPages: this.get('book.countPages'),
      imgUrl: this.get('book.imgUrl'),
      descUrl: this.get('book.descUrl'),
      author: this.get('book.author'),
      id: this.get('book.id') ? this.get('book.id') : undefined
    })
  }
});
