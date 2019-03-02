export {};

const evp = require('../src/index');
const pDash = require('../src/player-dash');
const pHls = require('../src/player-hls');
const pNative = require('../src/player-native');

const url = 'http://fake-url';
const videoElement = document.createElement('video');
const config = {
    initialKbps: 1000,
};

test('Dash player creation', () => {
    let evpInstance = evp.newPlayer(url + '/video.mpd', videoElement, config);
    expect(evpInstance).toBeInstanceOf(pDash.PlayerDash);
    expect(evpInstance.url === url);

    evpInstance = evp.newPlayer(url, videoElement, {type: 'application/dash+xml'});
    expect(evpInstance).toBeInstanceOf(pDash.PlayerDash);
});

test('Hls player creation', () => {
    let evpInstance = evp.newPlayer(url + '/video.m3u8', videoElement, config);
    expect(evpInstance).toBeInstanceOf(pHls.PlayerHls);
    expect(evpInstance.url === url);

    evpInstance = evp.newPlayer(url, videoElement, {type: 'application/x-mpegURL'});
    expect(evpInstance).toBeInstanceOf(pHls.PlayerHls);
});

test('Native player creation', () => {
    let evpInstance = evp.newPlayer(url + '/video.mp4', videoElement, config);
    expect(evpInstance).toBeInstanceOf(pNative.PlayerNative);
    expect(evpInstance.url === url);

    evpInstance = evp.newPlayer(url, videoElement);
    expect(evpInstance).toBeInstanceOf(pNative.PlayerNative);
});
