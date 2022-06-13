/*!
 * Author: ZCHE
 */


(function (factory) {
    "use strict";
    //noinspection JSUnresolvedVariable
    if (typeof define === 'function' && define.amd) { // jshint ignore:line
        // AMD. Register as an anonymous module.
        define(['jquery'], factory); // jshint ignore:line
    } else { // noinspection JSUnresolvedVariable
        if (typeof module === 'object' && module.exports) { // jshint ignore:line
            // Node/CommonJS
            // noinspection JSUnresolvedVariable
            module.exports = factory(require('jquery')); // jshint ignore:line
        } else {
            // Browser globals
            factory(window.jQuery);
        }
    }
}(function ($) {
    "use strict";

    var Step;
    Step = function (element, options) {
        var self = this;
        self.$element = $(element);
        self._init(options);
    };
    Step.prototype = {
        constructor: Step,
        _init: function (options) {
            var self = this, $el = self.$element;
            var opts = self.options = options;
            var index = opts.index || 1;
            opts.total = $(".step-flow", $el).find("li").length;
            self.go(index);
        },
        go: function (index) {

            var self = this, $el = self.$element, opts = self.options;

            if (self.options.onBeginChange) {
                if (self.options.onBeginChange.call(self, self.options.index) == false) {
                    return false;
                }
            }

            opts.index = index;


            var flow = $(".step-flow", $el);
            var flowCount = flow.find("li").length;
            flow.find('li').removeClass('active');
            flow.find('li:lt(' + index + ')').addClass('active');

            var con = $(".step-con", $el);
            $(".step-con>div", $el).hide();
            $('.step-con>div:eq(' + (index - 1) + ')', $el).show();

            if (self.options.onChanged) {
                self.options.onChanged.call(self, self.options.index);
            }
        },
        pre: function () {
            var self = this, $el = self.$element, opts = self.options;
            var index = opts.index - 1;
            if (index <= 0) {
                return;
            }
            self.go(index);
        },
        next: function () {
            var self = this, $el = self.$element, opts = self.options;
            var index = opts.index + 1;
            if (index > opts.total) {
                return;
            }
            self.go(index);
        }
    }

    $.fn.step = function (option) {
        return new Step(this, option);
    };

    $.fn.step.Constructor = Step;

    return Step;
}));

