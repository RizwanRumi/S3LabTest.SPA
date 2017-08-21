
(function () {
    'use strict';

    angular.module('myApp')
    .directive('indexNav',indexNav);
    
    function indexNav() {

        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/nav.directive.html'            
        };

        return directive;
    };

})();