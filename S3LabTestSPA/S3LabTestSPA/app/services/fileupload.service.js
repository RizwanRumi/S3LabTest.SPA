(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('fileuploadservice', fileuploadservice);

    fileuploadservice.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:9235/api/Files";


    function fileuploadservice($http, logger) {

        return {
            UploadImage: UploadImage
        };

        function UploadImage(data) {
            debugger;
            return $http.post(urlBase, data, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .then(getFileUpload, getFileUploadError);

            function getFileUpload(response) {
                return response.data;
            };

            function getFileUploadError(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            };

        };


        function insertBook(book) {
            debugger;
            return $http.post(urlBase, insertBook)
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