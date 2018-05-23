(function() {
  'use strict';

  angular.module('bp.disabled-in-progress', [])
    .directive('bpDisabledInProgress', bpDisabledInProgress);

  /* @ngInject */
  function bpDisabledInProgress($compile) {
    return {
      restrict: 'A',
      terminal: true,
      priority: 1000,
      link: function(scope, element, attrs) {
        var currentNgClass;
        // grab the expression that signifies progress
        var inProgressExpr = attrs.bpDisabledInProgress;
        var disabledExpr = element.attr('ng-disabled');

        disabledExpr = disabledExpr ? ('(' + disabledExpr + ') || (' + inProgressExpr + ')') : inProgressExpr;

        // check for a pre-existing font awesome icon element; this returns a jQuery list that may or may not be empty
        var icoElem = element.find('i.fa');

        // if one was found, prep it to do double duty as a spinner
        if (icoElem.length) {
          var classList = icoElem.attr('class').split(' '),

          currentNgClass = (icoElem.attr('ng-class') || '').trim(),
          faClasses = '',
          newNgClass = '{';

          for (var i = 0; i < classList.length; i++) {
            var className = classList[i];

            // remove & hold any font awesome icon-specifying class(es)
            if (className.indexOf('fa-') === 0) {
              icoElem.removeClass(className);
              faClasses += ' ' + className;
            }
          }

          if (faClasses.length) {
            // toggle the existing font awesome icon and spinner
            newNgClass += '\'' + faClasses.trim() + '\': !(' + inProgressExpr + '), ';
          }

          newNgClass += '\'fa-spinner fa-spin\': ' + inProgressExpr + '}';

          // ensure we don't ovewrite an existing ng-class value.
          if (currentNgClass) {
            // it's in the form of an "array" string.
            if (currentNgClass.match(/^\[.*\]$/)) {
              // add the new checks to the end.
              newNgClass = currentNgClass.slice(0, -1) + ',' + newNgClass + ']';
            }
            // "object" string or straight up expression
            else {
              // create an "array" string out of the two
              newNgClass = '[' + currentNgClass + ',' + newNgClass + ']';
            }
          }

          icoElem.attr('ng-class', newNgClass);
        }
        // no icon element. add one to the front of the element.
        else {
          element.prepend('<i class="fa fa-spinner fa-spin" ng-show="' + inProgressExpr + '"></i> ');
        }

        element.attr('ng-disabled', disabledExpr);
        element.removeAttr('ew-disabled-in-progress');

        $compile(element)(scope);
      }
    };
  }
})();
