// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app')
    .controller('DashboardController', ['$scope', '$state', 'Register', 'Point', 'Person', function ($scope,
        $state, Register, Point, Person) {

        // TODO: apply today filter
        // var f = new Date();
        // var ano = f.getFullYear();
        // var mes = f.getMonth() + 1;
        // var dia = f.getDate();
        // var today = new Date(ano + '/' + mes + '/' + dia);
        // var date = today.toISOString();
        // Record.find({
        //     filter: {
        //         where: {
        //             and:
        //             [
        //                 { profile: profile },
        //                 { is_input: true },
        //                 { is_permitted: true },
        //                 { input_datetime: { gte: date } }
        //             ]
        //         }
        //     }
        // })
        // var peopleFiltered = $filter('unique')(result, 'run');


        // TODO: change name hardcoded by currentUser point
        Point.find({
            filter: { 
                where: { name: 'Bel Cafe'}
            }
        })
        .$promise
        .then(function (point) {
            getRegisters(point[0].id);
        });
    
        function getRegisters(point){
            console.log('point', point);
            $scope.registers = Point.registers({
                id: point,
                filter: {
                    include: ['person', 'pda'],
                    limit: 20
                }
            });
        };
        
        $scope.CurrentDate = new Date();

        //=====================================================================
        // after a refresh, the currenUser is not immediately on the scope
        // So, we're watching it on the scope and load my reviews only then.
        $scope.$watch('currentUser.id', function (value) {
            if (!value) {
                return;
            }
            console.log('value',value);
        });
    }]);