// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
    .controller("BeaconPrototypeController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon){
        $scope.beacons = {};

        $ionicPlatform.ready(function(){
            $cordovaBeacon.requestWhenInUseAuthorization();

            $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult){
                for(var i = 0; i < pluginResult.beacons.length; i++) {
                    uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                    $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
                }
                $scope.$apply();
            });

            $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("Bluecats", "61687109-905F-4436-91F8-E602F514C96D"));


        })
    });

