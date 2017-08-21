

(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('bookservice', bookservice);

    bookservice.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:9235/api/Books";


    function bookservice($http, logger) {

        return {
            getBooks: getBooks,
            insertBook: insertBook
        };

        function getBooks(id) {
            debugger;
            return $http.get(urlBase + "/" + id)
                .then(getBookList, getBookListError);

            function getBookList(response) {
                return response.data;
            };

            function getBookListError(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            };

        };


        function insertBook(book) {
            debugger;
            return $http.post(urlBase, book)
                .then(getBook, getBookError);

            function getBook(response) {
                return response.data;
            };

            function getBookError(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            };

        };
    

    };
})();