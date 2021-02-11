import Route from '@ember/routing/route';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    const book = this.modelFor('book.detail');

    return {
      book,
      report: {
        title: '',
        isbn: '',
        publishDate: '',
        book
      }
    }
  }
});
