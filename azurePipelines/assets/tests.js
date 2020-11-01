'use strict';

define('ember-book-club2/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/book-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/book-form.js should pass ESLint\n\n');
  });

  QUnit.test('components/speaker-form.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/speaker-form.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/book.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/book.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/book/create.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/book/create.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/book/detail.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/book/detail.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/book/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/book/edit.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/speaker.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/speaker.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/speaker/create.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/speaker/create.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/speaker/detail.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/speaker/detail.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/speaker/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/speaker/edit.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/404.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/404.js should pass ESLint\n\n');
  });

  QUnit.test('routes/book.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/book.js should pass ESLint\n\n');
  });

  QUnit.test('routes/book/create.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/book/create.js should pass ESLint\n\n');
  });

  QUnit.test('routes/book/detail.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/book/detail.js should pass ESLint\n\n');
  });

  QUnit.test('routes/book/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/book/edit.js should pass ESLint\n\n');
  });

  QUnit.test('routes/error.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/error.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/loading.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/loading.js should pass ESLint\n\n');
  });

  QUnit.test('routes/speaker.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/speaker.js should pass ESLint\n\n');
  });

  QUnit.test('routes/speaker/create.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/speaker/create.js should pass ESLint\n\n');
  });

  QUnit.test('routes/speaker/detail.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/speaker/detail.js should pass ESLint\n\n');
  });

  QUnit.test('routes/speaker/edit.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/speaker/edit.js should pass ESLint\n\n');
  });

  QUnit.test('services/data.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/data.js should pass ESLint\n\n');
  });
});
define('ember-book-club2/tests/integration/components/book-form-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | book-form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "uGOy+6PC",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"book-form\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "044e3rT8",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"book-form\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('ember-book-club2/tests/integration/components/speaker-form-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | speaker-form', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "qcp+twW8",
        "block": "{\"symbols\":[],\"statements\":[[1,[20,\"speaker-form\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "TWXDckYV",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"speaker-form\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('ember-book-club2/tests/test-helper', ['ember-book-club2/app', 'ember-book-club2/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('ember-book-club2/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/book-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/book-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/speaker-form-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/speaker-form-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/book-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/book-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/book/create-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/book/create-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/book/detail-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/book/detail-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/book/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/book/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/speaker-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/speaker-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/speaker/create-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/speaker/create-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/speaker/detail-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/speaker/detail-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/speaker/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/speaker/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/404-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/404-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/book-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/book-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/book/create-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/book/create-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/book/detail-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/book/detail-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/book/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/book/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/error-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/error-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/loading-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/loading-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/speaker-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/speaker-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/speaker/create-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/speaker/create-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/speaker/detail-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/speaker/detail-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/speaker/edit-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/speaker/edit-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/data-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/data-test.js should pass ESLint\n\n');
  });
});
define('ember-book-club2/tests/unit/controllers/book-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | book', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:book');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/book/create-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | book/create', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:book/create');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/book/detail-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | book/detail', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:book/detail');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/book/edit-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | book/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:book/edit');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/speaker-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | speaker', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:speaker');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/speaker/create-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | speaker/create', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:speaker/create');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/speaker/detail-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | speaker/detail', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:speaker/detail');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/controllers/speaker/edit-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | speaker/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:speaker/edit');
      assert.ok(controller);
    });
  });
});
define('ember-book-club2/tests/unit/routes/404-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | 404', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:404');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/book-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | book', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:book');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/book/create-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | book/create', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:book/create');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/book/detail-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | book/detail', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:book/detail');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/book/edit-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | book/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:book/edit');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/error-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | error', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:error');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/index-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | index', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:index');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/loading-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | loading', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:loading');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/speaker-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | speaker', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:speaker');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/speaker/create-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | speaker/create', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:speaker/create');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/speaker/detail-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | speaker/detail', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:speaker/detail');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/routes/speaker/edit-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | speaker/edit', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:speaker/edit');
      assert.ok(route);
    });
  });
});
define('ember-book-club2/tests/unit/services/data-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Service | data', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let service = this.owner.lookup('service:data');
      assert.ok(service);
    });
  });
});
define('ember-book-club2/config/environment', [], function() {
  var prefix = 'ember-book-club2';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('ember-book-club2/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
