import Component from '@ember/component';

export default Component.extend({
  actions: {
    async registerSpeaker(e) {
      e.preventDefault();

      this.get('onSubmit')({
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        firstName: this.get('firstName'),
        lastName: this.get('lastName')
      });
    }
  },

  didReceiveAttrs() {
    this.setProperties({
      email: this.get('speaker.email'),
      password: this.get('speaker.password'),
      firstName: this.get('speaker.firstName'),
      lastName: this.get('speaker.lastName'),
      passwordConfirmation: this.get('speaker.passwordConfirmation'),
    });
  }
});
