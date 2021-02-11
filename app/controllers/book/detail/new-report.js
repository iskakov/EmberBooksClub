import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveReport(report) {
      try {
        const newReport = this.get('store').createRecord('report', report);

        await newReport.save();

        this.transitionToRoute('book.detail', this.get('model.book.id'));
      }
      catch(e) {
        this.send('error', e)
      }
    }
  }
});
