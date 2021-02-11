"use strict";



define('ember-book-club2/abilities/author', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isWrite'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile(),

    canCreate: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          console.log(group);
          resolve(group.get('isAdmin'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile()
  });
});
define('ember-book-club2/abilities/book', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isWrite'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile(),

    canCreate: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isAdmin'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile()
  });
});
define('ember-book-club2/abilities/report', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isWrite'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile(),

    canCreate: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isAdmin'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile()
  });
});
define('ember-book-club2/abilities/speaker', ['exports', 'ember-can'], function (exports, _emberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberCan.Ability.extend({
    currentUser: Ember.inject.service(),
    session: Ember.inject.service(),

    // only the person who wrote a post can edit it
    canEdit: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isWrite'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile(),

    canCreate: Ember.computed(function () {
      if (!this.get('session.isAuthenticated')) {
        return false;
      }
      console.log(this.get('currentUser.user.group'));
      return new Ember.RSVP.Promise((resolve, reject) => {
        return this.get('currentUser.user.group').then(group => {
          resolve(group.get('isAdmin'));
        }).catch(() => {
          reject(false);
        });
      });
    }).volatile()
  });
});
define('ember-book-club2/adapters/application', ['exports', 'ember-data', 'ember-book-club2/config/environment'], function (exports, _emberData, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    host: _environment.default.backendURL,
    session: Ember.inject.service(),

    headers: Ember.computed(function () {
      let resultHeaders = {
        'Content-Type': 'application/json'
      };

      if (this.get('session.isAuthenticated')) {
        resultHeaders['Authorization'] = `Bearer ${this.session.data.authenticated.token}`;
      }

      return resultHeaders;
    }).volatile(),

    buildURL(modelName, id, snapshot, requestType, query) {
      let url = this._super(...arguments);

      if (modelName === 'speaker' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }

      if (modelName === 'book' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }

      if (modelName === 'author' && requestType === 'findRecord' && id) {
        url += '?_embed=books';
      }
      return url;
    }
  });
});
define('ember-book-club2/adapters/speaker', ['exports', 'ember-book-club2/adapters/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    urlForQueryRecord(query) {
      if (query.me) {
        delete query.me;

        return `${this._super(...arguments)}/me`;
      }

      return this._super(...arguments);
    }
  });
});
define('ember-book-club2/app', ['exports', 'ember-book-club2/resolver', 'ember-load-initializers', 'ember-book-club2/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
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
define('ember-book-club2/components/author-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      submitForm(e) {
        e.preventDefault();

        this.onsubmit({
          id: this.get('id'),
          firstName: this.get('firstName'),
          lastName: this.get('lastName'),
          yearsOfLife: this.get('yearsOfLife')
        });
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this.setProperties({
        firstName: this.get('author.firstName'),
        lastName: this.get('author.lastName'),
        yearsOfLife: this.get('author.yearsOfLife'),
        id: this.get('author.id') ? this.get('author.id') : undefined
      });
    }
  });
});
define('ember-book-club2/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('ember-book-club2/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('ember-book-club2/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('ember-book-club2/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('ember-book-club2/components/book-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      submitForm(e) {
        e.preventDefault();

        this.onsubmit({
          id: this.get('id'),
          countPages: this.get('countPages'),
          imgUrl: this.get('imgUrl'),
          descUrl: this.get('descUrl'),
          author: this.get('author'),
          title: this.get('title')
        });
      },

      searchAutnor(query) {
        return this.get('store').query('autnor', { q: query });
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      let currAuthor = this.get('author') ? this.get('author') : this.get('book.author');
      this.setProperties({
        title: this.get('book.title'),
        countPages: this.get('book.countPages'),
        imgUrl: this.get('book.imgUrl'),
        descUrl: this.get('book.descUrl'),
        author: currAuthor,
        id: this.get('book.id') ? this.get('book.id') : undefined
      });
    }
  });
});
define('ember-book-club2/components/bs-accordion', ['exports', 'ember-bootstrap/components/bs-accordion'], function (exports, _bsAccordion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAccordion.default;
    }
  });
});
define('ember-book-club2/components/bs-accordion/item', ['exports', 'ember-bootstrap/components/bs-accordion/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('ember-book-club2/components/bs-accordion/item/body', ['exports', 'ember-bootstrap/components/bs-accordion/item/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('ember-book-club2/components/bs-accordion/item/title', ['exports', 'ember-bootstrap/components/bs-accordion/item/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('ember-book-club2/components/bs-alert', ['exports', 'ember-bootstrap/components/bs-alert'], function (exports, _bsAlert) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsAlert.default;
    }
  });
});
define('ember-book-club2/components/bs-button-group', ['exports', 'ember-bootstrap/components/bs-button-group'], function (exports, _bsButtonGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButtonGroup.default;
    }
  });
});
define('ember-book-club2/components/bs-button-group/button', ['exports', 'ember-bootstrap/components/bs-button-group/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('ember-book-club2/components/bs-button', ['exports', 'ember-bootstrap/components/bs-button'], function (exports, _bsButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsButton.default;
    }
  });
});
define('ember-book-club2/components/bs-carousel', ['exports', 'ember-bootstrap/components/bs-carousel'], function (exports, _bsCarousel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCarousel.default;
    }
  });
});
define('ember-book-club2/components/bs-carousel/slide', ['exports', 'ember-bootstrap/components/bs-carousel/slide'], function (exports, _slide) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slide.default;
    }
  });
});
define('ember-book-club2/components/bs-collapse', ['exports', 'ember-bootstrap/components/bs-collapse'], function (exports, _bsCollapse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsCollapse.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown', ['exports', 'ember-bootstrap/components/bs-dropdown'], function (exports, _bsDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsDropdown.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown/button', ['exports', 'ember-bootstrap/components/bs-dropdown/button'], function (exports, _button) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _button.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown/menu', ['exports', 'ember-bootstrap/components/bs-dropdown/menu'], function (exports, _menu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _menu.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown/menu/divider', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/divider'], function (exports, _divider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divider.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown/menu/item', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown/menu/link-to', ['exports', 'ember-bootstrap/components/bs-dropdown/menu/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('ember-book-club2/components/bs-dropdown/toggle', ['exports', 'ember-bootstrap/components/bs-dropdown/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('ember-book-club2/components/bs-form', ['exports', 'ember-bootstrap/components/bs-form'], function (exports, _bsForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsForm.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element', ['exports', 'ember-bootstrap/components/bs-form/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/control', ['exports', 'ember-bootstrap/components/bs-form/element/control'], function (exports, _control) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _control.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/control/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/control/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/control/input', ['exports', 'ember-bootstrap/components/bs-form/element/control/input'], function (exports, _input) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _input.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/control/radio', ['exports', 'ember-bootstrap/components/bs-form/element/control/radio'], function (exports, _radio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _radio.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/control/textarea', ['exports', 'ember-bootstrap/components/bs-form/element/control/textarea'], function (exports, _textarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textarea.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/errors', ['exports', 'ember-bootstrap/components/bs-form/element/errors'], function (exports, _errors) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _errors.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/feedback-icon', ['exports', 'ember-bootstrap/components/bs-form/element/feedback-icon'], function (exports, _feedbackIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _feedbackIcon.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/help-text', ['exports', 'ember-bootstrap/components/bs-form/element/help-text'], function (exports, _helpText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _helpText.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/label', ['exports', 'ember-bootstrap/components/bs-form/element/label'], function (exports, _label) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _label.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/layout/horizontal', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal'], function (exports, _horizontal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _horizontal.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/layout/horizontal/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/horizontal/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/layout/inline', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline'], function (exports, _inline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inline.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/layout/inline/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/inline/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/layout/vertical', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical'], function (exports, _vertical) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _vertical.default;
    }
  });
});
define('ember-book-club2/components/bs-form/element/layout/vertical/checkbox', ['exports', 'ember-bootstrap/components/bs-form/element/layout/vertical/checkbox'], function (exports, _checkbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _checkbox.default;
    }
  });
});
define('ember-book-club2/components/bs-form/group', ['exports', 'ember-bootstrap/components/bs-form/group'], function (exports, _group) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _group.default;
    }
  });
});
define('ember-book-club2/components/bs-modal-simple', ['exports', 'ember-bootstrap/components/bs-modal-simple'], function (exports, _bsModalSimple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModalSimple.default;
    }
  });
});
define('ember-book-club2/components/bs-modal', ['exports', 'ember-bootstrap/components/bs-modal'], function (exports, _bsModal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsModal.default;
    }
  });
});
define('ember-book-club2/components/bs-modal/body', ['exports', 'ember-bootstrap/components/bs-modal/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('ember-book-club2/components/bs-modal/dialog', ['exports', 'ember-bootstrap/components/bs-modal/dialog'], function (exports, _dialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dialog.default;
    }
  });
});
define('ember-book-club2/components/bs-modal/footer', ['exports', 'ember-bootstrap/components/bs-modal/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
define('ember-book-club2/components/bs-modal/header', ['exports', 'ember-bootstrap/components/bs-modal/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
define('ember-book-club2/components/bs-modal/header/close', ['exports', 'ember-bootstrap/components/bs-modal/header/close'], function (exports, _close) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _close.default;
    }
  });
});
define('ember-book-club2/components/bs-modal/header/title', ['exports', 'ember-bootstrap/components/bs-modal/header/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('ember-book-club2/components/bs-nav', ['exports', 'ember-bootstrap/components/bs-nav'], function (exports, _bsNav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNav.default;
    }
  });
});
define('ember-book-club2/components/bs-nav/item', ['exports', 'ember-bootstrap/components/bs-nav/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('ember-book-club2/components/bs-nav/link-to', ['exports', 'ember-bootstrap/components/bs-nav/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('ember-book-club2/components/bs-navbar', ['exports', 'ember-bootstrap/components/bs-navbar'], function (exports, _bsNavbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsNavbar.default;
    }
  });
});
define('ember-book-club2/components/bs-navbar/content', ['exports', 'ember-bootstrap/components/bs-navbar/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('ember-book-club2/components/bs-navbar/link-to', ['exports', 'ember-bootstrap/components/bs-navbar/link-to'], function (exports, _linkTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkTo.default;
    }
  });
});
define('ember-book-club2/components/bs-navbar/nav', ['exports', 'ember-bootstrap/components/bs-navbar/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
define('ember-book-club2/components/bs-navbar/toggle', ['exports', 'ember-bootstrap/components/bs-navbar/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
});
define('ember-book-club2/components/bs-popover', ['exports', 'ember-bootstrap/components/bs-popover'], function (exports, _bsPopover) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsPopover.default;
    }
  });
});
define('ember-book-club2/components/bs-popover/element', ['exports', 'ember-bootstrap/components/bs-popover/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('ember-book-club2/components/bs-progress', ['exports', 'ember-bootstrap/components/bs-progress'], function (exports, _bsProgress) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsProgress.default;
    }
  });
});
define('ember-book-club2/components/bs-progress/bar', ['exports', 'ember-bootstrap/components/bs-progress/bar'], function (exports, _bar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bar.default;
    }
  });
});
define('ember-book-club2/components/bs-tab', ['exports', 'ember-bootstrap/components/bs-tab'], function (exports, _bsTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTab.default;
    }
  });
});
define('ember-book-club2/components/bs-tab/pane', ['exports', 'ember-bootstrap/components/bs-tab/pane'], function (exports, _pane) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pane.default;
    }
  });
});
define('ember-book-club2/components/bs-tooltip', ['exports', 'ember-bootstrap/components/bs-tooltip'], function (exports, _bsTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsTooltip.default;
    }
  });
});
define('ember-book-club2/components/bs-tooltip/element', ['exports', 'ember-bootstrap/components/bs-tooltip/element'], function (exports, _element) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _element.default;
    }
  });
});
define('ember-book-club2/components/ember-popper-targeting-parent', ['exports', 'ember-popper/components/ember-popper-targeting-parent'], function (exports, _emberPopperTargetingParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
define('ember-book-club2/components/ember-popper', ['exports', 'ember-popper/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define('ember-book-club2/components/login-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      login(e) {
        e.preventDefault();

        this.get('onSubmit')({
          email: this.email,
          password: this.password
        });
      }
    },

    didReceiveAttrs() {
      this.setProperties({
        email: this.get('user.email'),
        password: this.get('user.password')
      });
    }
  });
});
define('ember-book-club2/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('ember-book-club2/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('ember-book-club2/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('ember-book-club2/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('ember-book-club2/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('ember-book-club2/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('ember-book-club2/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('ember-book-club2/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('ember-book-club2/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('ember-book-club2/components/register-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      async registerSpeaker(e) {
        e.preventDefault();

        this.get('onSubmit')({
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
          firstName: this.get('firstName'),
          lastName: this.get('lastName')
        });
      }
    },

    didReceiveAttrs() {
      this.setProperties({
        email: this.get('speaker.email'),
        password: this.get('speaker.password'),
        firstName: this.get('speaker.firstName'),
        lastName: this.get('speaker.lastName'),
        passwordConfirmation: this.get('speaker.passwordConfirmation')
      });
    }
  });
});
define('ember-book-club2/components/report-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    currentUser: Ember.inject.service(),
    moment: Ember.inject.service(),
    actions: {
      submitForm(e) {
        e.preventDefault();

        this.onsubmit({
          id: this.get('id'),
          book: this.get('book'),
          speaker: this.get('speaker'),
          date: this.get('date'),
          shortReview: this.get('shortReview'),
          raiting: this.get('raiting'),
          presentationUrl: this.get('presentationUrl'),
          videoUrl: this.get('videoUrl')
        });
      },

      searchSpeaker(query) {
        return this.get('store').query('speaker', { q: query });
      },

      searchBook(query) {
        return this.get('store').query('book', { q: query });
      }
    },
    async didReceiveAttrs() {
      this._super(...arguments);
      let currBook = this.get('book') ? this.get('book') : this.get('report.book');
      let currDate = this.get('report') ? this.get('report.date') : this.get('moment').moment(new Date()).format('YYYY-MM-DD');
      let currSpeaker = this.get('report') ? this.get('report.speaker') : this.get('currentUser.user');
      this.setProperties({
        book: currBook,
        speaker: currSpeaker,
        date: currDate,
        shortReview: this.get('report.shortReview'),
        raiting: this.get('report.raiting'),
        presentationUrl: this.get('report.presentationUrl'),
        videoUrl: this.get('report.videoUrl'),
        id: this.get('report.id') ? this.get('report.id') : undefined
      });
    }
  });
});
define('ember-book-club2/components/speaker-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    actions: {
      submitForm(e) {
        e.preventDefault();

        this.onsubmit({
          id: this.get('id'),
          firstName: this.get('firstName'),
          lastName: this.get('lastName')
        });
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this.setProperties({
        firstName: this.get('speaker.firstName'),
        lastName: this.get('speaker.lastName'),
        id: this.get('speaker.id') ? this.get('speaker.id') : undefined
      });
    }
  });
});
define('ember-book-club2/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
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
define('ember-book-club2/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    actions: {
      async logout(e) {
        e.preventDefault();

        this.get('session').invalidate();
      }
    }
  });
});
define('ember-book-club2/controllers/author', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ["search"],
    search: ''
  });
});
define('ember-book-club2/controllers/author/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),
    actions: {
      async saveAuthor(author) {
        try {
          const newAuthor = this.store.createRecord('author', author);

          await newAuthor.save();

          this.transitionToRoute('author.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/author/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async deleteAuthor() {
        try {
          await this.model.destroyRecord();
          this.transitionToRoute('author.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/author/detail/new-book', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      async saveBook(book) {
        try {
          let newBook = this.get('store').createRecord('book', book);
          await newBook.save();

          this.transitionToRoute('author.detail', this.get('model.author.id'));
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/author/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async onSubmit(author) {
        try {
          this.get('model').setProperties(author);
          await this.get('model').save();

          this.transitionToRoute('author.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/book', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ["search"],
    search: ''
  });
});
define('ember-book-club2/controllers/book/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),
    actions: {
      async saveBook(book) {
        try {
          const newBook = this.store.createRecord('book', book);

          await newBook.save();

          this.transitionToRoute('book.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/book/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async deleteBook() {
        try {
          await this.model.destroyRecord();
          this.transitionToRoute('book.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/book/detail/new-report', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      async saveReport(report) {
        try {
          const newReport = this.get('store').createRecord('report', report);

          await newReport.save();

          this.transitionToRoute('book.detail', this.get('model.book.id'));
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/book/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async onsubmit(book) {
        try {
          this.get('model').setProperties(book);
          await this.get('model').save();

          this.transitionToRoute('book.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    session: Ember.inject.service(),

    actions: {
      async login(user) {
        try {
          await this.get('session').authenticate('authenticator:jwt', {
            email: user.email,
            password: user.password
          });
        } catch (e) {
          this.send('error', e);
        }
      },

      error(error, transition) {
        if (error instanceof Error) {
          return true;
        }

        this.set('errors', error.json.errors);
        return false;
      }
    },

    resetErrors() {
      this.set('errors', {});
    }
  });
});
define('ember-book-club2/controllers/register', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      async registerSpeaker(speaker) {
        let newSpeaker;
        try {
          newSpeaker = this.get('store').createRecord('speaker', speaker);
          await newSpeaker.save();

          this.transitionToRoute('index');
        } catch (e) {
          e.user = newSpeaker;
          this.send('error', e);
        }
      },

      error(error, transition) {
        this.set('errors', error.speaker.errors);
        return false;
      }
    },

    resetErrors() {
      this.set('errors', {});
    }
  });
});
define('ember-book-club2/controllers/report', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('ember-book-club2/controllers/report/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      async saveReport(report) {
        try {
          const newReport = this.store.createRecord('report', report);

          await newReport.save();

          this.transitionToRoute('report.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/report/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    actions: {
      async deleteReport() {
        try {
          await this.model.destroyRecord();
          this.transitionToRoute('report.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/report/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async onsubmit(report) {
        try {
          this.get('model').setProperties(report);
          await this.get('model').save();

          this.transitionToRoute('report.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/speaker', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    queryParams: ["search"],
    search: ''
  });
});
define('ember-book-club2/controllers/speaker/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),
    actions: {
      async saveSpeaker(speaker) {
        try {
          const newspeaker = this.store.createRecord('speaker', speaker);

          await newspeaker.save();

          this.transitionToRoute('speaker.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/speaker/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async deleteSpeaker() {
        try {
          await this.model.destroyRecord();
          this.transitionToRoute('speaker.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/controllers/speaker/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    dataService: Ember.inject.service('data'),

    actions: {
      async onsubmit(speaker) {
        try {
          this.get('model').setProperties(speaker);
          await this.get('model').save();

          this.transitionToRoute('speaker.index');
        } catch (e) {
          this.send('error', e);
        }
      }
    }
  });
});
define('ember-book-club2/helpers/-link-to-params', ['exports', 'ember-angle-bracket-invocation-polyfill/helpers/-link-to-params'], function (exports, _linkToParams) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkToParams.default;
    }
  });
});
define('ember-book-club2/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _and.default;
    }
  });
  Object.defineProperty(exports, 'and', {
    enumerable: true,
    get: function () {
      return _and.and;
    }
  });
});
define('ember-book-club2/helpers/app-version', ['exports', 'ember-book-club2/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
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
define('ember-book-club2/helpers/await', ['exports', 'ember-promise-helpers/helpers/await'], function (exports, _await) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _await.default;
    }
  });
});
define('ember-book-club2/helpers/bs-contains', ['exports', 'ember-bootstrap/helpers/bs-contains'], function (exports, _bsContains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsContains.default;
    }
  });
  Object.defineProperty(exports, 'bsContains', {
    enumerable: true,
    get: function () {
      return _bsContains.bsContains;
    }
  });
});
define('ember-book-club2/helpers/bs-eq', ['exports', 'ember-bootstrap/helpers/bs-eq'], function (exports, _bsEq) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _bsEq.default;
    }
  });
  Object.defineProperty(exports, 'eq', {
    enumerable: true,
    get: function () {
      return _bsEq.eq;
    }
  });
});
define('ember-book-club2/helpers/can', ['exports', 'ember-can/helpers/can'], function (exports, _can) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _can.default;
    }
  });
});
define('ember-book-club2/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
define('ember-book-club2/helpers/cannot', ['exports', 'ember-can/helpers/cannot'], function (exports, _cannot) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cannot.default;
    }
  });
});
define('ember-book-club2/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('ember-book-club2/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('ember-book-club2/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('ember-book-club2/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _equal.default;
    }
  });
  Object.defineProperty(exports, 'equal', {
    enumerable: true,
    get: function () {
      return _equal.equal;
    }
  });
});
define('ember-book-club2/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gt.default;
    }
  });
  Object.defineProperty(exports, 'gt', {
    enumerable: true,
    get: function () {
      return _gt.gt;
    }
  });
});
define('ember-book-club2/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _gte.default;
    }
  });
  Object.defineProperty(exports, 'gte', {
    enumerable: true,
    get: function () {
      return _gte.gte;
    }
  });
});
define('ember-book-club2/helpers/is-after', ['exports', 'ember-moment/helpers/is-after'], function (exports, _isAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isAfter.default;
    }
  });
});
define('ember-book-club2/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isArray.default;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _isArray.isArray;
    }
  });
});
define('ember-book-club2/helpers/is-before', ['exports', 'ember-moment/helpers/is-before'], function (exports, _isBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBefore.default;
    }
  });
});
define('ember-book-club2/helpers/is-between', ['exports', 'ember-moment/helpers/is-between'], function (exports, _isBetween) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isBetween.default;
    }
  });
});
define('ember-book-club2/helpers/is-empty', ['exports', 'ember-truth-helpers/helpers/is-empty'], function (exports, _isEmpty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEmpty.default;
    }
  });
});
define('ember-book-club2/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('ember-book-club2/helpers/is-fulfilled', ['exports', 'ember-promise-helpers/helpers/is-fulfilled'], function (exports, _isFulfilled) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isFulfilled.default;
    }
  });
  Object.defineProperty(exports, 'isFulfilled', {
    enumerable: true,
    get: function () {
      return _isFulfilled.isFulfilled;
    }
  });
});
define('ember-book-club2/helpers/is-pending', ['exports', 'ember-promise-helpers/helpers/is-pending'], function (exports, _isPending) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isPending.default;
    }
  });
  Object.defineProperty(exports, 'isPending', {
    enumerable: true,
    get: function () {
      return _isPending.isPending;
    }
  });
});
define('ember-book-club2/helpers/is-rejected', ['exports', 'ember-promise-helpers/helpers/is-rejected'], function (exports, _isRejected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isRejected.default;
    }
  });
  Object.defineProperty(exports, 'isRejected', {
    enumerable: true,
    get: function () {
      return _isRejected.isRejected;
    }
  });
});
define('ember-book-club2/helpers/is-same-or-after', ['exports', 'ember-moment/helpers/is-same-or-after'], function (exports, _isSameOrAfter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrAfter.default;
    }
  });
});
define('ember-book-club2/helpers/is-same-or-before', ['exports', 'ember-moment/helpers/is-same-or-before'], function (exports, _isSameOrBefore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSameOrBefore.default;
    }
  });
});
define('ember-book-club2/helpers/is-same', ['exports', 'ember-moment/helpers/is-same'], function (exports, _isSame) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isSame.default;
    }
  });
});
define('ember-book-club2/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lt.default;
    }
  });
  Object.defineProperty(exports, 'lt', {
    enumerable: true,
    get: function () {
      return _lt.lt;
    }
  });
});
define('ember-book-club2/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lte.default;
    }
  });
  Object.defineProperty(exports, 'lte', {
    enumerable: true,
    get: function () {
      return _lte.lte;
    }
  });
});
define('ember-book-club2/helpers/moment-add', ['exports', 'ember-moment/helpers/moment-add'], function (exports, _momentAdd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentAdd.default;
    }
  });
});
define('ember-book-club2/helpers/moment-calendar', ['exports', 'ember-moment/helpers/moment-calendar'], function (exports, _momentCalendar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentCalendar.default;
    }
  });
});
define('ember-book-club2/helpers/moment-diff', ['exports', 'ember-moment/helpers/moment-diff'], function (exports, _momentDiff) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDiff.default;
    }
  });
});
define('ember-book-club2/helpers/moment-duration', ['exports', 'ember-moment/helpers/moment-duration'], function (exports, _momentDuration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentDuration.default;
    }
  });
});
define('ember-book-club2/helpers/moment-format', ['exports', 'ember-moment/helpers/moment-format'], function (exports, _momentFormat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFormat.default;
    }
  });
});
define('ember-book-club2/helpers/moment-from-now', ['exports', 'ember-moment/helpers/moment-from-now'], function (exports, _momentFromNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFromNow.default;
    }
  });
});
define('ember-book-club2/helpers/moment-from', ['exports', 'ember-moment/helpers/moment-from'], function (exports, _momentFrom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentFrom.default;
    }
  });
});
define('ember-book-club2/helpers/moment-subtract', ['exports', 'ember-moment/helpers/moment-subtract'], function (exports, _momentSubtract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentSubtract.default;
    }
  });
});
define('ember-book-club2/helpers/moment-to-date', ['exports', 'ember-moment/helpers/moment-to-date'], function (exports, _momentToDate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToDate.default;
    }
  });
});
define('ember-book-club2/helpers/moment-to-now', ['exports', 'ember-moment/helpers/moment-to-now'], function (exports, _momentToNow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentToNow.default;
    }
  });
});
define('ember-book-club2/helpers/moment-to', ['exports', 'ember-moment/helpers/moment-to'], function (exports, _momentTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _momentTo.default;
    }
  });
});
define('ember-book-club2/helpers/moment-unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('ember-book-club2/helpers/moment', ['exports', 'ember-moment/helpers/moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moment.default;
    }
  });
});
define('ember-book-club2/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _notEqual.default;
    }
  });
  Object.defineProperty(exports, 'notEq', {
    enumerable: true,
    get: function () {
      return _notEqual.notEq;
    }
  });
});
define('ember-book-club2/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _not.default;
    }
  });
  Object.defineProperty(exports, 'not', {
    enumerable: true,
    get: function () {
      return _not.not;
    }
  });
});
define('ember-book-club2/helpers/now', ['exports', 'ember-moment/helpers/now'], function (exports, _now) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _now.default;
    }
  });
});
define('ember-book-club2/helpers/on-document', ['exports', 'ember-on-helper/helpers/on-document'], function (exports, _onDocument) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _onDocument.default;
    }
  });
});
define('ember-book-club2/helpers/on-window', ['exports', 'ember-on-helper/helpers/on-window'], function (exports, _onWindow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _onWindow.default;
    }
  });
});
define('ember-book-club2/helpers/on', ['exports', 'ember-on-helper/helpers/on'], function (exports, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _on.default;
    }
  });
});
define('ember-book-club2/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _or.default;
    }
  });
  Object.defineProperty(exports, 'or', {
    enumerable: true,
    get: function () {
      return _or.or;
    }
  });
});
define('ember-book-club2/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
define('ember-book-club2/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('ember-book-club2/helpers/promise-all', ['exports', 'ember-promise-helpers/helpers/promise-all'], function (exports, _promiseAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseAll.default;
    }
  });
  Object.defineProperty(exports, 'promiseAll', {
    enumerable: true,
    get: function () {
      return _promiseAll.promiseAll;
    }
  });
});
define('ember-book-club2/helpers/promise-hash', ['exports', 'ember-promise-helpers/helpers/promise-hash'], function (exports, _promiseHash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseHash.default;
    }
  });
  Object.defineProperty(exports, 'promiseHash', {
    enumerable: true,
    get: function () {
      return _promiseHash.promiseHash;
    }
  });
});
define('ember-book-club2/helpers/promise-rejected-reason', ['exports', 'ember-promise-helpers/helpers/promise-rejected-reason'], function (exports, _promiseRejectedReason) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _promiseRejectedReason.default;
    }
  });
});
define('ember-book-club2/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('ember-book-club2/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
define('ember-book-club2/helpers/unix', ['exports', 'ember-moment/helpers/unix'], function (exports, _unix) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _unix.default;
    }
  });
});
define('ember-book-club2/helpers/utc', ['exports', 'ember-moment/helpers/utc'], function (exports, _utc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _utc.default;
    }
  });
  Object.defineProperty(exports, 'utc', {
    enumerable: true,
    get: function () {
      return _utc.utc;
    }
  });
});
define('ember-book-club2/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _xor.default;
    }
  });
  Object.defineProperty(exports, 'xor', {
    enumerable: true,
    get: function () {
      return _xor.xor;
    }
  });
});
define('ember-book-club2/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'ember-book-club2/config/environment'], function (exports, _initializerFactory, _environment) {
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
define('ember-book-club2/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
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
define('ember-book-club2/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
define('ember-book-club2/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('ember-book-club2/initializers/ember-simple-auth', ['exports', 'ember-book-club2/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service', 'ember-simple-auth/initializers/setup-session-restoration'], function (exports, _environment, _configuration, _setupSession, _setupSessionService, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize(registry) {
      const config = _environment.default['ember-simple-auth'] || {};
      config.rootURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
      (0, _setupSessionRestoration.default)(registry);
    }
  };
});
define('ember-book-club2/initializers/export-application-global', ['exports', 'ember-book-club2/config/environment'], function (exports, _environment) {
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
define('ember-book-club2/initializers/load-bootstrap-config', ['exports', 'ember-book-club2/config/environment', 'ember-bootstrap/config'], function (exports, _environment, _config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    _config.default.load(_environment.default['ember-bootstrap'] || {});
  }

  exports.default = {
    name: 'load-bootstrap-config',
    initialize
  };
});
define('ember-book-club2/initializers/setup-ember-can', ['exports', 'ember-can/initializers/setup-ember-can'], function (exports, _setupEmberCan) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _setupEmberCan.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _setupEmberCan.initialize;
    }
  });
});
define('ember-book-club2/initializers/simple-auth-token', ['exports', 'ember-simple-auth-token/authenticators/token', 'ember-simple-auth-token/authenticators/jwt'], function (exports, _token, _jwt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth-token',
    before: 'ember-simple-auth',
    initialize(container) {
      container.register('authenticator:token', _token.default);
      container.register('authenticator:jwt', _jwt.default);
    }
  };
});
define("ember-book-club2/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('ember-book-club2/instance-initializers/ember-simple-auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize() {}
  };
});
define('ember-book-club2/models/author', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    firstName: _emberData.default.attr('string'),
    lastName: _emberData.default.attr('string'),
    yearsOfLife: _emberData.default.attr('string'),

    books: _emberData.default.hasMany('book')
  });
});
define('ember-book-club2/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    author: _emberData.default.belongsTo('author'),
    countPages: _emberData.default.attr('number'),
    descUrl: _emberData.default.attr('string'),
    imgUrl: _emberData.default.attr('string'),

    reports: _emberData.default.hasMany('report')
  });
});
define('ember-book-club2/models/group', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    isAdmin: _emberData.default.attr('boolean'),
    isWrite: _emberData.default.attr('boolean'),

    speakers: _emberData.default.hasMany('speaker')
  });
});
define('ember-book-club2/models/report', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    date: _emberData.default.attr('date-string'),
    shortReview: _emberData.default.attr('string'),
    raiting: _emberData.default.attr('number'),
    presentationUrl: _emberData.default.attr('string'),
    videoUrl: _emberData.default.attr('string'),

    book: _emberData.default.belongsTo('book'),
    speaker: _emberData.default.belongsTo('speaker')
  });
});
define('ember-book-club2/models/speaker', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    firstName: _emberData.default.attr('string'),
    lastName: _emberData.default.attr('string'),
    email: _emberData.default.attr('string'),
    password: _emberData.default.attr(),
    passwordConfirmation: _emberData.default.attr(),

    reports: _emberData.default.hasMany('report'),
    group: _emberData.default.belongsTo('group')
  });
});
define('ember-book-club2/modifiers/focus-trap', ['exports', 'ember-focus-trap/modifiers/focus-trap'], function (exports, _focusTrap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _focusTrap.default;
    }
  });
});
define('ember-book-club2/modifiers/ref', ['exports', 'ember-ref-modifier/modifiers/ref'], function (exports, _ref) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ref.default;
    }
  });
});
define('ember-book-club2/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('ember-book-club2/router', ['exports', 'ember-book-club2/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('loading');
    this.route('404', { path: '*path' });
    this.route('error', { path: '/:error' });
    this.route('speaker', { path: '/speakers' }, function () {
      this.route('detail', { path: '/:id' });
      this.route('create');
      this.route('edit', { path: '/:id/edit' });
    });
    this.route('book', { path: '/books' }, function () {
      this.route('detail', { path: '/:id' }, function () {
        this.route('new-report');
      });
      this.route('create');
      this.route('edit', { path: '/:id/edit' });
    });
    this.route('report', { path: '/reports' }, function () {
      this.route('create');
      this.route('detail', { path: '/:id' });
      this.route('edit', { path: '/:id/edit' });
    });
    this.route('login');
    this.route('register');
    this.route('author', { path: '/authors' }, function () {
      this.route('create');
      this.route('edit', { path: '/:id/edit' });
      this.route('detail', { path: '/:id' });
    });
  });

  exports.default = Router;
});
define('ember-book-club2/routes/404', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-book-club2/routes/application', ['exports', 'ember-simple-auth/mixins/application-route-mixin'], function (exports, _applicationRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_applicationRouteMixin.default, {
    session: Ember.inject.service(),
    currentUser: Ember.inject.service(),

    beforeModel() {
      this._super(...arguments);

      this.loadUser();
    },

    sessionAuthenticated() {
      this._super(...arguments);

      this.loadUser();
    },

    sessionInvalidated() {
      this.get('currentUser').resetCurrentUser();
      window.location.replace('/login');
    },

    loadUser() {
      if (this.get('session.isAuthenticated')) {
        this.get('currentUser').load();
      }
    },

    actions: {
      error(error, transition) {
        if (transition) {
          transition.abort();
        }
        this.intermediateTransitionTo('error', { error: error.message });
        return true;
      }
    }
  });
});
define('ember-book-club2/routes/author', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    queryParams: {
      search: {
        refreshModel: true
      }
    },
    model({ search }) {
      if (search) {
        return this.store.query('author', { q: search });
      }
      return this.store.findAll('author');
    },
    actions: {
      loading() {
        return false;
      }
    }
  });
});
define('ember-book-club2/routes/author/create', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {});
});
define('ember-book-club2/routes/author/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model({ id }) {
      return this.get('store').findRecord('author', id);
    }
  });
});
define('ember-book-club2/routes/author/detail/new-book', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
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
      };
    }
  });
});
define('ember-book-club2/routes/author/edit', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {

    model({ id }) {
      return this.get('store').findRecord('author', id);
    }
  });
});
define('ember-book-club2/routes/book', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    queryParams: {
      search: {
        refreshModel: true
      }
    },
    model({ search }) {
      if (search) {
        return this.store.query('book', { q: search });
      }
      return this.store.findAll('book');
    },
    actions: {
      loading() {
        return false;
      }
    }
  });
});
define('ember-book-club2/routes/book/create', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {});
});
define('ember-book-club2/routes/book/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model({ id }) {
      return this.get('store').findRecord('book', id);
    }
  });
});
define('ember-book-club2/routes/book/detail/new-report', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
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
      };
    }
  });
});
define('ember-book-club2/routes/book/edit', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {

    model({ id }) {
      return this.get('store').findRecord('book', id);
    }
  });
});
define('ember-book-club2/routes/error', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-book-club2/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-book-club2/routes/loading', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-book-club2/routes/login', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model() {
      return {
        email: '',
        password: ''
      };
    },

    resetController(controller, isExiting, transition) {
      this._super(...arguments);
      if (isExiting) {
        controller.resetErrors();
      }
    }
  });
});
define('ember-book-club2/routes/register', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model() {
      return {
        email: '',
        username: '',
        password: '',
        passwordConfirmation: ''
      };
    },

    resetController(controller, isExiting, transition) {
      this._super(...arguments);
      if (isExiting) {
        controller.resetErrors();
      }
    }
  });
});
define('ember-book-club2/routes/report', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model({ search }) {
      if (search) {
        return this.store.query('report', { q: search });
      }
      return this.store.findAll('report');
    }
  });
});
define('ember-book-club2/routes/report/create', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {});
});
define('ember-book-club2/routes/report/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model({ id }) {
      return this.get('store').findRecord('report', id);
    }
  });
});
define('ember-book-club2/routes/report/edit', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model({ id }) {
      return this.get('store').findRecord('report', id);
    }
  });
});
define('ember-book-club2/routes/speaker', ['exports', 'ember-simple-auth/mixins/authenticated-route-mixin'], function (exports, _authenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_authenticatedRouteMixin.default, {
    queryParams: {
      search: {
        refreshModel: true
      }
    },
    model({ search }) {
      if (search) {
        return this.store.query('speaker', { q: search });
      }
      return this.store.findAll('speaker');
    },
    actions: {
      loading() {
        return false;
      }
    }
  });
});
define('ember-book-club2/routes/speaker/create', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {});
});
define('ember-book-club2/routes/speaker/detail', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model({ id }) {
      return this.get('store').findRecord('speaker', id);
    }
  });
});
define('ember-book-club2/routes/speaker/edit', ['exports', 'ember-simple-auth/mixins/unauthenticated-route-mixin'], function (exports, _unauthenticatedRouteMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend(_unauthenticatedRouteMixin.default, {
    model({ id }) {
      return this.get('store').findRecord('speaker', id);
    }
  });
});
define('ember-book-club2/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONSerializer.extend({
    normalize(model, hash) {
      return this._super(...arguments);
    },

    keyForRelationship(key, typeClass, method) {
      if (typeClass === 'belongsTo') {
        return `${key}Id`;
      }

      return this._super(...arguments);
    },

    extractRelationship(relationshipModelName, relationshipHash) {
      let hash = relationshipHash.id ? relationshipHash.id : relationshipHash;
      return this._super.call(this, relationshipModelName, hash);
      // return this._super(...arguments);
    },

    serializeBelongsTo(snapshot, json, relationship) {
      // this._super(...arguments);
      let key = relationship.key;
      let belongsTo = snapshot.belongsTo(key);

      key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
      json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.record.get('id'));
    }
  });
});
define('ember-book-club2/serializers/author', ['exports', 'ember-book-club2/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    serialize(snapshot, options) {
      let json = this._super(...arguments);
      json.type = 'author';
      return json;
    }
  });
});
define('ember-book-club2/serializers/book', ['exports', 'ember-book-club2/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    serialize(snapshot, options) {
      let json = this._super(...arguments);
      json.type = 'book';
      return json;
    }
  });
});
define('ember-book-club2/serializers/report', ['exports', 'ember-book-club2/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    serialize(snapshot, options) {
      let json = this._super(...arguments);
      json.type = 'report';
      return json;
    }
  });
});
define('ember-book-club2/serializers/speaker', ['exports', 'ember-book-club2/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    serialize(snapshot, options) {
      let json = this._super(...arguments);
      json.type = 'speaker';
      return json;
    }
  });
});
define('ember-book-club2/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
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
define('ember-book-club2/services/can', ['exports', 'ember-can/services/can'], function (exports, _can) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _can.default;
    }
  });
});
define('ember-book-club2/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define('ember-book-club2/services/current-user', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    store: Ember.inject.service(),
    user: null,

    async load() {
      let user = await this.get('store').queryRecord('speaker', { me: true });
      this.set('user', user);
    },

    resetCurrentUser() {
      this.set('user', null);
    }
  });
});
define('ember-book-club2/services/data', ['exports', 'ember-book-club2/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    init() {
      this._super(...arguments);
      this.set('books', Ember.A());
      this.set('speakers', Ember.A());
    },

    async getBooks(search) {
      let queryParams = '';
      if (search) {
        queryParams = `?q=${search}`;
      }
      let response = await fetch(`${_environment.default.backendURL}/books${queryParams}`);
      let books = await response.json();
      this.get('books').clear();
      this.get('books').pushObjects(books);
      return this.get('books');
    },

    getBook(id) {
      //return fetch(`${ENV.backendURL}/books/${id}`).then((response) => response.json());
      return this.get('books').find(book => book.id === parseInt(id));
    },

    deleteBook(book) {
      this.get('books').removeObject(book);
      return fetch(`${_environment.default.backendURL}/books/${book.id}`, { method: 'DELETE' });
    },

    async createBook(book) {
      await fetch(`${_environment.default.backendURL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
      let response = await fetch(`${_environment.default.backendURL}/books`);
      let books = await response.json();
      Ember.set(book, 'id', books[books.length - 1].id);
      this.get('books').pushObject(book);
    },

    updateBook(book) {
      let bookOld = this.get('books').find(bookCycle => bookCycle.id === book.id);
      Ember.set(bookOld, 'imgUrl', book.imgUrl);
      Ember.set(bookOld, 'descUrl', book.descUrl);
      Ember.set(bookOld, 'countPages', book.countPages);
      Ember.set(bookOld, 'author', book.author);
      Ember.set(bookOld, 'title', book.title);
      return fetch(`${_environment.default.backendURL}/books/${book.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
      });
    },

    async getSpeakers(search) {
      let queryParams = '';
      if (search) {
        queryParams = `?q=${search}`;
      }
      let response = await fetch(`${_environment.default.backendURL}/speakers${queryParams}`);
      let speakers = await response.json();
      this.get('speakers').clear();
      this.get('speakers').pushObjects(speakers);
      return this.get('speakers');
    },

    getSpeaker(id) {
      return this.get('speakers').find(speaker => speaker.id === parseInt(id));
    },

    deleteSpeaker(speaker) {
      this.get('speakers').removeObject(speaker);
      return fetch(`${_environment.default.backendURL}/speakers/${speaker.id}`, { method: 'DELETE' });
    },

    async createSpeaker(speaker) {
      await fetch(`${_environment.default.backendURL}/speakers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(speaker)
      });
      let response = await fetch(`${_environment.default.backendURL}/speakers`);
      let speakers = await response.json();
      Ember.set(speaker, 'id', speakers[speakers.length - 1].id);
      this.get('speakers').pushObject(speaker);
    },

    updateSpeaker(speaker) {
      let speakerOld = this.get('speakers').find(speakerCycle => speakerCycle.id === speaker.id);
      Ember.set(speakerOld, 'lastName', speaker.lastName);
      Ember.set(speakerOld, 'firstName', speaker.firstName);
      return fetch(`${_environment.default.backendURL}/speakers/${speaker.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(speaker)
      });
    }
  });
});
define('ember-book-club2/services/moment', ['exports', 'ember-moment/services/moment', 'ember-book-club2/config/environment'], function (exports, _moment, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { get } = Ember;

  exports.default = _moment.default.extend({
    defaultFormat: get(_environment.default, 'moment.outputFormat')
  });
});
define('ember-book-club2/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('ember-book-club2/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define('ember-book-club2/session-stores/application', ['exports', 'ember-simple-auth/session-stores/adaptive'], function (exports, _adaptive) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _adaptive.default.extend();
});
define("ember-book-club2/templates/404", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pGlK2u6o", "block": "{\"symbols\":[],\"statements\":[[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/404.hbs" } });
});
define("ember-book-club2/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "aH1ly056", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"cover-container d-flex h-100 p-3 mx-auto flex-column\"],[8],[0,\"\\n  \"],[6,\"header\"],[10,\"class\",\"masthead mb-auto\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"navbar navbar-expand-sm bg-dark navbar-dark text-white\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"         Книжный клуб\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"nav\"],[10,\"class\",\"navbar-nav mr-auto\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"nav-link active\"],[8],[0,\"Список встреч\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"book\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Список книг\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"author\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Список авторов\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[4,\"link-to\",[\"speaker\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"            Список участников\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"link-to\",[\"report\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Список докладов\\n\"]],\"parameters\":[]},null],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"          \"],[6,\"a\"],[10,\"href\",\"#\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"logout\"],null],null],[10,\"class\",\"nav-link\"],[8],[0,\"Logout\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[4,\"link-to\",[\"register\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"Register\"]],\"parameters\":[]},null],[0,\"\\n          \"],[4,\"link-to\",[\"login\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"Login\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"session\",\"isAuthenticated\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[10,\"class\",\"navbar-text\"],[8],[0,\"\\n          Вы -  \"],[6,\"strong\"],[8],[0,\" \"],[1,[22,[\"currentUser\",\"user\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"currentUser\",\"user\",\"firstName\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"main\"],[10,\"role\",\"container\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/application.hbs" } });
});
define("ember-book-club2/templates/author", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sqzr6Mk4", "block": "{\"symbols\":[\"author\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список книг:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"create author\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[4,\"link-to\",[\"author.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"          Добавить автора\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"author.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"lastName\"]],false],[0,\" \"],[1,[21,1,[\"firstName\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/author.hbs" } });
});
define("ember-book-club2/templates/author/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fKWGgPX5", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"author-form\",null,[[\"onsubmit\",\"isNew\"],[[26,\"action\",[[21,0,[]],\"saveAuthor\"],null],true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/author/create.hbs" } });
});
define("ember-book-club2/templates/author/detail", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "baRsqQRz", "block": "{\"symbols\":[\"book\"],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация об авторе:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Имя: \"],[1,[22,[\"model\",\"firstName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Фамилия: \"],[1,[22,[\"model\",\"lastName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Годы жизни/смерти: \"],[1,[22,[\"model\",\"yearsOfLife\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"Список книг:\"],[9],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"create book\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[4,\"link-to\",[\"author.detail.new-book\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"          Добавить книгу\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"each\",[[22,[\"model\",\"books\"]]],null,{\"statements\":[[0,\"        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"div\"],[8],[0,\"\\n            \"],[6,\"label\"],[8],[0,\"Название: \"],[1,[21,1,[\"title\"]],false],[9],[0,\"\\n          \"],[9],[0,\"\\n        \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit author\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"author.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"      Изменить\\n\"]],\"parameters\":[]},null],[4,\"unless\",[[22,[\"model\",\"books\",\"length\"]]],null,{\"statements\":[[0,\"      \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteAuthor\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/author/detail.hbs" } });
});
define("ember-book-club2/templates/author/detail/new-book", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ylH3iFna", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"book-form\",null,[[\"onsubmit\",\"author\",\"isNew\",\"isAuthor\"],[[26,\"action\",[[21,0,[]],\"saveBook\"],null],[22,[\"model\",\"author\"]],true,true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/author/detail/new-book.hbs" } });
});
define("ember-book-club2/templates/author/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "b+P9KXb2", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"author-form\",null,[[\"author\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"onSubmit\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/author/edit.hbs" } });
});
define("ember-book-club2/templates/book", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "sG69Mq+f", "block": "{\"symbols\":[\"book\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список книг:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"create book\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[4,\"link-to\",[\"book.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"          Добавить книгу\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"book.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book.hbs" } });
});
define("ember-book-club2/templates/book/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "JS+Uc/hq", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"book-form\",null,[[\"onsubmit\",\"isNew\"],[[26,\"action\",[[21,0,[]],\"saveBook\"],null],true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book/create.hbs" } });
});
define("ember-book-club2/templates/book/detail", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MxU3l9WP", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Название книги: \"],[1,[22,[\"model\",\"title\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Автор: \"],[1,[22,[\"model\",\"author\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"model\",\"author\",\"firstName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Количество страниц: \"],[1,[22,[\"model\",\"countPages\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"a\"],[11,\"href\",[22,[\"model\",\"descUrl\"]],null],[8],[0,\"Ссылка на полное описание\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Список докладов:\"],[9],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"create report\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[4,\"link-to\",[\"book.detail.new-report\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"          Добавить доклад\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"each\",[[22,[\"model\",\"reports\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[8],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Дата: \"],[1,[21,1,[\"date\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Оценка: \"],[1,[21,1,[\"raiting\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Выступающий: \"],[1,[21,1,[\"speaker\",\"firstName\"]],false],[0,\" \"],[1,[21,1,[\"speaker\",\"lastName\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n  \"],[1,[20,\"outlet\"],false],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit book\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"book.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"      Изменить\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteBook\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book/detail.hbs" } });
});
define("ember-book-club2/templates/book/detail/new-report", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "h5E9hiOO", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"report-form\",null,[[\"onsubmit\",\"book\",\"isNew\",\"isBook\"],[[26,\"action\",[[21,0,[]],\"saveReport\"],null],[22,[\"model\",\"book\"]],true,true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book/detail/new-report.hbs" } });
});
define("ember-book-club2/templates/book/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "T8Y7e8aV", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"book-form\",null,[[\"book\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"onsubmit\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book/edit.hbs" } });
});
define("ember-book-club2/templates/components/author-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "YF6YKk1r", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Новая автор\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Автор: \"],[1,[22,[\"author\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"author\",\"firstName\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Имя:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"firstName\"]],\"form-control\",\"Имя\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Фамилия:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"lastName\"]],\"form-control\",\"Фамилия\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Годы жизни/смерти:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"yearsOfLife\"]],\"form-control\",\"0-...\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"      Добавить\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      Сохранить\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/author-form.hbs" } });
});
define("ember-book-club2/templates/components/book-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5Q/+77m8", "block": "{\"symbols\":[\"author\"],\"statements\":[[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Новая книга\"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"isAuthor\"]]],null,{\"statements\":[[0,\"    \"],[6,\"h3\"],[8],[0,\"Автора: \"],[1,[22,[\"author\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"author\",\"firstName\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Название книги: \"],[1,[22,[\"book\",\"title\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\\n\"],[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Название книги:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"title\"]],\"form-control\",\"Название книги\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[4,\"unless\",[[22,[\"isAuthor\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Выберите автора:\"],[9],[0,\"\\n\"],[4,\"power-select\",null,[[\"searchEnabled\",\"onchange\",\"selected\",\"search\"],[true,[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"author\"]]],null]],null],[22,[\"author\"]],[26,\"action\",[[21,0,[]],\"searchAuthor\"],null]]],{\"statements\":[[0,\"        \"],[1,[21,1,[\"lastName\"]],false],[0,\" \"],[1,[21,1,[\"firstName\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Кол-во страниц:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"countPages\"]],\"form-control\",\"Кол-во страниц\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на изображение:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"imgUrl\"]],\"form-control\",\"Ссылка на изображение\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на страницу покупки:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"descUrl\"]],\"form-control\",\"Ссылка на страницу покупки\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"      Добавить\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      Сохранить\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/book-form.hbs" } });
});
define('ember-book-club2/templates/components/ember-popper-targeting-parent', ['exports', 'ember-popper/templates/components/ember-popper-targeting-parent'], function (exports, _emberPopperTargetingParent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopperTargetingParent.default;
    }
  });
});
define('ember-book-club2/templates/components/ember-popper', ['exports', 'ember-popper/templates/components/ember-popper'], function (exports, _emberPopper) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPopper.default;
    }
  });
});
define("ember-book-club2/templates/components/login-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "l8gKZksg", "block": "{\"symbols\":[\"error\"],\"statements\":[[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"login\"],null],null],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"errors\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"alert alert-danger\"],[8],[1,[21,1,[\"detail\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Email:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"email\"]],\"form-control\",\"\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Пароль:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"password\",[22,[\"password\"]],\"form-control\",\"\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n    Войти\\n  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/login-form.hbs" } });
});
define("ember-book-club2/templates/components/register-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "PHAejEkG", "block": "{\"symbols\":[\"error\",\"error\",\"error\",\"error\"],\"statements\":[[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"registerSpeaker\"],null],null],[8],[0,\"\\n   \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Имя:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"firstName\"]],\"form-control\",\"\"]]],false],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"errors\",\"email\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[1,[21,4,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[4]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Фамилия:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"lastName\"]],\"form-control\",\"\"]]],false],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"errors\",\"email\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[1,[21,3,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Email:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"email\"]],\"form-control\",\"\"]]],false],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"errors\",\"email\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[1,[21,2,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Пароль:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"password\"]],\"form-control\",\"\"]]],false],[0,\"\\n\\n\"],[4,\"each\",[[22,[\"errors\",\"email\"]]],null,{\"statements\":[[0,\"      \"],[6,\"span\"],[10,\"class\",\"error-message\"],[8],[1,[21,1,[\"message\"]],false],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n    Регистрация\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/register-form.hbs" } });
});
define("ember-book-club2/templates/components/report-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "b8WrmhM6", "block": "{\"symbols\":[\"speaker\",\"book\"],\"statements\":[[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Новый доклад\"],[9],[0,\"\\n\"],[4,\"if\",[[22,[\"isBook\"]]],null,{\"statements\":[[0,\"    \"],[6,\"h3\"],[8],[0,\"Книга: \"],[1,[22,[\"book\",\"title\"]],false],[0,\". Автора: \"],[1,[22,[\"book\",\"author\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"book\",\"author\",\"firstName\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Книга о которой идет речь - \"],[1,[22,[\"book\",\"title\"]],false],[0,\" \"],[1,[22,[\"book\",\"author\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Дата доклада:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"date\",[22,[\"date\"]],\"form-control\",\"\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Краткое содержание:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"shortReview\"]],\"form-control\",\"Очень понравилась пица\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Оценка:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"raiting\"]],\"form-control\",\"5\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на презентацию:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"presentationUrl\"]],\"form-control\",\"Ссылка на презентацию\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на видео:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"videoUrl\"]],\"form-control\",\"Ссылка на видео\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[4,\"if\",[[22,[\"isBook\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"Выберите книгу:\"],[9],[0,\"\\n\"],[4,\"power-select\",null,[[\"searchEnabled\",\"onchange\",\"selected\",\"search\"],[true,[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"book\"]]],null]],null],[22,[\"book\"]],[26,\"action\",[[21,0,[]],\"searchBook\"],null]]],{\"statements\":[[0,\"          \"],[1,[21,2,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"    \"],[9],[0,\"\\n\\n    \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n      \"],[6,\"label\"],[8],[0,\"Выберите докладчика:\"],[9],[0,\"\\n\"],[4,\"power-select\",null,[[\"searchEnabled\",\"onchange\",\"selected\",\"search\"],[true,[26,\"action\",[[21,0,[]],[26,\"mut\",[[22,[\"speaker\"]]],null]],null],[22,[\"speaker\"]],[26,\"action\",[[21,0,[]],\"searchSpeaker\"],null]]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"lastName\"]],false],[0,\" \"],[1,[21,1,[\"firstName\"]],false],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"      Добавить\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      Сохранить\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/report-form.hbs" } });
});
define("ember-book-club2/templates/components/speaker-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "k0TkVpuB", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Новая участник\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Участник: \"],[1,[22,[\"speaker\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"speaker\",\"firstName\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Имя:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"firstName\"]],\"form-control\",\"Имя\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Фамилия:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"lastName\"]],\"form-control\",\"Фамилия\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"      Добавить\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      Сохранить\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/speaker-form.hbs" } });
});
define("ember-book-club2/templates/error", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "yllUDHlY", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"model\",\"error\"]]],null,{\"statements\":[[0,\"    \"],[6,\"h2\"],[8],[0,\"Error: \"],[1,[22,[\"model\",\"error\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]},null],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/error.hbs" } });
});
define("ember-book-club2/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CaniNeDC", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n  \"],[6,\"h1\"],[10,\"class\",\"header col-sm\"],[8],[0,\"Список встреч Книжного клуба\"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn-dark \"],[8],[0,\"\\n    Оставить заявку\\n  \"],[9],[0,\" \\n\"],[9],[0,\"\\n \\n\\n \\n\"],[1,[20,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/index.hbs" } });
});
define("ember-book-club2/templates/loading", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ScD0oj85", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"progress\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"progress-bar progress-bar-striped bg-dark\"],[8],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/loading.hbs" } });
});
define("ember-book-club2/templates/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "r17aRyIl", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"row h-100\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-sm-12 my-auto\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"card card-block w-25 mx-auto\"],[8],[0,\"\\n          \"],[6,\"h3\"],[8],[0,\"Login\"],[9],[0,\"\\n          \"],[1,[26,\"login-form\",null,[[\"user\",\"errors\",\"onSubmit\"],[[22,[\"model\"]],[22,[\"errors\"]],[26,\"action\",[[21,0,[]],\"login\"],null]]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/login.hbs" } });
});
define("ember-book-club2/templates/register", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5AvA3Grh", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"row h-100\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"col-sm-12 my-auto\"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",\"card card-block w-25 mx-auto\"],[8],[0,\"\\n          \"],[6,\"h3\"],[8],[0,\"Register\"],[9],[0,\"\\n          \"],[1,[26,\"register-form\",null,[[\"speaker\",\"errors\",\"onSubmit\"],[[22,[\"model\"]],[22,[\"errors\"]],[26,\"action\",[[21,0,[]],\"registerSpeaker\"],null]]]],false],[0,\"\\n        \"],[9],[0,\"\\n    \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/register.hbs" } });
});
define("ember-book-club2/templates/report", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "o0KOloW1", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список репортов:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"create report\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[4,\"link-to\",[\"report.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"          Добавить report\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"report.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"date\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/report.hbs" } });
});
define("ember-book-club2/templates/report/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "ZjuAuSWE", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"report-form\",null,[[\"onsubmit\",\"isNew\"],[[26,\"action\",[[21,0,[]],\"saveReport\"],null],true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/report/create.hbs" } });
});
define("ember-book-club2/templates/report/detail", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9yDxtt5G", "block": "{\"symbols\":[],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Название книги и автор: \"],[1,[22,[\"model\",\"book\",\"title\"]],false],[0,\" \"],[1,[22,[\"model\",\"book\",\"author\",\"lastName\"]],false],[0,\" \"],[1,[22,[\"model\",\"book\",\"author\",\"firstName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Докладчик: \"],[1,[22,[\"model\",\"speaker\",\"firstName\"]],false],[0,\" \"],[1,[22,[\"model\",\"speaker\",\"lastName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n   \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Дата доклада: \"],[1,[22,[\"model\",\"date\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Краткое содержание: \"],[1,[22,[\"model\",\"shortReview\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Оценка: \"],[1,[22,[\"model\",\"raiting\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на презентацию: \"],[1,[22,[\"model\",\"presentationUrl\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на видео: \"],[1,[22,[\"model\",\"videoUrl\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit report\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"report.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"      Изменить\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteReport\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/report/detail.hbs" } });
});
define("ember-book-club2/templates/report/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/9L9n9oC", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"report-form\",null,[[\"report\",\"books\",\"onsubmit\"],[[22,[\"model\"]],[22,[\"books\"]],[26,\"action\",[[21,0,[]],\"onsubmit\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/report/edit.hbs" } });
});
define("ember-book-club2/templates/speaker", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dBbL3AKY", "block": "{\"symbols\":[\"speaker\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список участников:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"create speaker\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[4,\"link-to\",[\"speaker.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"          Добавить участника\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"speaker.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"lastName\"]],false],[0,\" \"],[1,[21,1,[\"firstName\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/speaker.hbs" } });
});
define("ember-book-club2/templates/speaker/create", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "RhhXYY2Q", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"speaker-form\",null,[[\"onsubmit\",\"isNew\"],[[26,\"action\",[[21,0,[]],\"saveSpeaker\"],null],true]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/speaker/create.hbs" } });
});
define("ember-book-club2/templates/speaker/detail", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "bbuyJbiC", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация об участнике:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Имя: \"],[1,[22,[\"model\",\"firstName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Фамилия: \"],[1,[22,[\"model\",\"lastName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Список докладов:\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"reports\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[8],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Дата: \"],[1,[21,1,[\"date\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Оценка: \"],[1,[21,1,[\"raiting\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\\n\"],[4,\"if\",[[26,\"await\",[[26,\"can\",[\"edit speaker\",[22,[\"model\"]]],null]],null]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"speaker.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"      Изменить\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteSpeaker\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n  \"],[9],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/speaker/detail.hbs" } });
});
define("ember-book-club2/templates/speaker/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "anb0JB4n", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"speaker-form\",null,[[\"speaker\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"onsubmit\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/speaker/edit.hbs" } });
});
define('ember-book-club2/transforms/date-string', ['exports', 'ember-data/transforms/date'], function (exports, _date) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _date.default.extend({
    moment: Ember.inject.service(),
    deserialize(serialized) {
      let date = this._super(serialized);
      if (date instanceof Date && !isNaN(date)) {
        let formattedDate = this.get('moment').moment(date).format('YYYY-MM-DD');
        return formattedDate;
      }

      return null;
    },

    serialize(deserialized) {
      let deserializedDate = deserialized ? this.get('moment').moment(deserialized).toDate() : null;
      return this._super(deserializedDate);
    }
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

if (!runningTests) {
  require("ember-book-club2/app")["default"].create({"name":"ember-book-club2","version":"0.0.0+b0253638"});
}
//# sourceMappingURL=ember-book-club2.map
