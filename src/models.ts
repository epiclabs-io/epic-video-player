import { MediaPlayerClass } from 'dashjs';
import Hls from 'hls.js';

export const PlayerType = ['DASH', 'HLS', 'NATIVE'] as const;
export type IPlayerType = (typeof PlayerType)[0];

export interface ITimeRanges {
  start: number;
  end: number;
}

export interface IStats {
  buffered: ITimeRanges[];
  duration: number;
  droppedFrames: number;
  loadTime: number;
  played: ITimeRanges[];
  seekable: ITimeRanges[];
}

export interface IRendition {
  audioCodec?: string;
  bitrate: number;
  height: number;
  level?: number;
  name?: string;
  videoCodec?: string;
  width: number;
}

export interface IPlayerConfig {
  initialRenditionKbps?: number;
  initialRenditionIndex?: number;
  type?: string;
}

export type PlayerClassType = MediaPlayerClass | Hls | HTMLVideoElement;
