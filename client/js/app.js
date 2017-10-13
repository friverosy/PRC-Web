// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
    .module('app', [
        'lbServices',
        'ui.router'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,
        $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                authenticate: true
            })
            .state('forbidden', {
                url: '/forbidden',
                templateUrl: 'views/forbidden.html',
            })
            .state('logbook', {
                url: '/logbook',
                templateUrl: 'views/logbook.html',
                controller: 'LogbookController',
                authenticate: true
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'AuthLoginController'
            })
            .state('logout', {
                url: '/logout',
                controller: 'AuthLogoutController'
            })
        $urlRouterProvider.otherwise('dashboard');
    }])
    .run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            // redirect to login page if not logged in
            if (next.authenticate && !$rootScope.currentUser) {
                event.preventDefault(); //prevent current page from loading
                $state.go('forbidden');
            }
        });
    }]);