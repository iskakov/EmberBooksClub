import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async deleteReport(report) {
      await this.get('dataService').deletereport(report);
      this.transitionToRoute('report.index');
    }
  }
});
