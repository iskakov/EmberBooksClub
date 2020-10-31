import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('id'), 
        title: this.get('title')
      })
    }
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.setProperties({
      title: this.get('book.title'),
      id: this.get('book.id') ? this.get('book.id') : undefined
    })
  }
});
