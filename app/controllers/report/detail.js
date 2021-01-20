import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async deleteReport() {
      try {
        await this.model.destroyRecord();
        this.transitionToRoute('report.index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
