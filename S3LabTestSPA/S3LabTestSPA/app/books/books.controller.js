
(function () {
    'use strict';

    angular.module('myApp')
    .controller('BooksController', BooksController);

    BooksController.$inject = ['$scope', '$window', '$location', '$stateParams', 'pagerService', 'bookservice', 'fileuploadservice'];

    function BooksController($scope, $window, $location, $stateParams, pagerService, bookservice, fileuploadservice) {

        var getAuthorId = $stateParams.authorId;

        var vm = this;
        vm.authorInfo = {
            AuthorId: getAuthorId
        };

        vm.Books = [];
        vm.Message = "";

        vm.totalData = [];
        vm.pager = {};
        vm.setPage = setPage;

        vm.$onInit = function () {
            bookservice.getBooks(getAuthorId)
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
            vm.Books = vm.totalData.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
        }



        $scope.file = null;
        $scope.filename = "";


        $scope.states = {
            clearBookForm: false,
            errorTitle: false,
            errorIsbn: false,
            errorPubDate: false,
            errorPrice: false,
            errorPubHouse: false,
            errorFile: false

        };

        $scope.new = {
            Book: {}
        };

        $scope.clearBookForm = function (show) {
            $scope.states.errorTitle = false;
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
            $('#imageView').attr('src', '../Content/Image/icon_image.jpg');
        };

        //Error checking
        $scope.errorTitleStateChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorTitle = false;
            }
            else {
                return $scope.states.errorTitle = true;
            }
        };

        $scope.errorIsbnStateChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorIsbn = false;
            }
            else {
                return $scope.states.errorIsbn = true;
            }
        };

        $scope.errorPubDateStateChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorPubDate = false;
            }
            else {
                return $scope.states.errorPubDate = true;
            }
        };

        $scope.errorPriceStateChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorPrice = false;
            }
            else {
                return $scope.states.errorPrice = true;
            }
        };

        $scope.errorPubHouseStateChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorPubHouse = false;
            }
            else {
                return $scope.states.errorPubHouse = true;
            }
        };

        $scope.errorFileChange = function (e) {
            if (e != null && e != "") {
                return $scope.states.errorFile = false;
            }
            else {
                return $scope.states.errorFile = true;
            }
        };

        $scope.setFile = function (element, opt) {
            $scope.$apply(function ($scope) {
                $scope.file = element.files[0];
                $scope.filename = element.value;
                $scope.errorFileChange($scope.file);
            });

            $scope.readURL(element, opt);
        };

        $scope.readURL = function (input, optVal) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    if (optVal == 'add') {
                        $('#imageView').attr('src', e.target.result);
                    }
                    else {
                        $('#editImgView').attr('src', e.target.result);
                    }
                };
                reader.readAsDataURL(input.files[0]);
            }
        };


        $scope.saveBook = function () {
            var title = $scope.errorTitleStateChange($scope.new.Book.Title);
            var isbn = $scope.errorIsbnStateChange($scope.new.Book.Isbn);
            var pubdate = $scope.errorPubDateStateChange($scope.new.Book.PublishingDate);
            var price = $scope.errorPriceStateChange($scope.new.Book.Price);
            var pubhouse = $scope.errorPubHouseStateChange($scope.new.Book.Price);
            var fle = $scope.errorFileChange($scope.file);

            if (Boolean(title) == false && Boolean(isbn) == false && Boolean(pubdate) == false &&
                Boolean(price) == false && Boolean(pubhouse) == false && Boolean(fle) == false) {
                $scope.new.Book.BookId = 0;
                $scope.new.Book.AuthorsId = $stateParams.authorId;

               
                var files = $scope.file;

                var data = new FormData();
                data.append('imageFile', files);

                fileuploadservice.UploadImage(data)
                        .then(function (result) {

                            $scope.new.Book.Image = result;

                            var abook = $scope.new.Book;

                            var msg = $scope.Message;


                            bookservice.insertBook(abook)
                              .then(function (response) {
                                  // $scope.Books.push($scope.new.Book);
                                  $scope.new.Book = {};
                                  $scope.Message = "";
                                  $window.location.reload();
                                  //  $('#authorModal').modal('hide');

                              }, function (error) {
                                  $scope.Message = error.message;
                                  $("#msgView").css('color', 'red');
                              });

                        }, function (error) {
                            $scope.status = 'Unable to load author data: ' + error.message;
                        });

            };

        };
    };

})();