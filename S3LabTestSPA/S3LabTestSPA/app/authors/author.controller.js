
(function () {
    'use strict';

angular.module('myApp')
    .controller('AuthorController', AuthorController);

AuthorController.$inject = ['$location', '$window', '$stateParams', 'authorservice', 'logger'];

function AuthorController($location, $window, $stateParams, authorservice, logger) {
  
    var getAuthorId = $stateParams.authorId;

    var vm = this;
    vm.authorInfo = [];
    
    vm.$onInit = function () {
        authorservice.getAuthor(getAuthorId)
            .then(function (data) {
                vm.authorInfo = data;
                // return vm.author;
            });
    };

    vm.states = {
        clearAuthorForm: false,
        errorInitials: false,
        errorFirstName: false,
        errorLastName: false,
        errorAddress: false,
        errorZipCode: false,
        errorCountry: false
    };



    vm.clearAuthorForm = function (show) {
        vm.states.errorInitials = false;
        vm.states.errorFirstName = false;
        vm.states.errorLastName = false;
        vm.states.errorAddress = false;
        vm.states.errorZipCode = false;
        vm.states.errorCountry = false;
        vm.Message = "";
        $('#editAuthorModal').modal('hide');
    };

    //Error checking
    vm.errorInitStateChange = function (e) {
        if (e != null && e != "") {
            return vm.states.errorInitials = false;
        }
        else {
            return vm.states.errorInitials = true;
        }
    };

    vm.errorFNameStateChange = function (e) {
        if (e != null && e != "") {
            return vm.states.errorFirstName = false;
        }
        else {
            return vm.states.errorFirstName = true;
        }
    };

    vm.errorLNameStateChange = function (e) {
        if (e != null && e != "") {
            return vm.states.errorLastName = false;
        }
        else {
            return vm.states.errorLastName = true;
        }
    };

    vm.errorAdrStateChange = function (e) {
        if (e != null && e != "") {
            return vm.states.errorAddress = false;
        }
        else {
            return vm.states.errorAddress = true;
        }
    };

    vm.errorZipStateChange = function (e) {
        if (e != null && e != "") {
            return vm.states.errorZipCode = false;
        }
        else {
            return vm.states.errorZipCode = true;
        }
    };

    vm.errorCntryStateChange = function (e) {
        if (e != null && e != "") {
            return vm.states.errorCountry = false;
        }
        else {
            return vm.states.errorCountry = true;
        }
    };

    vm.EditAuthormdl = {};


    vm.EditAuthorModel = function (item) {
        vm.EditAuthormdl = item;
    };

    vm.updateAuthor = function (editAuthor) {
        var inits = vm.errorInitStateChange(editAuthor.Initials);
        var fName = vm.errorFNameStateChange(editAuthor.FirstName);
        var lName = vm.errorLNameStateChange(editAuthor.LastName);
        var addr = vm.errorAdrStateChange(editAuthor.Address);
        var zcode = vm.errorZipStateChange(editAuthor.ZipCode);
        var cntry = vm.errorCntryStateChange(editAuthor.Country);


        if (Boolean(inits) == false && Boolean(fName) == false && Boolean(lName) == false && Boolean(addr) == false && Boolean(zcode) == false && Boolean(cntry) == false) {

            var msg = vm.Message;


            authorservice.updateAuthor(editAuthor)
              .then(function (response) {
                  // $window.location.reload();
                  $('#editAuthorModal').modal('hide');
              }, function (error) {
                  vm.Message = error.message;
                  $("#msgView").css('color', 'red');
              });
        }


    };
    


};


})();