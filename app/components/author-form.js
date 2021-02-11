import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('id'),
        firstName: this.get('firstName'),
        lastName: this.get('lastName'),
        yearsOfLife: this.get('yearsOfLife')
      })
    }
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.setProperties({
      firstName: this.get('author.firstName'),
      lastName: this.get('author.lastName'),
      yearsOfLife: this.get('author.yearsOfLife'),
      id: this.get('author.id') ? this.get('author.id') : undefined
    })
  }
});
