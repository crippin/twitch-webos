import $ from 'jquery';
import { OAUTH } from './OAuth'
const Client_ID = '9x983jxyvp99rql42txrgaep1i9fct';
var twitchStreams = require('twitch-get-stream')(Client_ID); // twitch now ENFORCES client id usage, so this is required.

exports.GetFollowed = function (callback){
  console.log(OAUTH);
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/helix/users',
    headers: {
      'Client-ID': Client_ID,
      'Authorization': 'Bearer ' + OAUTH
    },
    success: function(json) {
      console.log(json);
      $.ajax({
        type: 'GET',
        url: `https://api.twitch.tv/helix/users/follows?from_id=${json.data[0].id}`,
        headers: {
          'Client-ID': Client_ID,
          'Authorization': 'Bearer ' + OAUTH
        },
        success: function(json) {
          console.log(json);
          let ids = new String("");
          json.data.forEach(value => {
            ids += "?user_id=" + value.to_id
          });
          console.log("ids")
          console.log(ids + " ")
          $.ajax({
            type: 'GET',
            url: `https://api.twitch.tv/helix/streams?${ids + ""}`,
            headers: {
              'Client-ID': Client_ID,
            },
            success: function(live) {
              console.log("live?");
              console.log(live);
              callback({streams: live.data})
          }});
          //callback({streams: json.data})
      }});
  }});
}

exports.GetStreamDataFromChannel = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/helix/streams/' + id,
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
    url: 'https://api.twitch.tv/helix/search/channels?query=' + id,
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
    url: 'https://api.twitch.tv/helix/search/games?query=' + id + '&type=suggest',
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
    url: 'https://api.twitch.tv/helix/games/top',
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      console.log(json.data)
      callback({topGames: json.data})
  }});
}
exports.GetStreamsFromGame = function (id, callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/helix/streams/?game_id=' + id,
    headers: {
      'Client-ID': Client_ID,
    },
    success: function(json) {
      console.log(json.data);
      // TODO: new twitch api response doesn't inculeds channel_logo
      callback({streams: json.data})
  }});
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
