

(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('authorservice', authorservice);

    authorservice.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:9235/api/Authors";

    function authorservice($http, logger) {
      
        return {
            getAuthors: getAuthors,
            getAuthor: getAuthor,
            insertAuthor: insertAuthor,
            updateAuthor: updateAuthor,
            deleteAuthor: deleteAuthor
        };

        

        function getAuthors() {
            return $http.get(urlBase)
                .then(getAllAuthors, getAuthorsFailed);

            function getAllAuthors(response) {
                return response.data;
            }

            function getAuthorsFailed(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            }
        };

        function getAuthor(id) {
            debugger;
            return $http.get(urlBase + "/" + id)
                .then(getAuthorsInfo, getAuthorFailed);

            function getAuthorsInfo(response) {
                return response.data;
            }

            function getAuthorFailed(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            }
        };

        function insertAuthor(auth) {
            debugger;
            return $http.post(urlBase, auth)
                .then(setAuthors, setAuthorsFailed);

            function setAuthors(response) {
                return response.data;
            }

            function setAuthorsFailed(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            }
        };

        function updateAuthor(auth) {
            debugger;
            return $http.put(urlBase + '/' + auth.AuthorId, auth)
                .then(updateAuthors, updateAuthorsFailed);

            function updateAuthors(response) {
                return response.data;
            }

            function updateAuthorsFailed(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            }
        };

        function deleteAuthor(id) {
            return $http.delete(urlBase + '/' + id)
                .then(deleteSelectedAuthor, deleteSelectedAuthorFailed);

            function deleteSelectedAuthor(response) {
                return response.data;
            }

            function deleteSelectedAuthorFailed(error) {
                logger.error('XHR Failed for getAuthorsFailed.' + error.data);
            }
        };
    }

})();



