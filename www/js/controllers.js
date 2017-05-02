angular.module('starter.controllers', ['ionic', 'ngMap'])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope,$http) {
  var intervalGetPosition;
  $scope.jsonPositionsLog   = [];

  $scope.data = {};
  $scope.settings = {
    enableFriends: true
  };
  $scope.submit = function(){
    initGetLocationListener();

    var link = 'http://gbrunel.fr/ionic/api.php';

    $http.post(link, {username : $scope.data.username}).then(function (res){
      $scope.response = $scope.jsonPositionsLog;
    });
  };

  initGetLocationListener = function()
  {
    // init location listener
    intervalGetPosition = navigator.geolocation.watchPosition( function(position)
    {
      $scope.jsonPositionsLog.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }
  );
}

})

.controller('GpsCtrl', function($scope) {
  var intervalGetPosition;

  $scope.jsonPositionsLog   = [];
  $scope.isTrackingPosition = false;

  $scope.startTracking = function()
  {
    // init location listener
    initGetLocationListener();
    stopTrackingPosition();
  }

  $scope.stopTrackingPosition = function()
  {
    navigator.geolocation.clearWatch(intervalGetPosition);
  }

  // getCurrentPosition = function()
  // {
  //   navigator.geolocation.getCurrentPosition(function(position)
  //   {
  //     // get lat and long
  //     var latitude  = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //
  //     // add positions to array
  //     $scope.jsonPositionsLog.push({
  //       latitude: latitude,
  //       longitude: longitude
  //     });
  //
  //     // $scope.$apply();
  //   });
  // }

  initGetLocationListener = function()
  {
    // init location listener
    intervalGetPosition = navigator.geolocation.watchPosition( function(position)
    {
      $scope.jsonPositionsLog.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

      $scope.$apply();
    }
    // ,
    // function(error)
    // {
    //   console.log(error.message);
    // },
    // {
    //   timeout: 1000
    // }
  );
}

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
;
