(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('fileuploadservice', fileuploadservice);

    fileuploadservice.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:2093/Files/FileUpload";


    function fileuploadservice($http, logger) {

        return {
            UploadFile: UploadFile
        };

        function UploadFile(data) {
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

    };
})();