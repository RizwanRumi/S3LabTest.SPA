

(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('syllabusService', syllabusService);

    syllabusService.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:9235/api/Books";


    function syllabusService($http, logger) {

        return {
            getSyllabus: getSyllabus,
            insertSyllabus: insertSyllabus
        };

        function getSyllabus() {
            return $http.get(urlBase)
                .then(getAllSyllabus, getSyllabusFailed);

            function getAllSyllabus(response) {
                return response.data;
            }

            function getSyllabusFailed(error) {
                logger.error('XHR Failed for getSyllabusFailed.' + error.data);
            }
        };


        function insertSyllabus(syllabus) {
            debugger;
            return $http.post(urlBase, syllabus)
                .then(setSyllabus, setSyllabusError);

            function setSyllabus(response) {
                return response.data;
            };

            function setSyllabusError(error) {
                logger.error('XHR Failed for setSyllabusFailed.' + error.data);
            };

        };


    };
})();