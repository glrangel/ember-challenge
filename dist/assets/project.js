"use strict";



;define('project/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.JSONAPIAdapter.extend({
		host: 'http://localhost:4200/api'
		// host: 'https://crud-authors.herokuapp.com/'
	});
});
;define('project/app', ['exports', 'project/resolver', 'ember-load-initializers', 'project/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
;define('project/components/list-filter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    classNames: ['list-filter'],
    value: '',

    init() {
      this._super(...arguments);
      this.filter('').then(allResults => {
        this.set('results', allResults.results);
      });
    },

    actions: {
      handleFilterEntry() {
        let filterInputValue = this.value;
        let filterAction = this.filter;
        filterAction(filterInputValue).then(filterResults => {
          if (filterResults.query === this.value) {
            this.set('results', filterResults.results);
          }
        });
      }
    }

  });
});
;define('project/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
;define('project/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
;define('project/controllers/authors/author/books', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      updateName(id) {
        let newTitle = this.get('newTitle');
        this.store.findRecord('book', id).then(function (book) {
          book.set('title', newTitle);
          book.save();
        });
        this.set('newTitle', '');
      }
    }
  });
});
;define('project/controllers/authors/author/index', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Controller.extend({

        actions: {
            updateName(id) {
                let newName = this.get('newName');
                this.store.findRecord('author', id).then(function (auth) {
                    auth.set('name', newName);
                    auth.save();
                });
                this.set('newName', '');
            },
            addBook(id) {
                let newBook = this.get('newBook');
                let auth = this.store.peekRecord('author', id);

                let newRecord = this.store.createRecord('book', {
                    author: auth,
                    title: newBook,
                    date: _emberCliMirage.faker.date.past()
                });
                auth.get('books').pushObject(newRecord);
                newRecord.save();
                this.set('newBook', '');
            },
            deleteBook(id) {
                let book = this.store.peekRecord('book', id);
                book.deleteRecord();
                book.save();
            }
        }
    });
});
;define('project/controllers/authors/index', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      createAuthor() {
        let newAuthor = this.get('newAuthor');
        let newRecord = this.store.createRecord('author', {
          name: newAuthor,
          picture: _emberCliMirage.faker.internet.avatar()
        });
        newRecord.save();
        this.set('newAuthor', '');
      },
      deleteAuthor(id) {
        let auth = this.store.peekRecord('author', id);
        auth.deleteRecord();
        auth.save();
      },
      filterByName(param) {
        if (param !== '') {
          return this.store.query('author', { name: param }).then(results => {
            return { query: param, results: results };
          });
        } else {
          return this.store.findAll('author').then(results => {
            return { query: param, results: results };
          });
        }
      }
    }
  });
});
;define('project/helpers/app-version', ['exports', 'project/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
;define('project/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
;define('project/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
;define('project/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'project/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
;define('project/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
;define('project/initializers/ember-cli-mirage', ['exports', 'project/config/environment', 'project/mirage/config', 'ember-cli-mirage/get-rfc232-test-context', 'ember-cli-mirage/start-mirage'], function (exports, _environment, _config, _getRfc232TestContext, _startMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.startMirage = startMirage;
  exports.default = {
    name: 'ember-cli-mirage',
    initialize(application) {
      if (_config.default) {
        application.register('mirage:base-config', _config.default, { instantiate: false });
      }
      if (_config.testConfig) {
        application.register('mirage:test-config', _config.testConfig, { instantiate: false });
      }

      _environment.default['ember-cli-mirage'] = _environment.default['ember-cli-mirage'] || {};
      if (_shouldUseMirage(_environment.default.environment, _environment.default['ember-cli-mirage'])) {
        startMirage(_environment.default);
      }
    }
  };
  function startMirage(env = _environment.default) {
    return (0, _startMirage.default)(null, { env, baseConfig: _config.default, testConfig: _config.testConfig });
  }

  function _shouldUseMirage(env, addonConfig) {
    if (typeof FastBoot !== 'undefined') {
      return false;
    }
    if ((0, _getRfc232TestContext.default)()) {
      return false;
    }
    let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
    let defaultEnabled = _defaultEnabled(env, addonConfig);

    return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
  }

  /*
    Returns a boolean specifying the default behavior for whether
    to initialize Mirage.
  */
  function _defaultEnabled(env, addonConfig) {
    let usingInDev = env === 'development' && !addonConfig.usingProxy;
    let usingInTest = env === 'test';

    return usingInDev || usingInTest;
  }
});
;define('project/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
;define('project/initializers/export-application-global', ['exports', 'project/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
;define('project/instance-initializers/ember-cli-mirage-autostart', ['exports', 'ember-cli-mirage/instance-initializers/ember-cli-mirage-autostart'], function (exports, _emberCliMirageAutostart) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberCliMirageAutostart.default;
    }
  });
});
;define("project/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
;define('project/mirage/config', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {

    this.namespace = 'api';

    //allows for searchable authors
    this.get('/authors', function (db, request) {
      if (request.queryParams.name !== undefined) {
        let filteredAuthors = db.authors.all().filter(function (i) {
          return i.name.toLowerCase().indexOf(request.queryParams.name.toLowerCase()) !== -1;
        });
        return filteredAuthors;
      } else return db.authors.all();
    });
    this.post('/authors');

    this.get('/books');
    this.post('/books');

    this.get('/authors/:id');
    this.del('/authors/:id');
    this.patch('/authors/:id');

    this.get('/books/:id');
    this.del('/books/:id');
    this.patch('/books/:id');
  };
});
;define('project/mirage/factories/author', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCliMirage.default.Factory.extend({
    name() {
      return _emberCliMirage.faker.name.findName();
    },
    picture() {
      return _emberCliMirage.faker.internet.avatar();
    },
    afterCreate(author, server) {
      server.create('book', { author });
      server.create('book', { author });
    }
  });
});
;define('project/mirage/factories/book', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberCliMirage.default.Factory.extend({
        author(i) {
            return i;
        },
        title() {
            return _emberCliMirage.faker.random.words();
        },
        date() {
            return _emberCliMirage.faker.date.past();
        }
    });
});
;define('project/mirage/models/author', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberCliMirage.Model.extend({
        books: (0, _emberCliMirage.hasMany)()
    });
});
;define('project/mirage/models/book', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberCliMirage.Model.extend({
        author: (0, _emberCliMirage.belongsTo)()
    });
});
;define('project/mirage/scenarios/default', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function (server) {
        for (var i = 0; i < 4; i++) {
            server.create('author');
        }
    };
});
;define('project/mirage/serializers/application', ['exports', 'ember-cli-mirage'], function (exports, _emberCliMirage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCliMirage.JSONAPISerializer.extend({});
});
;define('project/models/author', ['exports', 'ember-data'], function (exports, _emberData) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = _emberData.default.Model.extend({
		name: _emberData.default.attr('string'),
		picture: _emberData.default.attr(),
		books: _emberData.default.hasMany('book')
	});
});
;define('project/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _emberData.default.Model.extend({
        author: _emberData.default.belongsTo('author'),
        title: _emberData.default.attr('string'),
        date: _emberData.default.attr()
    });
});
;define('project/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
;define('project/router', ['exports', 'project/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('authors', { path: '/authors' }, function () {
      this.route('author', { path: '/:author_id' }, function () {
        this.route('books', { path: '/books/:book_id' });
      });
    });
  });

  exports.default = Router;
});
;define('project/routes/application', ['exports'], function (exports) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.default = Ember.Route.extend({
      redirect: function () {
         this.transitionTo('/authors/');
      }
   });
});
;define('project/routes/authors/author', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Ember.Route.extend({
        model(params) {
            return Ember.RSVP.hash({
                author: this.store.findRecord('author', params.author_id),
                books: this.store.findRecord('author', params.author_id, { include: 'books' })
            });
        }

    });
});
;define('project/routes/authors/books', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model(params) {
      return this.store.findRecord('book', params.book_id);
    }
  });
});
;define('project/routes/authors/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model() {
      return this.store.findAll('author');
    }
  });
});
;define('project/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
;define("project/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1SDwr07F", "block": "{\"symbols\":[],\"statements\":[[7,\"br\"],[9],[10],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"center pure-u-1\"],[9],[0,\"\\n    \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[11,\"onclick\",\"window.history.back()\"],[9],[0,\"Back\"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "project/templates/application.hbs" } });
});
;define("project/templates/authors/author/books", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "3xEMTSxB", "block": "{\"symbols\":[],\"statements\":[[7,\"div\"],[11,\"class\",\"center\"],[9],[0,\"\\n    \"],[7,\"u\"],[9],[7,\"p\"],[11,\"class\",\"name-lg\"],[9],[0,\"Book Info\"],[10],[10],[0,\"\\n    \"],[7,\"i\"],[11,\"class\",\"name margins\"],[9],[0,\"Author\"],[10],[0,\"\\n    \"],[7,\"p\"],[11,\"class\",\"name-lg margins-all\"],[9],[1,[23,[\"model\",\"author\",\"name\"]],false],[10],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"i\"],[11,\"class\",\"name margins\"],[9],[0,\"Title\"],[10],[0,\"\\n    \"],[7,\"p\"],[11,\"class\",\"name-lg margins-all\"],[9],[1,[23,[\"model\",\"title\"]],false],[10],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"i\"],[11,\"class\",\"name margins\"],[9],[0,\"Publication Date\"],[10],[0,\"\\n    \"],[7,\"p\"],[11,\"class\",\"name-lg margins-all\"],[9],[1,[23,[\"model\",\"date\"]],false],[10],[0,\"\\n    \"],[7,\"div\"],[9],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n    \"],[7,\"form\"],[11,\"class\",\"pure-form\"],[3,\"action\",[[22,0,[]],\"updateName\",[23,[\"model\",\"id\"]]],[[\"on\"],[\"submit\"]]],[9],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"required\",\"value\",\"placeholder\"],[true,[23,[\"newTitle\"]],\"Update Book Title\"]]],false],[0,\"\\n        \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[9],[0,\"Update Title\"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "project/templates/authors/author/books.hbs" } });
});
;define("project/templates/authors/author/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "vE9v3iaT", "block": "{\"symbols\":[\"book\"],\"statements\":[[2,\" <div class=\\\"center\\\"> \"],[0,\"\\n\"],[7,\"div\"],[11,\"class\",\"center pure-u-1\"],[9],[0,\"\\n    \"],[7,\"p\"],[11,\"class\",\"name-lg\"],[9],[1,[23,[\"model\",\"author\",\"name\"]],false],[10],[0,\"\\n    \"],[7,\"img\"],[12,\"src\",[23,[\"model\",\"author\",\"picture\"]]],[9],[10],[0,\"\\n    \"],[7,\"div\"],[9],[0,\"\\n        \"],[7,\"br\"],[9],[10],[0,\"\\n        \"],[7,\"form\"],[11,\"class\",\"pure-form\"],[3,\"action\",[[22,0,[]],\"updateName\",[23,[\"model\",\"author\",\"id\"]]],[[\"on\"],[\"submit\"]]],[9],[0,\"\\n            \"],[1,[27,\"input\",null,[[\"required\",\"value\",\"placeholder\"],[true,[23,[\"newName\"]],\"Update Authors Name\"]]],false],[0,\"\\n            \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[9],[0,\"Update Name\"],[10],[0,\"\\n        \"],[10],[0,\"\\n        \"],[7,\"br\"],[9],[10],[0,\"\\n        \"],[7,\"form\"],[11,\"class\",\"pure-form\"],[3,\"action\",[[22,0,[]],\"addBook\",[23,[\"model\",\"author\",\"id\"]]],[[\"on\"],[\"submit\"]]],[9],[0,\"\\n            \"],[1,[27,\"input\",null,[[\"required\",\"value\",\"placeholder\"],[true,[23,[\"newBook\"]],\"Book Title\"]]],false],[0,\"\\n            \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[9],[0,\"Add Book\"],[10],[0,\"\\n        \"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"p\"],[11,\"class\",\"name-lg margins\"],[9],[0,\"\\n        \"],[7,\"i\"],[9],[7,\"u\"],[9],[0,\"Books\"],[10],[10],[0,\"\\n    \"],[10],[0,\"\\n\"],[4,\"each\",[[23,[\"model\",\"books\",\"books\"]]],null,{\"statements\":[[0,\"        \"],[7,\"div\"],[11,\"class\",\"center pure-u-1-4\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"authors.author.books\",[22,1,[\"id\"]]],[[\"class\"],[\"remove\"]],{\"statements\":[[0,\"            \"],[7,\"p\"],[11,\"class\",\"name remove\"],[9],[1,[22,1,[\"title\"]],false],[10],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[3,\"action\",[[22,0,[]],\"deleteBook\",[22,1,[\"id\"]]]],[9],[7,\"i\"],[11,\"class\",\"fa fa-trash\"],[11,\"aria-hidden\",\"true\"],[9],[10],[10],[0,\"\\n        \"],[10],[0,\"\\n\"]],\"parameters\":[1]},null],[10],[0,\"\\n\"],[1,[21,\"outlet\"],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "project/templates/authors/author/index.hbs" } });
});
;define("project/templates/authors/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2qKcKCjm", "block": "{\"symbols\":[\"filteredResults\",\"author\"],\"statements\":[[7,\"div\"],[11,\"class\",\"flex pure-g\"],[9],[0,\"\\n  \"],[7,\"div\"],[11,\"class\",\"center pure-u-1\"],[9],[0,\"\\n\"],[7,\"h1\"],[11,\"class\",\"title\"],[9],[0,\" Authors \"],[10],[0,\"\\n\"],[7,\"div\"],[9],[0,\"\\n    \"],[7,\"form\"],[11,\"class\",\"pure-form\"],[3,\"action\",[[22,0,[]],\"createAuthor\"],[[\"on\"],[\"submit\"]]],[9],[0,\"\\n        \"],[1,[27,\"input\",null,[[\"required\",\"value\",\"placeholder\"],[true,[23,[\"newAuthor\"]],\"Enter Authors Name\"]]],false],[0,\"\\n        \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[9],[0,\"Add Author\"],[10],[0,\"\\n    \"],[10],[0,\"\\n    \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[10],[0,\"\\n\"],[4,\"list-filter\",null,[[\"class\",\"filter\"],[\"pure-form\",[27,\"action\",[[22,0,[]],\"filterByName\"],null]]],{\"statements\":[[0,\"    \"],[7,\"br\"],[9],[10],[0,\"\\n\"],[4,\"each\",[[22,1,[]]],null,{\"statements\":[[0,\"            \"],[7,\"div\"],[11,\"class\",\"center pure-u-1-4\"],[9],[0,\"\\n                \"],[7,\"p\"],[11,\"class\",\"name\"],[9],[1,[22,2,[\"name\"]],false],[10],[0,\"\\n                \"],[4,\"link-to\",[\"authors.author\",[22,2,[\"id\"]]],null,{\"statements\":[[7,\"img\"],[11,\"class\",\"\"],[12,\"src\",[22,2,[\"picture\"]]],[9],[10]],\"parameters\":[]},null],[0,\"\\n                \"],[7,\"br\"],[9],[10],[0,\"\\n                \"],[7,\"button\"],[11,\"class\",\"pure-button\"],[3,\"action\",[[22,0,[]],\"deleteAuthor\",[22,2,[\"id\"]]]],[9],[7,\"i\"],[11,\"class\",\"fa fa-trash\"],[11,\"aria-hidden\",\"true\"],[9],[10],[0,\"\\n                \"],[10],[0,\"\\n            \"],[10],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[1]},null],[0,\"    \"],[7,\"br\"],[9],[10],[7,\"br\"],[9],[10],[0,\"\\n \"],[10],[0,\"\\n\"],[10],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "project/templates/authors/index.hbs" } });
});
;define("project/templates/components/list-filter", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8/0MWhn3", "block": "{\"symbols\":[\"&default\"],\"statements\":[[1,[27,\"input\",null,[[\"value\",\"key-up\",\"class\",\"placeholder\"],[[23,[\"value\"]],[27,\"action\",[[22,0,[]],\"handleFilterEntry\"],null],\"light\",\"Filter By Name\"]]],false],[0,\"\\n\"],[14,1,[[23,[\"results\"]]]],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "project/templates/components/list-filter.hbs" } });
});
;define('project/tests/mirage/mirage.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | mirage');

  QUnit.test('mirage/config.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/factories/author.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/author.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/factories/book.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/book.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/models/author.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/author.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/models/book.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/models/book.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/scenarios/default.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass ESLint\n\n');
  });

  QUnit.test('mirage/serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/serializers/application.js should pass ESLint\n\n');
  });
});
;

;define('project/config/environment', [], function() {
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

;
          if (!runningTests) {
            require("project/app")["default"].create({"name":"project","version":"0.0.0+f0d1e365"});
          }
        
//# sourceMappingURL=project.map
