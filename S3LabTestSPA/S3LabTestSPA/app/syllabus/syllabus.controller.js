
(function () {
    'use strict'

    angular.module('myApp')
    .controller('SyllabusController', SyllabusController);

    SyllabusController.$inject = ['$location', '$window', '$scope', 'pagerService', 'logger'];


    function SyllabusController($location, $window, $scope, pagerService, logger) {
        var slb = this;
        slb.listP = "Syllabus List Page";

       
    }

})();