/// <reference path="../Scripts/angular.js" />


(function () {
    'use strict';

    angular.module('myApp')
    .config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {

      //  $locationProvider.html5Mode(true);

        $stateProvider.
            state('syllabus', {
                url: '/syllabus',
                templateUrl: 'app/syllabus/syllabus.html'
            }).
            state('syllabus.list', {
                url: '/list',
                templateUrl: 'app/syllabus/partial-syllabus-list.html',
                controller: 'SyllabusController'
            }).
            state('syllabus.create', {
                url: '/create',
                templateUrl: 'app/syllabus/partial-syllabus-create.html',
                controller: 'SyllabusCreateController'
            }).
            state('syllabus.edit', {
                url: '/edit/:syllabusId',
                templateUrl: 'app/syllabus/partial-syllabus-edit.html'
            }).
            state('syllabus.delete', {
                url: '/delete/:syllabusId',
                templateUrl: 'app/syllabus/partial-syllabus-delete.html'
            });

        $urlRouterProvider.otherwise('/syllabus');
    }]);

})();


