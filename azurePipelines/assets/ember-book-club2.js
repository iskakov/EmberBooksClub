"use strict";



define('ember-book-club2/adapters/application', ['exports', 'ember-data', 'ember-book-club2/config/environment'], function (exports, _emberData, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend({
    host: _environment.default.backendURL,

    init() {
      this._super(...arguments);
      this.set('headers', {
        'Content-Type': 'application/json'
      });
    },

    buildURL(modelName, id, snapshot, requestType, query) {
      let url = this._super(...arguments);
      if (modelName === 'speaker' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }

      if (modelName === 'book' && requestType === 'findRecord' && id) {
        url += '?_embed=reports';
      }

      return url;
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
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this.setProperties({
        title: this.get('book.title'),
        countPages: this.get('book.countPages'),
        imgUrl: this.get('book.imgUrl'),
        descUrl: this.get('book.descUrl'),
        author: this.get('book.author'),
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
define('ember-book-club2/components/ember-selectize', ['exports', 'ember-cli-selectize/components/ember-selectize'], function (exports, _emberSelectize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberSelectize.default;
});
define('ember-book-club2/components/report-form', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    store: Ember.inject.service('store'),
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
      }
    },
    async didReceiveAttrs() {
      this._super(...arguments);
      let books = await this.get('store').findAll('book');
      let speakers = await this.get('store').findAll('speaker');
      this.setProperties({
        book: this.get('report.book'),
        books: books,
        speakers: speakers,
        speaker: this.get('report.speaker'),
        date: this.get('report.date'),
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
define('ember-book-club2/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    author: _emberData.default.attr('string'),
    countPages: _emberData.default.attr('number'),
    descUrl: _emberData.default.attr('string'),
    imgUrl: _emberData.default.attr('string'),

    reports: _emberData.default.hasMany('report')
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

    reports: _emberData.default.hasMany('report')
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
      this.route('detail', { path: '/:id' });
      this.route('create');
      this.route('edit', { path: '/:id/edit' });
    });
    this.route('report', { path: '/reports' }, function () {
      this.route('create');
      this.route('detail', { path: '/:id' });
      this.route('edit', { path: '/:id/edit' });
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
define('ember-book-club2/routes/book/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
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
define('ember-book-club2/routes/book/edit', ['exports'], function (exports) {
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
define('ember-book-club2/routes/report/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
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
define('ember-book-club2/routes/report/edit', ['exports'], function (exports) {
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
define('ember-book-club2/routes/speaker', ['exports'], function (exports) {
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
define('ember-book-club2/routes/speaker/create', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('ember-book-club2/routes/speaker/detail', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model({ id }) {
      return this.get('store').findRecord('speaker', id);
    }
  });
});
define('ember-book-club2/routes/speaker/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
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

    keyForRelationship(key, typeClass, method) {
      if (typeClass === 'belongsTo') {
        return `${key}Id`;
      }

      return this._super(...arguments);
    },

    serializeBelongsTo(snapshot, json, relationship) {
      // super.serializeBelongsTo(...arguments);
      let key = relationship.key;
      let belongsTo = snapshot.belongsTo(key);

      key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
      json[key] = Ember.isNone(belongsTo) ? belongsTo : parseInt(belongsTo.record.get('id'));
    }
  });
});
define('ember-book-club2/serializers/book', ['exports', 'ember-book-club2/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    normalize(model, hash) {
      hash = this._super(...arguments);
      return hash;
    },
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
    normalize(model, hash) {
      hash = this._super(...arguments);
      return hash;
    },
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
    normalize(model, hash) {
      hash = this._super(...arguments);
      return hash;
    },
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
  exports.default = Ember.HTMLBars.template({ "id": "bSG9p23q", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[10,\"class\",\"cover-container d-flex h-100 p-3 mx-auto flex-column\"],[8],[0,\"\\n  \"],[6,\"header\"],[10,\"class\",\"masthead mb-auto\"],[8],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",\"navbar navbar-expand-sm bg-dark navbar-dark text-white\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"         Книжный клуб\\n\"]],\"parameters\":[]},null],[0,\"      \"],[6,\"nav\"],[10,\"class\",\"navbar-nav\"],[8],[0,\"\\n        \"],[6,\"a\"],[10,\"href\",\"#\"],[10,\"class\",\"nav-link active\"],[8],[0,\"Список встреч\"],[9],[0,\"\\n\"],[4,\"link-to\",[\"book\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Список книг\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"speaker\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Список участников\\n\"]],\"parameters\":[]},null],[4,\"link-to\",[\"report\"],[[\"class\"],[\"nav-link\"]],{\"statements\":[[0,\"          Список докладов\\n\"]],\"parameters\":[]},null],[0,\"      \"],[9],[0,\"\\n    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"main\"],[10,\"role\",\"container\"],[10,\"class\",\"container-fluid\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\"],[9]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/application.hbs" } });
});
define("ember-book-club2/templates/book", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "cLMMl1QZ", "block": "{\"symbols\":[\"book\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список книг:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"link-to\",[\"book.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"      Добавить книгу\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"book.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"title\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "L17kHQZm", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Название книги: \"],[1,[22,[\"model\",\"title\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Автор: \"],[1,[22,[\"model\",\"author\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Количество страниц: \"],[1,[22,[\"model\",\"countPages\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"a\"],[11,\"href\",[22,[\"model\",\"descUrl\"]],null],[8],[0,\"Ссылка на полное описание\"],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Список докладов:\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"reports\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[8],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Дата: \"],[1,[21,1,[\"date\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Оценка: \"],[1,[21,1,[\"raiting\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Выступающий: \"],[1,[21,1,[\"speaker\",\"firstName\"]],false],[0,\" \"],[1,[21,1,[\"speaker\",\"lastName\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"book.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"    Изменить\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteBook\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book/detail.hbs" } });
});
define("ember-book-club2/templates/book/edit", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "T8Y7e8aV", "block": "{\"symbols\":[],\"statements\":[[1,[26,\"book-form\",null,[[\"book\",\"onsubmit\"],[[22,[\"model\"]],[26,\"action\",[[21,0,[]],\"onsubmit\"],null]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/book/edit.hbs" } });
});
define("ember-book-club2/templates/components/book-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "u7bQWZFw", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Новая книга\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Название книги: \"],[1,[22,[\"book\",\"title\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Название книги:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"title\"]],\"form-control\",\"Название книги\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Автор:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"author\"]],\"form-control\",\"Автор\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Кол-во страниц:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"countPages\"]],\"form-control\",\"Кол-во страниц\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на изображение:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"imgUrl\"]],\"form-control\",\"Ссылка на изображение\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на страницу покупки:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"descUrl\"]],\"form-control\",\"Ссылка на страницу покупки\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"      Добавить\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      Сохранить\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/book-form.hbs" } });
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
define("ember-book-club2/templates/components/report-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "XFDj881R", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Новый доклад\"],[9],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"  \"],[6,\"h3\"],[8],[0,\"Книга о которой идет речь - \"],[1,[22,[\"book\",\"title\"]],false],[0,\" \"],[1,[22,[\"book\",\"author\"]],false],[9],[0,\"\\n\"]],\"parameters\":[]}],[0,\"\\n\"],[6,\"form\"],[11,\"onsubmit\",[26,\"action\",[[21,0,[]],\"submitForm\"],null],null],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Дата доклада:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"date\",[22,[\"date\"]],\"form-control\",\"\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Краткое содержание:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"shortReview\"]],\"form-control\",\"Очень понравилась пица\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Оценка:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"raiting\"]],\"form-control\",\"5\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на презентацию:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"presentationUrl\"]],\"form-control\",\"Ссылка на презентацию\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на видео:\"],[9],[0,\"\\n    \"],[1,[26,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[22,[\"videoUrl\"]],\"form-control\",\"Ссылка на видео\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Выберите книгу:\"],[9],[0,\"\\n    \"],[1,[26,\"ember-selectize\",null,[[\"content\",\"optionValuePath\",\"optionLabelPath\",\"selection\",\"placeholder\"],[[22,[\"books\"]],\"id\",\"title\",[22,[\"book\"]],\"Select an item\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n   \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Выберите докладчика:\"],[9],[0,\"\\n    \"],[1,[26,\"ember-selectize\",null,[[\"content\",\"optionValuePath\",\"optionLabelPath\",\"selection\",\"placeholder\"],[[22,[\"speakers\"]],\"id\",\"firstName\",[22,[\"speaker\"]],\"Select an item\"]]],false],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"button\"],[10,\"class\",\"btn btn-primary my-1 btn-block active\"],[10,\"type\",\"submit\"],[8],[0,\"\\n\"],[4,\"if\",[[22,[\"isNew\"]]],null,{\"statements\":[[0,\"      Добавить\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"      Сохранить\\n\"]],\"parameters\":[]}],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/components/report-form.hbs" } });
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
define("ember-book-club2/templates/report", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "uyi7EPvn", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список репортов:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"link-to\",[\"report.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"      Добавить report\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"report.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"date\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/report.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "7lXxRXOn", "block": "{\"symbols\":[],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Название книги и автор: \"],[1,[22,[\"model\",\"book\",\"title\"]],false],[0,\" \"],[1,[22,[\"model\",\"book\",\"author\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Докладчик: \"],[1,[22,[\"model\",\"speaker\",\"firstName\"]],false],[0,\" \"],[1,[22,[\"model\",\"speaker\",\"lastName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n   \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Дата доклада: \"],[1,[22,[\"model\",\"date\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Краткое содержание: \"],[1,[22,[\"model\",\"shortReview\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Оценка: \"],[1,[22,[\"model\",\"raiting\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на презентацию: \"],[1,[22,[\"model\",\"presentationUrl\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Ссылка на видео: \"],[1,[22,[\"model\",\"videoUrl\"]],false],[9],[0,\"\\n\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"report.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"    Изменить\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteReport\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/report/detail.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "hEHmKeQP", "block": "{\"symbols\":[\"speaker\"],\"statements\":[[6,\"div\"],[10,\"class\",\"row \"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"col-3 mr-3 h-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[6,\"h4\"],[8],[0,\"Список участников:\"],[9],[0,\"\\n      \"],[1,[26,\"input\",null,[[\"value\",\"placeholder\",\"class\"],[[22,[\"search\"]],\"Поиск\",\"form-control my-2\"]]],false],[0,\"\\n\"],[4,\"link-to\",[\"speaker.create\"],[[\"class\"],[\"btn btn-primary my-2 btn-block\"]],{\"statements\":[[0,\"      Добавить участника\\n\"]],\"parameters\":[]},null],[0,\"    \"],[6,\"div\"],[8],[9],[0,\"\\n    \"],[6,\"ul\"],[10,\"class\",\"list-group overflow-auto main-row\"],[8],[0,\"\\n\"],[4,\"each\",[[22,[\"model\"]]],null,{\"statements\":[[4,\"link-to\",[\"speaker.detail\",[21,1,[\"id\"]]],[[\"class\"],[\"list-group-item my-1 border\"]],{\"statements\":[[0,\"          \"],[1,[21,1,[\"lastName\"]],false],[0,\" \"],[1,[21,1,[\"firstName\"]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"    \"],[9],[0,\"\\n  \"],[9],[0,\"\\n\\n  \"],[6,\"div\"],[10,\"class\",\"col mh-100 p-3 my-3 border text-black\"],[8],[0,\"\\n    \"],[1,[20,\"outlet\"],false],[0,\"\\n  \"],[9],[0,\"\\n\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/speaker.hbs" } });
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
  exports.default = Ember.HTMLBars.template({ "id": "kUsbojrb", "block": "{\"symbols\":[\"report\"],\"statements\":[[6,\"h3\"],[8],[0,\"Детальная информация об участнике:\"],[9],[0,\"\\n\"],[6,\"form\"],[8],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Имя: \"],[1,[22,[\"model\",\"firstName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n  \"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Фамилия: \"],[1,[22,[\"model\",\"lastName\"]],false],[9],[0,\"\\n  \"],[9],[0,\"\\n\"],[6,\"div\"],[10,\"class\",\"form-group\"],[8],[0,\"\\n    \"],[6,\"label\"],[8],[0,\"Список докладов:\"],[9],[0,\"\\n\"],[4,\"each\",[[22,[\"model\",\"reports\"]]],null,{\"statements\":[[0,\"      \"],[6,\"div\"],[8],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Дата: \"],[1,[21,1,[\"date\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n        \"],[6,\"div\"],[8],[0,\"\\n          \"],[6,\"label\"],[8],[0,\"Оценка: \"],[1,[21,1,[\"raiting\"]],false],[9],[0,\"\\n        \"],[9],[0,\"\\n\\n      \"],[9],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[9],[0,\"\\n\"],[9],[0,\"\\n\\n\"],[6,\"div\"],[10,\"class\",\"row\"],[8],[0,\"\\n\"],[4,\"link-to\",[\"speaker.edit\",[22,[\"model\",\"id\"]]],[[\"class\"],[\"col btn btn-primary mx-3  active\"]],{\"statements\":[[0,\"    Изменить\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"button\"],[10,\"class\",\"col btn btn-primary mr-3  active\"],[11,\"onclick\",[26,\"action\",[[21,0,[]],\"deleteSpeaker\",[22,[\"model\"]]],null],null],[8],[0,\"Удалить\"],[9],[0,\"\\n\"],[9],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-book-club2/templates/speaker/detail.hbs" } });
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
  require("ember-book-club2/app")["default"].create({"name":"ember-book-club2","version":"0.0.0+b6281bff"});
}
//# sourceMappingURL=ember-book-club2.map
