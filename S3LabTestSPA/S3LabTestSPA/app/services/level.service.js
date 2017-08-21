

(function () {
    'use strict';

    angular
    .module('myApp')
    .factory('levelService', levelService);

    levelService.$inject = ['$http', 'logger'];

    var urlBase = "http://localhost:4664/api/Level";

    function levelService($http, logger) {


        return {
            getLevels: getLevels           
        };

        function getLevels() {
            return $http.get(urlBase + "/GetLevelList")
                .then(getAllLevels, getLevelsFailed);

            function getAllLevels(response) {
                return response.data;
            }

            function getLevelsFailed(error) {
                logger.error('XHR Failed for getLevelsFailed.' + error.data);
            }
        };

       
    }

})();



