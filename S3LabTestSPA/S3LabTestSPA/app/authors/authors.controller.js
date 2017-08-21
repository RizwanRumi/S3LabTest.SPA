
(function () {
    'use strict';

   angular.module('myApp')
    .controller('AuthorsController', AuthorsController);

   AuthorsController.$inject = ['$location', '$window', 'pagerService', 'authorservice', 'logger'];

   function AuthorsController($location, $window, pagerService, authorservice, logger) {
        var vm = this;
        vm.authorsList = [];       
        vm.Message = "";
    
        vm.totalData = [];
        vm.pager = {};
        vm.setPage = setPage;


     vm.$onInit = function () {

            authorservice.getAuthors()
                .then(function (data) {
                    vm.totalData = data;
                    vm.totalCount = data.length;
                    vm.setPage(1);
                });

          
        };

        function setPage(page) {
               
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }
           
            // get pager object from service
            vm.pager = pagerService.GetPager(vm.totalData.length, page);

            // get current page of items
            vm.authorsList = vm.totalData.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }
        
        vm.states = {
            clearAuthorForm: false,
            errorInitials: false,
            errorFirstName: false,
            errorLastName: false,
            errorAddress: false,
            errorZipCode: false,
            errorCountry: false

        };

        vm.Author = {};

        vm.clearAuthorForm = function (show) {
            vm.states.errorInitials = false;
            vm.states.errorFirstName = false;
            vm.states.errorLastName = false;
            vm.states.errorAddress = false;
            vm.states.errorZipCode = false;
            vm.states.errorCountry = false;
            vm.Message = "";
            vm.Author = {};
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


        vm.saveAuthor = function () {
            var inits = vm.errorInitStateChange(vm.Author.Initials);
            var fName = vm.errorFNameStateChange(vm.Author.FirstName);
            var lName = vm.errorLNameStateChange(vm.Author.LastName);
            var addr = vm.errorAdrStateChange(vm.Author.Address);
            var zcode = vm.errorZipStateChange(vm.Author.ZipCode);
            var cntry = vm.errorCntryStateChange(vm.Author.Country);


            if (Boolean(inits) == false && Boolean(fName) == false && Boolean(lName) == false &&
                Boolean(addr) == false && Boolean(zcode) == false && Boolean(cntry) == false) {

                vm.Author.AuthorId = 0;

                var athr = vm.Author;

                var msg = vm.Message;

           
                 authorservice.insertAuthor(athr)
                 .then(function (response) {
                     // vm.Authors.push(vm.Author);
                     vm.Author = {};
                     vm.Message = "";
                     $window.location.reload();
                     //  $('#authorModal').modal('hide');

                 }, function (error) {
                     vm.Message = error.message;
                     $("#msgView").css('color', 'red');
                 });
      
            }


        };
      
    };

  
})();