import $ from 'jquery';
import { OAUTH } from './OAuth'
const Client_ID = '9x983jxyvp99rql42txrgaep1i9fct';
var twitchStreams = require('twitch-get-stream')(Client_ID); // twitch now ENFORCES client id usage, so this is required.

exports.GetFollowed = function (callback){
  console.log(OAUTH);
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/followed',
    headers: {
      'Client-ID': Client_ID,
      'Authorization': 'OAuth ' + OAUTH
    },
    success: function(json) {
      callback({streams: json.streams})
  }});
}
// TODO
exports.CheckTOKEN = function (callback){
  console.log(OAUTH);
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/followed',
    headers: {
      'Client-ID': Client_ID,
      'Authorization': 'OAuth ' + OAUTH
    },
    success: function(json) {
      console.log(json);
      callback({streams: json.streams})
    },
    error: function(err) {
      console.log(err);
    }
  });
}

exports.GetStreamDataFromChannel = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + id,
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      console.log(json);
      callback({data: json.stream})
  }});
}

exports.Search = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/search/channels?query=' + id,
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      console.log(json);
      callback({streams: json.channels})
  }});
}
exports.SearchGame = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/search/games?query=' + id + '&type=suggest',
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      console.log(json);
      callback({games: json.games})
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

exports.GetStreamFromChannelMixer = function (stream, callback) {
  $.ajax({
    type: 'GET',
    url: `https://mixer.com/api/v1/channels/${stream}`,
    success: function(json) {
      $.ajax({
        type: 'GET',
        url: `https://mixer.com/api/v1/channels/${json.id}/manifest.m3u8`,
        success: function(res) {
          // m3u8 to json... OR just parse it manual
          let src = { url: res.split('\n')[4] }; // source quality
          callback({src: [src]})
        }
      });
    }
  });
}

exports.GetStreamFromChannel = function (stream, callback) {
  twitchStreams.get(stream)
    .then((data) => {
      console.log(data);
      callback({src: data})
    }, (reason) => {
      callback({src: [{url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}]})
    });
}
