import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  dataService: service('data'),

  actions: {
    async onsubmit(report) {
      try {
        this.get('model').setProperties(report);
        await this.get('model').save();

        this.transitionToRoute('report.index');
      }
      catch(e) {
        this.send('error', e);
      }
    }
  }
});
