/**
 * AngularJS logger Service
 * 
 * @author: Vladimir Zdenek
 * @date:   21/04/2016
 */

(function () {

    'use strict';


    angular
        .module('myApp')
        .run(Run)
        .factory('logger', logger);


    // inject dependencies into the Run function
    Run.$inject = ['$window', 'logger'];


    /**
     * Run when the module is injected
     * @param $window
     * @param logger
     * @constructor
     */
    function Run($window, logger) {

        // make the logger globally available
        $window.logger = logger;

    }


    /**
     * logger Service
     * @returns {{$storage: Array, debug: debug, error: error, log: log, warn: warn}}
     * @constructor
     */
    function logger() {


        /**
         * Define the public interface
         * @type {{$storage: Array, debug: debug, error: error, log: log, warn: warn}}
         */
        var Factory = {

            // definitions
            $storage: [],

            // functions
            debug: debug,
            error: error,
            log: log,
            info: info,
            report: report,
            warn: warn

        };


        // return the Factory
        return Factory;


        /**
         * Log a debug message
         */
        function debug() {

            // output the message
            console.debug.apply(console, arguments);

            // save the message
            $$saveInStorage('debug', arguments);

        }


        /**
         * Log an error message
         */
        function error() {

            // output the message
            console.error.apply(console, arguments);

            // save the message
            $$saveInStorage('error', arguments);

        }


        /**
         * Log a simple log message
         */
        function log() {

            // output the message
            console.log.apply(console, arguments);

            // save the message
            $$saveInStorage('log', arguments);

        }

        /**
         * Info a simple info message
         */
        function info() {

            // output the message
            console.info.apply(console, arguments);

            // save the message
            $$saveInStorage('info', arguments);

        }


        /**
         * Output all messages from the current session
         */
        function report() {

            // output all messages from this session
            console.log(Factory.$storage);

        }


        /**
         * Log a warning message
         */
        function warn() {

            // output the message
            console.warn.apply(console, arguments);

            // save the message
            $$saveInStorage('warn', arguments);

        }


        /**
         * Filter arguments to get only the true arguments passed by the user
         * - strips all internal JS properties
         * @param {Object} args
         * @returns {Array}
         */
        function $$getRealArguments(args) {

            // array to hold the true arguments
            var trueArgs = [];

            // loop through all the arguments
            angular.forEach(args, function (value, key) {

                // if the argument's key is numeric
                // this is a true argument
                if (angular.isNumber(key)) {

                    // store the argument in the trueArgs array
                    trueArgs.push(value);

                }

            });

            // return the true arguments
            return trueArgs;

        }


        /**
         * Save a message locally
         *
         * @param {string} type
         * @param {*} args
         *
         * @returns {object}
         */
        function $$saveInStorage(type, args) {

            // create the message object which will be saved
            var msgObj = {
                type: type,
                date: new Date(),
                message: $$getRealArguments(args)
            };

            // save the message object locally
            Factory.$storage.push(msgObj);

            // return the saved message
            return msgObj;

        }


    }

})();