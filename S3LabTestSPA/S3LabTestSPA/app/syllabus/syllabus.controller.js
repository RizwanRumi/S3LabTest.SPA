
(function () {
    'use strict'

    angular.module('myApp')
    .controller('SyllabusController', SyllabusController);

    SyllabusController.$inject = ['$state',
                                '$scope',
                                'tradeService',
                                'levelService',
                                'languageService',
                                'fileuploadservice',
                                'syllabusService',
                                'pagerService',
                                'logger'];


    function SyllabusController($state, $scope, tradeService, levelService,
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
        
            $scope.filterData = function (tData, lData) {
                if (tData != null && tData != '' && lData != null && lData != '') {
                    syllabusService.getSortedSyllabusList(tData, lData)
                    .then(function (data) {
                        $scope.totalData = data;
                        $scope.totalCount = data.length;
                        $scope.setPage(1);
                    });
                }
                else if (tData != null && tData != '') {
                    syllabusService.getListbyTradeId(tData)
                    .then(function (data) {
                        $scope.totalData = data;
                        $scope.totalCount = data.length;
                        $scope.setPage(1);
                    });
                }
                else if (lData != null && lData != '') {
                    syllabusService.getListbyLevelId(lData)
                    .then(function (data) {
                        $scope.totalData = data;
                        $scope.totalCount = data.length;
                        $scope.setPage(1);
                    });
                }
                else {
                    alert('Please select trade or level.');
                }
            };

            function setPage(page) {

                if (page < 1 || page > $scope.pager.totalPages) {
                    return;
                }

                // get pager object from service
                $scope.pager = pagerService.GetPager($scope.totalData.length, page);

                // get current page of items
                $scope.syllabusList = $scope.totalData.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
            };

            

    }

})();