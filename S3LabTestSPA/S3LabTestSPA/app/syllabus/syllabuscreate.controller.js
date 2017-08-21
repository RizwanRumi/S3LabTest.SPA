
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
 

        $scope.states = {
            errorTradeId: false,
            errorLevelId: false
        };


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

        $scope.selectedLangList = []; //this is the object to store the selected checkbox values
        $scope.change = function (lang) {
            var indexOfLang = $scope.selectedLangList.indexOf(lang);
            if (indexOfLang === -1) {
                $scope.selectedLangList.push(lang)
            } else {
                $scope.selectedLangList.splice(indexOfLang, 1)
            }
        };


        $scope.newSyllabus = {};
        $scope.selectedTrade = null;
        $scope.selectedLevel = null;

        $scope.clearSyllabusForm = function (show) {
            $scope.states.errorTradeId = false;
            $scope.states.errorIsbn = false;
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
        

        $scope.errorTradeChange = function (e) {
            alert(e);
            if (e != null && e != "") {
                return $scope.states.errorTradeId = false;
            }
            else {
                return $scope.states.errorTradeId = true;
            }
        };

        $scope.errorLevelChange = function (e) {
            alert(e);
            if (e != null && e != "") {
                return $scope.states.errorLevelId = false;
            }
            else {
                return $scope.states.errorLevelId = true;
            }
        };
   
        
        $scope.saveSyllabus = function () {

            $scope.newSyllabus.TradeId = $scope.selectedTrade.TradeId;
            $scope.newSyllabus.LevelId = $scope.selectedLevel.LevelId;
            
            alert($scope.newSyllabus.TradeId + " " + $scope.newSyllabus.LevelId);
        }

    }
})();