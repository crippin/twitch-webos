import $ from 'jquery';
// import { OAuth } from './config'
const Client_ID = '9x983jxyvp99rql42txrgaep1i9fct';
var twitchStreams = require('twitch-get-stream')(Client_ID); // twitch now ENFORCES client id usage, so this is required.

exports.GetFollowed = function (callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/followed',
    headers: {
      'Client-ID': Client_ID,
      'Authorization': 'OAuth ' + OAuth
    },
    success: function(json) {
      callback({streams: json.streams})
  }});
}

exports.GetStreamDataFromChannel = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/channels/' + id,
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      console.log(json);
      callback({data: json})
  }});
}

exports.GetTopGames = function (callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      var games = [];
      json.top.map(function(data, index){
        games.push(data.game);
      })
      callback({topGames: games})
  }});
}
exports.GetStreamsFromGame = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/?game=' + id,
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      callback({streams: json.streams})
  }});
}

exports.GetStreamFromChannel = function (stream, callback) {
  twitchStreams.get(stream)
    .then((data) => {
      //data[0] == source quality
      callback({src: data[0].url})
    }, (reason) => {
      callback({src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'})
    });
}
