import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async registerSpeaker(speaker) {
      let newSpeaker;
      try {
        newSpeaker = this.get('store').createRecord('speaker', speaker);
        await newSpeaker.save();

        this.transitionToRoute('index');
      }
      catch(e) {
        e.user = newSpeaker;
        this.send('error', e);
      }
    },

    error(error, transition) {
      this.set('errors', error.speaker.errors);
      return false;
    }
  },

  resetErrors() {
    this.set('errors', {});
  }
});
