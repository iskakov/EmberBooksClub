import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
export default Route.extend(AuthenticatedRouteMixin, {
  model({ id }) {
    return this.get('store').findRecord('speaker', id);
  }
});
