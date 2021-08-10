/*!
 * Flickity asNavFor v2.0.2
 * enable asNavFor for Flickity
 */

/*jshint browser: true, undef: true, unused: true, strict: true*/
if (typeof window !== "undefined") {

  (function (window, factory) {
    // universal module definition
    /*jshint strict: false */ /*globals define, module, require */
    if (typeof define == 'function' && define.amd) {
      // AMD
      define([
        'flickity/js/index',
        'fizzy-ui-utils/utils'
      ], factory);
    } else if (typeof module == 'object' && module.exports) {
      // CommonJS
      module.exports = factory(
        require('flickity'),
        require('fizzy-ui-utils')
      );
    } else {
      // browser globalzz
      window.Flickity = factory(
        window.Flickity,
        window.fizzyUIUtils
      );
    }

  }(window, function factory(Flickity, utils) {

    'use strict';

    // -------------------------- asNavFor prototype -------------------------- //

    // Flickity.defaults.asNavFor = null;

    Flickity.createMethods.push('_createAsNavFor');

    var proto = Flickity.prototype;

    proto._createAsNavFor = function () {
      this.on('activate', this.activateAsNavFor);
      this.on('deactivate', this.deactivateAsNavFor);
      this.on('destroy', this.destroyAsNavFor);

      var asNavForOption = this.options.asNavFor;
      if (!asNavForOption) {
        return;
      }
      // HACK do async, give time for other flickity to be initalized
      var _this = this;
      setTimeout(function initNavCompanion() {
        _this.setNavCompanion(asNavForOption);
      });
    };

    proto.setNavCompanion = function (elem) {
      elem = utils.getQueryElement(elem);
      var companion = Flickity.data(elem);
      // stop if no companion or companion is self
      if (!companion || companion == this) {
        return;
      }

      this.navCompanion = companion;
      // companion select
      var _this = this;
      this.onNavCompanionSelect = function () {
        _this.navCompanionSelect();
      };
      companion.on('select', this.onNavCompanionSelect);
      // click
      this.on('staticClick', this.onNavStaticClick);

      this.navCompanionSelect(true);
    };

    proto.navCompanionSelect = function (isInstant) {
      if (!this.navCompanion) {
        return;
      }
      // select slide that matches first cell of slide
      var selectedCell = this.navCompanion.selectedCells[0];
      var firstIndex = this.navCompanion.cells.indexOf(selectedCell);
      var lastIndex = firstIndex + this.navCompanion.selectedCells.length - 1;
      var selectIndex = Math.floor(lerp(firstIndex, lastIndex,
        this.navCompanion.cellAlign));
      this.selectCell(selectIndex, false, isInstant);
      // set nav selected class
      this.removeNavSelectedElements();
      // stop if companion has more cells than this one
      if (selectIndex >= this.cells.length) {
        return;
      }

      var selectedCells = this.cells.slice(firstIndex, lastIndex + 1);
      this.navSelectedElements = selectedCells.map(function (cell) {
        return cell.element;
      });
      this.changeNavSelectedClass('add');
    };

    function lerp(a, b, t) {
      return (b - a) * t + a;
    }

    proto.changeNavSelectedClass = function (method) {
      this.navSelectedElements.forEach(function (navElem) {
        navElem.classList[method]('is-nav-selected');
      });
    };

    proto.activateAsNavFor = function () {
      this.navCompanionSelect(true);
    };

    proto.removeNavSelectedElements = function () {
      if (!this.navSelectedElements) {
        return;
      }
      this.changeNavSelectedClass('remove');
      delete this.navSelectedElements;
    };

    proto.onNavStaticClick = function (event, pointer, cellElement, cellIndex) {
      if (typeof cellIndex == 'number') {
        this.navCompanion.selectCell(cellIndex);
      }
    };

    proto.deactivateAsNavFor = function () {
      this.removeNavSelectedElements();
    };

    proto.destroyAsNavFor = function () {
      if (!this.navCompanion) {
        return;
      }
      this.navCompanion.off('select', this.onNavCompanionSelect);
      this.off('staticClick', this.onNavStaticClick);
      delete this.navCompanion;
    };

    // -----  ----- //

    return Flickity;

  }));
}
