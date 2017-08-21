﻿
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

        $scope.sylbfile = null;
        $scope.sylbfilename = '';
        $scope.sylbfileMessage = 'File extension should be .pdf, .doc, .docx, .xls, .jpg, .png or .jpeg';

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
            errorLanguages: false,
            errorSylbName: false,
            errorOfficer: false,
            errorManager: false,
            errorActiveDt: false,
            errorSylbFile: false
        };
               

        $scope.clearSyllabusForm = function () {
            $scope.states.errorTradeId = false;
            $scope.states.errorLevelId = false;
            $scope.states.errorLanguages = false;
            $scope.states.errorSylbName = false;
            $scope.states.errorOfficer = false;
            $scope.states.errorManager = false;
            $scope.states.errorActiveDt = false;
            $scope.states.errorSylbFile = false;
            $scope.sylbfile = null;
            $scope.sylbfilename = '';
            $scope.sylbfileMessage = 'File extension should be .pdf, .doc, .docx, .xls, .jpg, .png or .jpeg';
            angular.element("input[type='file']").val(null);

           
           
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

        //file 
        $scope.setSylbFile = function (element) {
            $scope.$apply(function ($scope) {
                $scope.sylbfile = element.files[0];
             
                $scope.sylbfilename = $scope.sylbfile.name;
                
                $scope.errorFileChange($scope.sylbfile, 'sylb');
                      
                var getfilename = $scope.sylbfilename;
                
                // console.log(filename.length)
                $scope.chekFileExt(getfilename, 'sylb');
               
            });

            $scope.readURL(element);
        };

        $scope.readURL = function (input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    //if (optVal == 'add') {
                    //    $('#imageView').attr('src', e.target.result);
                    //}
                    //else {
                    //    $('#editImgView').attr('src', e.target.result);
                    //}
                };
                reader.readAsDataURL(input.files[0]);
            }
        };

        $scope.chekFileExt = function (filename, opt) {           
            var index = filename.lastIndexOf(".");
            var strsubstring = filename.substring(index, filename.length).toLowerCase();
            if (strsubstring == '.pdf' || strsubstring == '.doc' || strsubstring == '.docx' || strsubstring == '.xls' || strsubstring == '.png' || strsubstring == '.jpeg' || strsubstring == '.png' || strsubstring == '.gif') {
                console.log('File Uploaded sucessfully');
                if (opt == 'sylb') {
                    $scope.sylbfileMessage = '';
                }
                
                
            }
            else {
                if (opt == 'sylb') {
                    $scope.sylbfile = null;
                    $scope.sylbfilename = '';
                    $scope.sylbfileMessage = 'please upload correct File Name, File extension should be .pdf, .doc, .docx, .xls, .jpg, .png or .jpeg';
                }
               
            }
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
                return $scope.states.errorLanguages = false;
            }
            else {
                return $scope.states.errorLanguages = true;
            }
        };
   
        $scope.errorSylbNameChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorSylbName = false;
            }
            else {
                return $scope.states.errorSylbName = true;
            }
        };

        $scope.errorOfficerChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorOfficer = false;
            }
            else {
                return $scope.states.errorOfficer = true;
            }
        };

        $scope.errorManagerChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorManager = false;
            }
            else {
                return $scope.states.errorManager = true;
            }
        };

        $scope.errorActivedtChange = function (e) {            
            if (e != null && e != "") {
                return $scope.states.errorActiveDt = false;
            }
            else {
                return $scope.states.errorActiveDt = true;
            }
        };

        $scope.errorFileChange = function (e, opt) {
            if (e != null && e != "") {
                if (opt == 'sylb') {
                    $scope.sylbfileMessage = '';
                    return $scope.states.errorSylbFile = false;
                }
               
            }
            else {
                if (opt == 'sylb') {
                    $scope.sylbfileMessage = '';
                    return $scope.states.errorSylbFile = true;
                }
            }
        };

       
        
        $scope.saveSyllabus = function () {            
            
            var trd = $scope.errorTradeChange($scope.selectedTrade);
            var lvl = $scope.errorLevelChange($scope.selectedLevel);
            var lng = $scope.errorLanguages($scope.selectedLangList.length);
            var slb = $scope.errorSylbNameChange($scope.newSyllabus.SyllabusName);
            var ofc = $scope.errorOfficerChange($scope.newSyllabus.DevelopmentOfficer);
            var mng = $scope.errorManagerChange($scope.newSyllabus.Manager);
            var adt = $scope.errorActivedtChange($scope.newSyllabus.ActiveDt);
            var sfile = $scope.errorFileChange($scope.sylbfile, 'sylb');
          
            if (Boolean(trd) == false && Boolean(lvl) == false && Boolean(lng) == false  &&
                Boolean(slb) == false && Boolean(adt) == false && Boolean(sfil) == false) {

                $scope.newSyllabus.SyllabusId = 0;
                $scope.newSyllabus.UploadBy = 1;
                $scope.newSyllabus.TradeId = $scope.selectedTrade.TradeId;
                $scope.newSyllabus.LevelId = $scope.selectedLevel.LevelId;
                
                $scope.newSyllabus.SyllabusFileName = $scope.sylbfilename;

                $scope.newSyllabus.states = Math.floor(Math.random() * (1 - 0 + 1) + 0);

                alert($scope.newSyllabus.TradeId + " " + $scope.newSyllabus.LevelId + " " + $scope.newSyllabus.states);
            }
          
        }

    }
})();