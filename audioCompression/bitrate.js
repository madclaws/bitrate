var ffmpeg = require('fluent-ffmpeg');
var fsys = require('fs-extra');
var walk = require('klaw');
//Replace with the local ffmpeg location
ffmpeg.setFfmpegPath("../../../ffmpeg-20170706-3b3501f-win64-static/ffmpeg-20170706-3b3501f-win64-static/bin/ffmpeg");

compress('data');

function compress(path) {
    walk(path)
        .on('data', function(item) {
            if (checkAudio(tmp_ext = item.path.split('.').pop())) {
                console.log(item.path);
                var tmp_name = item.path.split('\\').pop();
                callFfmpeg(item.path, tmp_name, tmp_ext);

            }

        })
        .on('end', function() {

        });
}

function callFfmpeg(path, name, ext) {
    if (ext != "ogg") {

        var command = ffmpeg(path)

            .audioBitrate(32)
            .audioFrequency(22050)
            .on('end', function() {
                console.log("success:[" + name + "]");
            })
            .on('error', function(err) {
                console.log(err);
            })
            .save('output/' + name);
    } else {
        var command = ffmpeg(path)

            .audioFrequency(22050)
            .audioQuality(0)
            .on('end', function() {
                console.log("success:[" + name + "]");
            })
            .on('error', function(err) {
                console.log(err);
            })
            .save('output/' + name);
    }
}

function checkAudio(str) {
    switch (str) {
        case 'mp3':
            return true;
            break;

        case 'ogg':
            return true;
            break;

        case 'm4a':
            return true;
            break;

        default:
            return false;
    }
}
