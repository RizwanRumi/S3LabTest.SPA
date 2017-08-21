
(function () {
    'use strict';

    angular.module('myApp')
    .directive('authorNav', authorNav);

    function authorNav() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/authornav.directive.html'

        };

        return directive;
    };

})();