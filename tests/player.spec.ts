export {};

const evp = require('../src/index');
const pDash = require('../src/player-dash');
const pHls = require('../src/player-hls');

const url = 'http://fake-url';
const videoElement = document.createElement('video');
const config = {
    initialKbps: 1000,
};

test('updateStats', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.updateStats).toBeInstanceOf(Function);
    expect(evpInstance.updateStats()).toBeUndefined();
});

test('loadStart', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.loadStart).toBeInstanceOf(Function);
    expect(evpInstance.loadStart()).toBeUndefined();
    evpInstance.stats.loadTime = 10;
    expect(evpInstance.loadStart()).toBeUndefined();
});

test('loadEnd', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.loadEnd).toBeInstanceOf(Function);
    expect(evpInstance.loadEnd()).toBeUndefined();
    evpInstance.stats.loadTime = 10;
    expect(evpInstance.loadEnd()).toBeUndefined();
});

test('pause', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    window['HTMLMediaElement'].prototype.pause = () => { /* do nothing */ };
    expect(evpInstance.pause).toBeInstanceOf(Function);
    expect(evpInstance.pause()).toBeUndefined();
});

test('play', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    window['HTMLMediaElement'].prototype.play = () => { /* do nothing */ };
    expect(evpInstance.play).toBeInstanceOf(Function);
    expect(evpInstance.play()).toBeUndefined();
});

test('getStats', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.getStats()).toBeDefined();
});

test('currentTime', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.currentTime(10)).toBeUndefined();
    expect(evpInstance.currentTime()).toBe(10);
});

test('volume', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.volume(.1)).toBeUndefined();
    expect(evpInstance.volume()).toBe(.1);
});

test('playbackRate', () => {
    const evpInstance = evp.newPlayer(url, videoElement, config);
    expect(evpInstance.playbackRate(0.5)).toBeUndefined();
    expect(evpInstance.playbackRate()).toBe(0.5);
});
