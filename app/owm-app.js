var app = angular.module('OWMApp', ['ngRoute', 'ngAnimate']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'HomeController'
        })
        .when('/cities/:city', {
            templateUrl: 'city.html',
            controller: 'CityController',
            resolve: {
                city: function (owmCities, $route, $location) {
                    var city = $route.current.params.city;
                    if (owmCities.indexOf(city) == -1) {
                        $location.path('/error');
                        return;
                    }
                    return city;
                }
            }
        })
        .when('/error', {
            template: '<p>Error - Page Not Found</p>'
        })
}]);
app.value('owmCities', ['New_York', 'Dallas', 'Chicago']);
app.controller('HomeController', function ($scope) {
    //empty for now
});
app.controller('CityController', function ($scope, city) {
    $scope.city = city.replace('_',' ');
});

app.run(function ($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function () {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $rootScope.isLoading = false;
        }, 1000);
    });
});