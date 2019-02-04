import { MediaPlayerClass } from 'dashjs';
import Hls from 'hls.js';

export enum PlayerType {
    DASH,
    HLS,
}

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
}

export type PlayerClassType = MediaPlayerClass | Hls;
