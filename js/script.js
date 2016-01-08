// Mixing jQuery and Node.js code in the same file? Yes please!

$(function(){


	// Display some statistic about this computer, using node's os module.

	var os = require('os');
	var prettyBytes = require('pretty-bytes');

	$('.stats').append('Number of cpu cores: <span>' + os.cpus().length + '</span>');
	$('.stats').append('Free memory: <span>' + prettyBytes(os.freemem())+ '</span>');

	// Node webkit's native UI library. We will need it for later
	var gui = require('nw.gui');


	var lame = require('lame');
var Speaker = require('speaker');
var Spotify = require('spotify-web');
var uri = process.argv[2] || 'spotify:track:6tdp8sdXrXlPV6AZZN2PE8';

// Spotify credentials...
var username = process.env.USERNAME;
var password = process.env.PASSWORD;

Spotify.login(username, password, function (err, spotify) {
  if (err) throw err;

  // first get a "Track" instance from the track URI
  spotify.get(uri, function (err, track) {
    if (err) throw err;
    console.log('Playing: %s - %s', track.artist[0].name, track.name);

    // play() returns a readable stream of MP3 audio data
    track.play()
      .pipe(new lame.Decoder())
      .pipe(new Speaker())
      .on('finish', function () {
        spotify.disconnect();
      });

  });
});
