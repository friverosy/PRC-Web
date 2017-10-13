// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .controller('LogbookController', ['$scope', '$state', 'Register', 'Point', function ($scope,
        $state, Register, Point) {
        
        Point.find({
            filter: {
                where: { name: 'Bel Cafe' }
            }
        })
        .$promise
        .then(function (point) {
            getRegisters(point[0].id);
        });

        function getRegisters(point) {
            console.log('point', point);
            $scope.registers = Point.registers({
                id: point,
                filter: {
                    include: ['person', 'pda']
                }
            });
        };

        $scope.update = function (register) {
            console.log('register', register);
            register.updated = new Date();
            register.$save(register);
        };
    }]);