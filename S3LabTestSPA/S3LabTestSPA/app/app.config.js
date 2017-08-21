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
                controller: 'SyllabusController',
                controllerAs: 'slb'
            }).
            state('syllabus.create', {
                url: '/create',
                templateUrl: 'app/syllabus/partial-syllabus-create.html',
                controller: 'SyllabusCreateController'
            }).

         state('authors', {
             url: '/authors',
             templateUrl: 'app/authors/authors.html',
             controller: 'AuthorsController',
             controllerAs: 'vm'
         }).
        state('/author', {
            url: '/authors/:authorId',
            templateUrl: 'app/authors/author.html',
            controller: 'AuthorController',
            controllerAs: 'vm'
        }).
        //state('/Add', {
        //    templateUrl: 'Views/Author/AddAuthor.html',
        //    controller: 'AddAuthorController'
        //}).
        //state('/Edit', {
        //    templateUrl: 'Views/Author/EditAuthor.html',
        //    controller: 'EditAuthorController'
        //}).
        state('/delete', {
            url: '/delete/:authorId',
            templateUrl: 'app/authors/delete.author.html',
            controller: 'DeleteAuthorController',
            controllerAs: 'vm'
        }).
        state('/books', {
            url: '/books/:authorId',
            templateUrl: 'app/books/books.html',
            controller: 'BooksController',
            controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/syllabus');
    }]);

})();


