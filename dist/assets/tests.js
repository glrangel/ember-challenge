'use strict';

define('project/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/authors/author/books.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/authors/author/books.js should pass ESLint\n\n8:11 - Unexpected console statement. (no-console)\n9:11 - Unexpected console statement. (no-console)');
  });

  QUnit.test('controllers/authors/author/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/authors/author/index.js should pass ESLint\n\n');
  });

  QUnit.test('controllers/authors/index.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'controllers/authors/index.js should pass ESLint\n\n11:20 - \'faker\' is not defined. (no-undef)');
  });

  QUnit.test('models/author.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/author.js should pass ESLint\n\n');
  });

  QUnit.test('models/book.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/book.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/authors/author.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/authors/author.js should pass ESLint\n\n9:9 - Unexpected console statement. (no-console)\n10:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/authors/books.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'routes/authors/books.js should pass ESLint\n\n6:9 - Unexpected console statement. (no-console)\n7:9 - Unexpected console statement. (no-console)');
  });

  QUnit.test('routes/authors/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/authors/index.js should pass ESLint\n\n');
  });
});
define('project/tests/test-helper', ['project/app', 'project/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('project/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/author-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/author-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/author-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/author-test.js should pass ESLint\n\n');
  });
});
define('project/tests/unit/adapters/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Adapter | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let adapter = this.owner.lookup('adapter:application');
      assert.ok(adapter);
    });
  });
});
define('project/tests/unit/controllers/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define('project/tests/unit/models/author-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Model | author', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let model = store.createRecord('author', {});
      assert.ok(model);
    });
  });
});
define('project/tests/unit/routes/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:application');
      assert.ok(route);
    });
  });
});
define('project/tests/unit/routes/author-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Route | author', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    (0, _qunit.test)('it exists', function (assert) {
      let route = this.owner.lookup('route:author');
      assert.ok(route);
    });
  });
});
define('project/config/environment', [], function() {
  var prefix = 'project';
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

require('project/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
