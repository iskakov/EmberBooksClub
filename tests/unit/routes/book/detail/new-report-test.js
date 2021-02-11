import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | book/detail/new-report', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:book/detail/new-report');
    assert.ok(route);
  });
});
