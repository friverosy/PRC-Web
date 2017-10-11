// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .controller('DashboardController', ['$scope', '$state', 'Register', 'Point', 'Person', function ($scope,
        $state, Register, Point, Person) {

        $scope.registers = Point.registers({
            id: '59dceba69fffd17753d2c573',
            filter: {
                include: ['person','pda']
            }
        });
        $scope.CurrentDate = new Date();
    }]);