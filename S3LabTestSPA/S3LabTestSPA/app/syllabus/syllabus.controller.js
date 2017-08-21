
(function () {
    'use strict'

    angular.module('myApp')
    .controller('SyllabusController', SyllabusController);

    SyllabusController.$inject = ['$location',
                                '$window',
                                '$scope',
                                'tradeService',
                                'levelService',
                                'languageService',
                                'fileuploadservice',
                                'syllabusService',
                                'pagerService',
                                'logger'];


    function SyllabusController($location, $window, $scope, tradeService, levelService,
        languageService, fileuploadservice, syllabusService, pagerService, logger) {

        $scope.listP = "Syllabus List Page";
                
        $scope.tradeList = [];
        $scope.levelList = [];       
        $scope.syllabusList = [];
        $scope.message = "";

        $scope.totalData = [];
        $scope.pager = {};
        $scope.setPage = setPage;

        tradeService.getTrades()
            .then(function (data) {
                $scope.tradeList = data;
            });

        levelService.getLevels()
            .then(function (data) {
                $scope.levelList = data;
            });

        
            syllabusService.getSyllabusList()
           .then(function (data) {
               $scope.totalData = data;
               $scope.totalCount = data.length;
               $scope.setPage(1);
           });
        
        function setPage(page) {

            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }

            // get pager object from service
            $scope.pager = pagerService.GetPager($scope.totalData.length, page);

            // get current page of items
            $scope.syllabusList = $scope.totalData.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
        }
    }

})();