
(function () {
    'use strict';

    angular.module('myApp')
    .directive('fileDownload', function () {
        return {
            restrict: 'E', // applied on 'element'
            scope: {
                fileurl: '@fileurl',
                linktext: '@linktext'
            },
            template: '<a href="{{ fileurl }}" download>{{ linktext }}</a>', // need this so that the inner HTML can be re-used
            link: function (scope, elem, attrs) {
                /* Ref: https://thinkster.io/egghead/isolate-scope-at
                 * This block is used when we have
                 * scope: {
                     fileurl: '=fileurl',
                     linktext: '=linktext'     
                   }          
                 scope.fileurl = attrs.fileurl;
                 scope.linktext = attrs.linktext;*/
            }
        }
    })

})();
