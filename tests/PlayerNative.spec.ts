const evp = require('../src/index');
const pNative = require('../src/PlayerNative');
const models = require('../src/models');

const url = 'http://fake-url/video.mp4';
const videoElement = document.createElement('video');
const config = {
};

test('load', () => {
    const evpInstance = new pNative.PlayerNative(url, videoElement, undefined);
    evpInstance.load();
    expect(evpInstance.playerType === 2).toBeTruthy();
});

test('getRenditions', () => {
    const evpInstance = new pNative.PlayerNative(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.getRenditions()).toBeUndefined();
});

test('getCurrentRendition', () => {
    const evpInstance = new pNative.PlayerNative(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.getCurrentRendition()).toBeUndefined();
});

test('destroy', () => {
    const evpInstance = new pNative.PlayerNative(url, videoElement, undefined);
    expect(evpInstance.destroy()).toBeUndefined();

    evpInstance.player = undefined;
    expect(evpInstance.destroy()).toBeUndefined();
});
