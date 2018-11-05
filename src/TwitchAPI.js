import $ from 'jquery';
import { Client_ID, OAuth } from './config'
var twitchStreams = require('twitch-get-stream')(Client_ID); // twitch now ENFORCES client id usage, so this is required.

exports.GetFollowed = function (callback){
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/followed',
    headers: {
      'Client-ID': Client_ID,
      'Authorization': OAuth
    },
    success: function(json) {
      console.log(json);
      let streams = [];
      console.log(json.streams.length);
      console.log(json);
      json.streams.map(function (stream, index) {
        stream.src = 'ALMAFA';
        GetStreamFromChannel(stream, streams, json.streams.length, index, callback);
      });

  }});
}

const GetStreamFromChannel = function (stream, streams, length, index, callback) {
  twitchStreams.get(stream.channel.name)
    .then((data) => {
      stream.src=data[0].url;
      streams.push (stream);
      console.log(index);
      console.log(data[0].url);
      if (streams.length == length) {
        callback({streams: streams})
      }
    }, (reason) => {
      stream.src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      streams.push (stream);
      console.log(reason);
      console.log(index);
      if (streams.length == length) {
        callback({streams: streams})
      }
    });
}
