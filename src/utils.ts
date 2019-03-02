import { ITimeRanges } from './models';

export function getDroppedFrames(htmlVideo: HTMLVideoElement): number {
  if (!htmlVideo) { return; }
  const hasWebKit = ('webkitDroppedFrameCount' in htmlVideo) && ('webkitDecodedFrameCount' in htmlVideo);
  const hasQuality = ('getVideoPlaybackQuality' in htmlVideo);

  if (hasQuality) {
    return (htmlVideo as any).getVideoPlaybackQuality();
  } else if (hasWebKit) {
    return (htmlVideo as any).webkitDroppedFrameCount;
  }
  return;
}

export function getDuration(htmlVideo: HTMLVideoElement): number {
  if (!htmlVideo) { return; }
  return htmlVideo.duration;
}

export function getBuffered(htmlVideo: HTMLVideoElement): TimeRanges {
  if (!htmlVideo) { return; }
  return htmlVideo.buffered;
}

export function getSeekable(htmlVideo: HTMLVideoElement): TimeRanges {
  if (!htmlVideo) { return; }
  return htmlVideo.seekable;
}

export function getPlayed(htmlVideo: HTMLVideoElement): TimeRanges {
  if (!htmlVideo) { return; }
  return htmlVideo.played;
}

export function timeRangesToITimeRanges(tr: TimeRanges): ITimeRanges[] {
  const res: ITimeRanges[] = [];
  if (tr && tr.length > 0) {
    for (let i = 0; i < tr.length; i++) {
      res.push({start: tr.start(i), end: tr.end(i)});
    }
  }
  return res;
}
