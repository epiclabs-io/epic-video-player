export {};

const evp = require('../src/index');
const pDash = require('../src/player-dash');
const models = require('../src/models');

const url = 'http://fake-url/video.mpd';
const videoElement = document.createElement('video');
const config = {
    initialRenditionKbps: 1000,
};

test('load', () => {
    const evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.load();
    expect(evpInstance.playerType === 0).toBeTruthy();
});

test('getCodecName', () => {
    expect(pDash.PlayerDash.getCodecName()).toBeUndefined();
    expect(pDash.PlayerDash.getCodecName('video/mp4;codecs="avc1.64000d"')).toBe('avc1.64000d');
});

test('getRenditions', () => {
    const evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.getRenditions()).toBeUndefined();
});

test('getCurrentRendition', () => {
    let evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.getCurrentRendition()).toBeUndefined();

    evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.getRenditions = () => undefined;
    expect(evpInstance.getCurrentRendition()).toBeUndefined();

    evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.getRenditions = () => evpInstance.convertBitratesToIRenditions([{"mediaType":"video","bitrate":254320,"width":320,"height":180,"qualityIndex":0}]);
    evpInstance.player.getQualityFor = () => -1;
    expect(evpInstance.getCurrentRendition()).toBeUndefined();
    evpInstance.player.getQualityFor = () => 0;
    expect(evpInstance.getCurrentRendition()).toBeDefined();
});

test('convertBitratesToIRenditions', () => {
    const evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    expect(evpInstance.convertBitratesToIRenditions()).toBeUndefined();
    expect(evpInstance.convertBitratesToIRenditions([])).toBeUndefined();
    const mockBitrates = [{"mediaType":"video","bitrate":254320,"width":320,"height":180,"qualityIndex":0}];
    expect(evpInstance.convertBitratesToIRenditions(mockBitrates)).toBeDefined();
});

test('setRendition', () => {
    let evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.player = undefined;
    expect(evpInstance.setRendition()).toBeUndefined();

    evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.player.setAutoSwitchQualityFor = () => undefined;
    expect(evpInstance.setRendition(-1, true)).toBeUndefined();

    evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    evpInstance.player.setAutoSwitchQualityFor = () => undefined;
    evpInstance.player.enableLastBitrateCaching = () => undefined;
    evpInstance.player.setQualityFor = () => undefined;
    expect(evpInstance.setRendition(1, true)).toBeUndefined();
    expect(evpInstance.setRendition(1, false)).toBeUndefined();

    evpInstance.getRenditions = () => [];
    expect(evpInstance.setRendition({}, false)).toBeUndefined();

    evpInstance.getRenditions = () => [{"mediaType":"video","bitrate":254320,"width":320,"height":180,"qualityIndex":0}];
    expect(evpInstance.setRendition({}, false)).toBeUndefined();
    expect(evpInstance.setRendition({"mediaType":"video","bitrate":254320,"width":320,"height":180,"qualityIndex":0}, false)).toBeUndefined();
});

test('destroy', () => {
    const evpInstance = new pDash.PlayerDash(url, videoElement, undefined);
    expect(evpInstance.destroy()).toBeUndefined();

    evpInstance.player = undefined;
    expect(evpInstance.destroy()).toBeUndefined();
});
