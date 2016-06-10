(function () {
    'use strict';

    angular.module('microEnglishKnowledge').config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('main', {
                url: "/",
                templateUrl: "../main/main.html"
            })
            .state('about', {
                url: "/about",
                templateUrl: "../about/index.html"
            });
    });
})();