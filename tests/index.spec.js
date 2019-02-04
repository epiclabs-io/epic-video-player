const evp = require('../src/index');
const pDash = require('../src/PlayerDash');
const pHls = require('../src/PlayerHls');

const url = 'http://fake-url';
const videoElement = document.createElement('video');
const config = {
    initialKbps: 1000,
};

test('Dash player creation', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance).toBeInstanceOf(pDash.PlayerDash);
    expect(evpInstance.url === url);
});

test('Hls player creation', () => {
    const evpInstance = evp.newPlayer(url + '/video.m3u8', videoElement, config);
    expect(evpInstance).toBeInstanceOf(pHls.PlayerHls)
    expect(evpInstance.url === url);
});
