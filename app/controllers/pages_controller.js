module.exports = function(app) {
	var DG = require('2gis-maps');	

	app.controller('controller', function($scope) {
		$scope.map ="";
		$scope.marker;
		$scope.markers = DG.featureGroup(),
		$scope.markersCount=function() {
			return Object.keys($scope.markers._layers).length
		}

		$scope.markersArray=function() {
			return Object.values($scope.markers._layers) 
		}
		
		$scope.bindPopup = ""
		$scope.newMarker = { latlng:[0,0], bindPopup:"" };
		
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
			        DG.marker(coords).addTo($scope.map).bindPopup('You');
			        $scope.map.on('click', function(e) {
		                $scope.newMarker={ lat: e.latlng.lat , lng: e.latlng.lng};
		                console.log(e)
		            });
			    });
			}	    
		}

		$scope.initFullMap = function (){
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
	        	$scope.map = DG.map('map', {
		            center:coords,
		            zoom: 13
		        });
		        DG.marker(coords).addTo($scope.map).bindPopup('You here!');
		        
		        $scope.map.on('click', $scope.refresh)
				$scope.showMarker()
			}
		}

		$scope.refresh=function(e){
			console.log($scope.marker)
		    if ($scope.marker) {
		    	$scope.marker.setLatLng(e.latlng)
		    }else{
		    	$scope.marker = DG.marker(e.latlng).addTo($scope.map);
		    }
		    $scope.newMarker.latlng=[e.latlng.lat,e.latlng.lng]
		    $scope.$apply();
		}

		$scope.clearMarker=function () {
			$scope.marker.remove()
			$scope.newMarker = { latlng: [0,0] , bindPopup:"" };
			$scope.marker=false;
		}
		$scope.createMarker=function () {
			DG.marker($scope.newMarker.latlng).addTo($scope.markers).bindPopup($scope.newMarker.bindPopup)
			$scope.marker.remove()
			$scope.newMarker = { latlng: [0,0], bindPopup:"" };
			$scope.marker=false;
		}
		$scope.deleteMarker=function(marker) {
			marker.removeFrom($scope.map)
			marker.removeFrom($scope.markers)
		}
		$scope.showMarker=function() {
			$scope.markers.addTo($scope.map);
			console.log($scope.markers)
			console.log($scope.map)
		}
		$scope.hideMarker=function() {
			$scope.markers.removeFrom($scope.map);
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