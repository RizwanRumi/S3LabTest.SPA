﻿

(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('syllabusService', syllabusService);

    syllabusService.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:4664/api/Syllabus";


    function syllabusService($http, logger) {

        return {
            getSyllabusList: getSyllabusList,
            insertSyllabus: insertSyllabus
        };

        function getSyllabusList() {
            return $http.get(urlBase + "/getSyllabus")
                .then(getAllSyllabus, getSyllabusFailed);

            function getAllSyllabus(response) {                
                return response.data;
            }

            function getSyllabusFailed(error) {
                logger.error('XHR Failed for getSyllabusFailed.' + error.data);
            }
        };

        function insertSyllabus(sylabus) {
            debugger;
            return $http.post(urlBase + "/addSyllabus", sylabus)
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