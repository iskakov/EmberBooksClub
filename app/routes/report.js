import Route from '@ember/routing/route';

export default Route.extend({
  model({ search }) {
    if (search) {
      return this.store.query('report', {q: search});
    }
    return this.store.findAll('report');
  },
});
