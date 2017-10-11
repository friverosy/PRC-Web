// access User model
module.controller('LoginController', function ($scope, User, $location) {
    $scope.login = function () {
        $scope.loginResult = User.login($scope.credentials,
            function () {
                // success
            }, function (res) {
                // error
            });
    }
})
