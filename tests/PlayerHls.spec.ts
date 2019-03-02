const evp = require('../src/index');
const pHls = require('../src/PlayerHls');
const models = require('../src/models');

const url = 'http://fake-url/video.mpd';
const videoElement = document.createElement('video');
const config = {
    initialRenditionKbps: 1000,
};

test('load', () => {
    const evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    evpInstance.load();
    expect(evpInstance.playerType === 1).toBeTruthy();
});

test('getRenditions', () => {
    const evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.getRenditions()).toBeUndefined();
});

test('getCurrentRendition', () => {
    const evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.getCurrentRendition()).toBeUndefined();

    evpInstance.player = {};
    evpInstance.player.levels = [{"attrs":{"PROGRAM-ID":"1","BANDWIDTH":"246440","CODECS":"mp4a.40.5,avc1.42000d","RESOLUTION":"320x184","NAME":"240"},"url":["https://video-dev.github.io/streams/x36xhzz/url_2/193039199_mp4_h264_aac_ld_7.m3u8"],"width":320,"height":184,"bitrate":246440,"name":"240","videoCodec":"avc1.42000d","audioCodec":"mp4a.40.5","unknownCodecs":[],"loadError":0,"fragmentError":false,"urlId":0}];
    evpInstance.player.currentLevel = 0;
    expect(evpInstance.getCurrentRendition().audioCodec).toEqual("mp4a.40.5");

    evpInstance.player = {};
    evpInstance.player.levels = undefined;
    expect(evpInstance.getCurrentRendition()).toBeUndefined();
});

test('convertLevelsToIRenditions', () => {
    expect(pHls.PlayerHls.convertLevelsToIRenditions()).toBeUndefined();

    const renditions = pHls.PlayerHls.convertLevelsToIRenditions([{"attrs":{"PROGRAM-ID":"1","BANDWIDTH":"246440","CODECS":"mp4a.40.5,avc1.42000d","RESOLUTION":"320x184","NAME":"240"},"url":["https://video-dev.github.io/streams/x36xhzz/url_2/193039199_mp4_h264_aac_ld_7.m3u8"],"width":320,"height":184,"bitrate":246440,"name":"240","videoCodec":"avc1.42000d","audioCodec":"mp4a.40.5","unknownCodecs":[],"loadError":0,"fragmentError":false,"urlId":0}]);
    expect(renditions[0].audioCodec).toEqual("mp4a.40.5");
});


test('setRendition', () => {
    let evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.setRendition()).toBeUndefined();

    evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    evpInstance.getRenditions = () => [];
    expect(evpInstance.setRendition(-1, true)).toBeUndefined();

    evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    evpInstance.getRenditions = () => [];
    expect(evpInstance.setRendition(-1, true)).toBeUndefined();
});

test('destroy', () => {
    const evpInstance = new pHls.PlayerHls(url, videoElement, undefined);
    expect(evpInstance.destroy()).toBeUndefined();

    evpInstance.player = undefined;
    expect(evpInstance.destroy()).toBeUndefined();
});
