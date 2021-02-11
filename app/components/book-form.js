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
    },

    searchAutnor(query) {
      return this.get('store').query('autnor', { q: query })
    },
  },
  didReceiveAttrs(){
    this._super(...arguments);
    let currAuthor = this.get('author') ? this.get('author') : this.get('book.author')
    this.setProperties({
      title: this.get('book.title'),
      countPages: this.get('book.countPages'),
      imgUrl: this.get('book.imgUrl'),
      descUrl: this.get('book.descUrl'),
      author: currAuthor,
      id: this.get('book.id') ? this.get('book.id') : undefined
    })
  }
});
