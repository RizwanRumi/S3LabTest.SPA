
(function () {
    'use strict'

    angular.module('myApp')
    .controller('SyllabusCreateController', SyllabusCreateController);

    SyllabusCreateController.$inject = ['$location',
                                        '$window',
                                        '$scope',
                                        'tradeService',
                                        'levelService',
                                        'languageService',
                                        'pagerService',
                                        'logger'];


    function SyllabusCreateController($location, $window, $scope, tradeService, levelService, languageService, pagerService, logger) {
      
        $scope.myName = "Rizwanur Rahman Rumi";

        $scope.tradeList = [];
        $scope.levelList = [];
        $scope.languageList = [];
 
        $scope.newSyllabus = {};
        $scope.selectedTrade = null;
        $scope.selectedLevel = null;

        //    $scope.active = function () {

        tradeService.getTrades()
            .then(function (data) {
                $scope.tradeList = data;
            });

        levelService.getLevels()
            .then(function (data) {
                $scope.levelList = data;
            });

        languageService.getLanguages()
            .then(function (data) {
                $scope.languageList = data;
            });
        //   };


        $scope.states = {
            errorTradeId: false,
            errorLevelId: false,
            errorLanguages: false
        };
               

        $scope.clearSyllabusForm = function () {
            $scope.states.errorTradeId = false;
            $scope.states.errorLevelId = false;
            $scope.states.errorLanguages = false;


            $scope.states.errorPubDate = false;
            $scope.states.errorPrice = false;
            $scope.states.errorPubHouse = false;
            $scope.states.errorFile = false;
            $scope.Message = "";
            $scope.new.Book = {};
            $scope.newImgUpload = null;
            $scope.file = null;
            $scope.filename = "";
            angular.element("input[type='file']").val(null);
            $("#imageFile").val('');

        };

        
        $scope.selectedLangList = [];
        $scope.change = function (lang) {
            var indexOfLang = $scope.selectedLangList.indexOf(lang);
            if (indexOfLang === -1) {
                $scope.selectedLangList.push(lang)
            } else {
                $scope.selectedLangList.splice(indexOfLang, 1)
            }
            var len = $scope.selectedLangList.length;
            $scope.errorLanguages(len);
        };


      // validation check

        $scope.errorTradeChange = function (e) {            
            if (e != null && e != "") {
                return $scope.states.errorTradeId = false;
            }
            else {
                return $scope.states.errorTradeId = true;
            }
        };

        $scope.errorLevelChange = function (e) {            
            if (e != null && e != "") {
                return $scope.states.errorLevelId = false;
            }
            else {
                return $scope.states.errorLevelId = true;
            }
        };

        $scope.errorLanguages = function (e) {
            if (e > 0) {
                return $scope.states.errorLevelId = false;
            }
            else {
                return $scope.states.errorLevelId = true;
            }
        };
   
        
        $scope.saveSyllabus = function () {

            var trade = $scope.errorTradeChange($scope.selectedTrade.TradeId);
            var lvl = $scope.errorLevelChange($scope.selectedLevel.LevelId);
            var lng = $scope.errorLanguages($scope.selectedLangList.length);

            if (Boolean(trade) == false && Boolean(lvl) == false && Boolean(lng) == false) {

                $scope.newSyllabus.SyllabusId = 0;
                $scope.newSyllabus.UploadBy = 1;
                $scope.newSyllabus.TradeId = $scope.selectedTrade.TradeId;
                $scope.newSyllabus.LevelId = $scope.selectedLevel.LevelId;
                $scope.newSyllabus.states = Math.floor(Math.random() * (1 - 0 + 1) + 0);

                alert($scope.newSyllabus.TradeId + " " + $scope.newSyllabus.LevelId + " " + $scope.newSyllabus.states);
            }
          
        }

    }
})();