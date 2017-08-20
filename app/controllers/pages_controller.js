module.exports = function(app) {
	

	app.controller('controller', function($scope) {
	    $scope.name = "John Doe";
		

		$scope.InitMap = function (){
			getLocation()
			function getLocation() {
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    } else {
			        alert("Geolocation is not supported by this browser.");
			    }
			}			
			function showPosition(position) {
		   		var coords = [position.coords.latitude ,position.coords.longitude]; 
		   		var map
		   		DG.then(function () {
		        	map = DG.map('map', {
			            center:coords,
			            zoom: 13
			        });
			        DG.marker(coords).addTo(map).bindPopup('Youo');
			    });
			}
		    
		}		
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