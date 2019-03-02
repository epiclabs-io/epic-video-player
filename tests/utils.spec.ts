export {};

const utils = require('../src/utils');

const videoElement = document.createElement('video');

test('getDroppedFrames', () => {
    expect(utils.getDroppedFrames(videoElement)).toBeUndefined();

    (videoElement as any).webkitDroppedFrameCount = 10;
    (videoElement as any).webkitDecodedFrameCount = 10;
    expect(utils.getDroppedFrames(videoElement)).toBe(10);

    (videoElement as any).getVideoPlaybackQuality = () => 20;
    expect(utils.getDroppedFrames(videoElement)).toBe(20);

    expect(utils.getDroppedFrames(undefined)).toBeUndefined();
});

test('getDuration', () => {
    expect(utils.getDuration(videoElement)).toBe(0);
    expect(utils.getDuration(undefined)).toBeUndefined();
});

test('getBuffered', () => {
    expect(utils.getBuffered(videoElement)).toBeDefined();
    expect(utils.getBuffered(undefined)).toBeUndefined();
});

test('getSeekable', () => {
    expect(utils.getSeekable(videoElement)).toBeDefined();
    expect(utils.getSeekable(undefined)).toBeUndefined();
});

test('getPlayed', () => {
    expect(utils.getPlayed(videoElement)).toBeDefined();
    expect(utils.getPlayed(undefined)).toBeUndefined();
});

test('timeRangesToITimeRanges', () => {
    const timeRanges = {
        length: 4,
        start: (i) => i,
        end: (i) => i,
    };
    expect(utils.timeRangesToITimeRanges(timeRanges)).toHaveLength(4);
    expect(utils.timeRangesToITimeRanges(timeRanges)[0].start).toBe(0);
    expect(utils.timeRangesToITimeRanges(timeRanges)[2].start).toBe(2);

    expect(utils.timeRangesToITimeRanges(undefined).length).toBe(0);
});
