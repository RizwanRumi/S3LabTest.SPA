(function () {
    'use strict';

    angular.module('myApp')
    .controller('DeleteAuthorController', DeleteAuthorController);

    DeleteAuthorController.$inject = ['$location', '$window', '$stateParams', 'authorservice', 'logger'];

    function DeleteAuthorController($location, $window, $stateParams, authorservice, logger) {


        var vm = this;
        vm.message = "Delete Page with query string id :" + $stateParams.authorId;
        vm.authorInfo = {};

        var getId = $stateParams.authorId;
       

        vm.$onInit = function () {

            authorservice.getAuthor(getId)
               .then(function (data) {
                   vm.authorInfo = data;
               }, function (error) {
                   vm.status = 'Unable to load author data: ' + error.message;
               });
        };
       

        vm.deleteAuthor = function (id) {
           
            var val = confirm("Do You Want to Delete id: " + id + "?");

            if (val == true) {
                authorservice.deleteAuthor(id)
               .then(function (response) {
                   $location.path("/Author");
               }, function (error) {
                   vm.status = 'Unable to load author data: ' + error.message;
               });
            }
           
        }
    };

})();