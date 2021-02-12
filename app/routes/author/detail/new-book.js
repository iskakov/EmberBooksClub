import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
export default Route.extend(AuthenticatedRouteMixin, {
  model() {
    const author = this.modelFor('author.detail');

    return {
      author,
      book: {
        title: '',
        isbn: '',
        publishDate: '',
        author
      }
    }
  }
});
