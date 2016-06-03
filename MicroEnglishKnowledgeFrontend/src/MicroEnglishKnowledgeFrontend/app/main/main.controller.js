(function () {
    'use strict';

    angular
        .module('microEnglishKnowledge')
        .controller('mainController', main);

    main.$inject = ['$scope']; 

    function main($scope) {
        $scope.title = 'Welcome to micro english';

        activate();

        function activate() { }
    }
})();
