

(function () {
	'use strict';

	angular
    .module('myApp')
    .factory('tradeService', tradeService);

	tradeService.$inject = ['$http', 'logger'];

	var urlBase = "http://localhost:4664/api/Trade";

	function tradeService($http, logger) {
		

		return {
		    getTrades: getTrades
			//getAuthors: getAuthors,
			//getAuthor: getAuthor,
			//insertAuthor: insertAuthor,
			//updateAuthor: updateAuthor,
			//deleteAuthor: deleteAuthor
		};

		function getTrades() {
		    return $http.get(urlBase + "/GetTradeList")
                .then(getAllTrades, getTradesFailed);

			function getAllTrades(response) {				
				return response.data;
			}

			function getTradesFailed(error) {
				logger.error('XHR Failed for getTradesFailed.' + error.data);
			}
		};

		//function getAuthors() {
		//	return $http.get(urlBase)
        //        .then(getAllAuthors, getAuthorsFailed);

		//	function getAllAuthors(response) {
		//		return response.data;
		//	}

		//	function getAuthorsFailed(error) {
		//		logger.error('XHR Failed for getAuthorsFailed.' + error.data);
		//	}
		//};

		//function getAuthor(id) {
		//	debugger;
		//	return $http.get(urlBase + "/" + id)
        //        .then(getAuthorsInfo, getAuthorFailed);

		//	function getAuthorsInfo(response) {
		//		return response.data;
		//	}

		//	function getAuthorFailed(error) {
		//		logger.error('XHR Failed for getAuthorsFailed.' + error.data);
		//	}
		//};

		//function insertAuthor(auth) {
		//	debugger;
		//	return $http.post(urlBase, auth)
        //        .then(setAuthors, setAuthorsFailed);

		//	function setAuthors(response) {
		//		return response.data;
		//	}

		//	function setAuthorsFailed(error) {
		//		logger.error('XHR Failed for getAuthorsFailed.' + error.data);
		//	}
		//};

		//function updateAuthor(auth) {
		//	debugger;
		//	return $http.put(urlBase + '/' + auth.AuthorId, auth)
        //        .then(updateAuthors, updateAuthorsFailed);

		//	function updateAuthors(response) {
		//		return response.data;
		//	}

		//	function updateAuthorsFailed(error) {
		//		logger.error('XHR Failed for getAuthorsFailed.' + error.data);
		//	}
		//};

		//function deleteAuthor(id) {
		//	return $http.delete(urlBase + '/' + id)
        //        .then(deleteSelectedAuthor, deleteSelectedAuthorFailed);

		//	function deleteSelectedAuthor(response) {
		//		return response.data;
		//	}

		//	function deleteSelectedAuthorFailed(error) {
		//		logger.error('XHR Failed for getAuthorsFailed.' + error.data);
		//	}
		//};
	}

})();



