module.exports = function(app) {
	

	app.controller('controller', function($scope) {
	    $scope.name = "John Doe";
	});


	app.config(function($routeProvider , $locationProvider) {
	    $routeProvider
	    .when("/", {
	        templateUrl : "pages/_main.html"
	    })
	    .when("/users", {
	        templateUrl : "pages/_users.html",
	        controller : "controller"
	    })
	    .when("/about", {
	        templateUrl : "pages/_about.html",
	        controller : "controller"
	    });
	    $locationProvider.html5Mode(true);
	})
}