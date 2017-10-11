// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .controller('LogbookController', ['$scope', '$state', 'Register', function ($scope,
        $state, Register) {
        $scope.registers = [];
        function getRegisters() {
            Register
                .find()
                .$promise
                .then(function (results) {
                    $scope.registers = results;
                });
        }
        getRegisters();
    }]);