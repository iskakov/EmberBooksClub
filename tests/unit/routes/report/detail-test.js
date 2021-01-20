import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | report/detail', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:report/detail');
    assert.ok(route);
  });
});
