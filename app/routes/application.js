import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),

  async beforeModel() {
    this._super(...arguments);

    await this.loadUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);

    this.loadUser();
  },

  sessionInvalidated() {
    this.get('currentUser').resetCurrentUser();
    this.transitionTo('login');
  },

  async loadUser() {
    if (this.get('session.isAuthenticated')) {
      await this.get('currentUser').load();
    }
  },

  actions: {
    error(error, transition) {
      if (transition) {
        transition.abort();
      }
      this.intermediateTransitionTo('error', { error: error.message});
      return true;
    }
  }
});
