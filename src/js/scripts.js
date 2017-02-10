import angular from 'angular';
import style from '../style.sass';

(function() {
  'use strict';

  angular.module('twitchApp', [])
    .factory('twitchService', ['$http', twitchService])
    .controller('MainController', MainController)
    .controller('TabsController', TabsController);


  function twitchService($http) {
    // this api doesn't need an api key
    let twitchAPI = 'https://wind-bow.gomix.me/twitch-api/streams/';

    function fetchChannelData(channel) {
      return $http.get(`${twitchAPI}${channel}`)
    }

    return { fetchChannelData }
  }


  MainController.$inject = ['$scope', '$http', 'twitchService'];

  function MainController($scope, $http, twitchService) {
    let streamers = ['freecodecamp', 'storbeck', 'terakilobyte', 'beohoff', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'habathcx', 'riotgames', 'starladder1', 'beyondthesummit', 'tsm_theoddone', 'smitegame', 'Nightblue3', 'nl_kripp', 'esl_lol', 'OGNGlobal', 'faceittv', 'PhantomL0rd', 'totalbiscuit', 'RocketBeansTV', 'sing_sing', 'comster404', 'ESL_SC2', 'OgamingSC2', 'cretetion'];

    $scope.streamers = [];

    streamers.forEach(streamer => {

      twitchService.fetchChannelData(streamer)
        .then( function(response) {
          let streamerData = {
            name: streamer,
            online: response.data.stream != null,
            data: response.data.stream,
            exists: true
          };

          console.log(response.data.stream ? streamerData : null)

          if (streamer == 'freecodecamp')
            $scope.streamers.unshift(streamerData);
          else
            $scope.streamers.push(streamerData);
        } )
        .catch( function(error) {
          $scope.streamers.unshift({
            name: streamer,
            exists: false
          });

          console.log(`Can't fetch the channel ${streamer}.\nError: ${error}`);
        } );

    });
  }


  TabsController.$inject = ['$scope'];

  function TabsController($scope) {
    $scope.tab = 'online';
    $scope.setTab = tab => $scope.tab = tab;
    $scope.isSet = tab => $scope.tab == tab;
  }

})()