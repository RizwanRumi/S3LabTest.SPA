(function () {
    'use strict';

    angular.module('myApp')
    .directive('suchHref', suchHref);

    suchHref.$inject = ['$location'];

    function suchHref($location) {

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;

        function link(scope, element, attr) {
            element.attr('style', 'cursor:pointer');
            element.on('click', function () {
                location.url(attr.suchHref);
                scope.$apply();
            });
        };
    };


})();