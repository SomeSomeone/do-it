module.exports = function(app) {
	var DG = require('2gis-maps');	

	app.controller('pageController', function($scope, $http, $httpParamSerializer , $location, $cookieStore , $rootScope , AuthenticationService) {
		$scope.globals=$rootScope.globals

		$scope.currentUser = function () {
            if (!$rootScope.globals){
            	$rootScope.globals=$cookieStore.get('globals')
            };
            if($rootScope && $rootScope.globals && $rootScope.globals.currentUser){
                return $rootScope.globals.currentUser
            }else{
                return false
            }
            
        }
        $scope.logOut=function() {
        	AuthenticationService.ClearCredentials();
        	$location.path('/');
        }
		$scope.map ="";
		$scope.newMarker;
		
		
		$scope.initMap = function (){
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
		        	$scope.map = DG.map('map', {
			            center:coords,
			            zoom: 13
			        });
			         var myIcon = DG.icon({
                                iconUrl: 'https://maps.api.2gis.ru/2.0/img/DGCustomization__markerHover.png',
                    });
                    DG.marker(coords,{icon:myIcon}).addTo($scope.map).bindPopup('You here!');
			        $scope.map.on('click', function(e) {
		                $scope.newMarker={ lat: e.latlng.lat , lng: e.latlng.lng};
		                console.log(e)
		            });
			    });
			}	    
		}

	});


	app.config(function($routeProvider , $locationProvider) {
	    $routeProvider
	    .when("/", {
	        templateUrl : "pages/_main.html"
	    })
	    .when("/about", {
	        templateUrl : "pages/_about.html",
	        controller : "pageController"
	    })
	    .when("/author", {
	        templateUrl : "pages/_author.html",
	        controller : "pageController"
	    });
	    $locationProvider.html5Mode(true);
	})
}