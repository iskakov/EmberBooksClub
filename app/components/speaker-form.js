import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitForm(e) {
      e.preventDefault();

      this.onsubmit({
        id: this.get('id'),
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      })
    }
  },
  didReceiveAttrs(){
    this._super(...arguments);
    this.setProperties({
      firstName: this.get('speaker.firstName'),
      lastName: this.get('speaker.lastName'),
      id: this.get('speaker.id') ? this.get('speaker.id') : undefined
    })
  }
});
