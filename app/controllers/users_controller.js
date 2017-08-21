module.exports = function(app) {
    var DG = require('2gis-maps');

    app.controller('userController', function($scope, $http, $httpParamSerializer , $location, $cookieStore , $rootScope , AuthenticationService) {

            
            $scope.username="";
            $scope.password="";
            // reset login status
            
            $scope.login = function () {
                $scope.dataLoading = true;
                AuthenticationService.Login($scope.username, $scope.password, function (response) {
                        AuthenticationService.SetCredentials($scope.username, $scope.password);
                        $location.path('/cabinet');  
                    },
                    function (response) {
                        console.log(response)
                        $scope.error = response.message;
                        $scope.dataLoading = false;
                    }
                );
            };

            $scope.marker;
            $scope.markers = DG.featureGroup()

            $scope.markesMap={}

            $scope.markersCount=function() {
                return Object.keys($scope.markers._layers).length
            }

            $scope.markersArray=function() {
                return Object.values($scope.markers._layers) 
            }
            
            $scope.bindPopup = ""
            $scope.newMarker = { latlng:[0,0], bindPopup:"" };


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
                    $scope.initMarkers()
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
            $scope.initMarkers=function() {
                $scope.getAllMarkers().then(function(response) {
                    let markers =response.data
                    for( let marker in markers){
                        let mapMarker = DG.marker(markers[marker].latlng).addTo($scope.markers).bindPopup(markers[marker].bindPopup)
                        $scope.markesMap[mapMarker._leaflet_id]=markers[marker]._id
                    }
                })
            }






            $scope.clearMarker=function () {
                $scope.marker.remove()
                $scope.newMarker = { latlng: [0,0] , bindPopup:"" };
                $scope.marker=false;
            }
            $scope.createMarker=function () {
                DG.marker($scope.newMarker.latlng).addTo($scope.markers).bindPopup($scope.newMarker.bindPopup)
                $scope.postNewMarker()
                $scope.marker.remove()
                $scope.newMarker = { latlng: [0,0], bindPopup:"" };
                $scope.marker = false;
            }
            $scope.deleteMarker = function(marker) {
                $scope.deleteMarkerById($scope.markesMap[marker._leaflet_id])
                marker.removeFrom($scope.map)
                marker.removeFrom($scope.markers)
            }




            $scope.showMarker = function() {
                $scope.markers.addTo($scope.map);
            }
            $scope.hideMarker=function() {
                $scope.markers.removeFrom($scope.map);
            }
        








            $scope.getAllMarkers=function() {
                return $http({
                    method: 'GET',
                    url: '/marks',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }
            $scope.postNewMarker=function() {
                return $http({
                    method: 'POST',
                    url: '/marks/new',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data: $httpParamSerializer($scope.newMarker)
                })
            }
            $scope.deleteMarkerById=function(id) {
                return $http({
                    method: 'DELETE',
                    url: '/marks/'+id,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            }


        });

        app.config(function($routeProvider , $locationProvider) {
            $routeProvider
            .when("/cabinet", {
                templateUrl : "pages/_cabinet.html",
                controller : "userController"
            })
            .when("/log_in", {
                templateUrl : "pages/_log_in.html",
                controller : "userController"
            });
            $locationProvider.html5Mode(true);
        })
}