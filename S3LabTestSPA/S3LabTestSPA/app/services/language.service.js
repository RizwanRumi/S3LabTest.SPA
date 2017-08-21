


(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('languageService', languageService);

    languageService.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:4664/api/Language";

    function languageService($http, logger) {


        return {
            getLanguages: getLanguages,
            insertSelectedLang: insertSelectedLang
        };

        function getLanguages() {
            return $http.get(urlBase + "/GetLanguages")
                .then(getAllLanguages, getLanguagesFailed);

            function getAllLanguages(response) {
                return response.data;
            }

            function getLanguagesFailed(error) {
                logger.error('XHR Failed for getLanguagesFailed.' + error.data);
            }
        };

        function insertSelectedLang(val) {
            debugger;
            return $http.post(urlBase + "/addSelectedLang", val)
                .then(setSyllabus, setSyllabusError);

            function setSyllabus(response) {
                return response.data;
            };

            function setSyllabusError(error) {
                logger.error('XHR Failed for setSyllabusFailed.' + error.data);
            };

        };

    }

})();



