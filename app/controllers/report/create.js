import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async saveReport(report) {
      try {
        const newReport = this.store.createRecord('report', report);

        await newReport.save();

        this.transitionToRoute('report.index');
      }
      catch(e) {
        this.send('error', e)
      }
    }
  }
});
