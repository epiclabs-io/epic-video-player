import * as Utils from './Utils';
import { PlayerType, IStats, IRendition, IPlayerConfig } from './models';

export abstract class Player<T> {
  public player: T;
  public playerType: PlayerType;
  stats: IStats;
  loadStartTime: number;

  updateStats = () => {
    this.stats = {
      buffered: Utils.timeRangesToITimeRanges(Utils.getBuffered(this.htmlPlayer)),
      droppedFrames: Utils.getDroppedFrames(this.htmlPlayer),
      duration: Utils.getDuration(this.htmlPlayer),
      loadTime: this.stats.loadTime,
      played: Utils.timeRangesToITimeRanges(Utils.getPlayed(this.htmlPlayer)),
      seekable: Utils.timeRangesToITimeRanges(Utils.getSeekable(this.htmlPlayer)),
    };
  }

  loadStart = () => {
    this.updateStats();
    if (this.stats.loadTime === -1) {
      this.loadStartTime = (new Date()).getTime();
    }
  }

  loadEnd = () => {
    this.updateStats();
    if (this.stats.loadTime === -1) {
      this.stats.loadTime = ((new Date()).getTime() - this.loadStartTime) / 1000;
    }
    this.updateStats();
  }

  constructor(protected url: string, protected htmlPlayer: HTMLVideoElement, protected config: IPlayerConfig) {
    this.resetStats();
    this.load();
  }

  abstract load(): void;

  abstract destroy(): void;

  abstract getRenditions(): IRendition[];

  abstract setRendition(rendition: IRendition | number, immediately: boolean): void;

  abstract getCurrentRendition(): IRendition;

  getStats(): IStats {
    return this.stats;
  }

  initListeners(): void {
    this.htmlPlayer.addEventListener('timeupdate', this.updateStats);
    this.htmlPlayer.addEventListener('loadstart', this.loadStart);
    this.htmlPlayer.addEventListener('canplay', this.loadEnd);
  }

  destroyListeners(): void {
    this.htmlPlayer.removeEventListener('timeupdate', this.updateStats);
    this.htmlPlayer.removeEventListener('loadstart', this.loadStart);
    this.htmlPlayer.removeEventListener('canplay', this.loadEnd);
  }

  protected reset(): void {
    this.destroyListeners();
    this.resetStats();
  }

  protected resetStats(): void {
    this.stats = {
      buffered: [],
      duration: 0,
      droppedFrames: 0,
      loadTime: -1,
      played: [],
      seekable: [],
    };
  }

  pause() {
    this.htmlPlayer.pause();
  }

  play() {
    this.htmlPlayer.play();
  }

  currentTime(secs?: number): void | number {
    if (secs !== undefined) {
      this.htmlPlayer.currentTime = secs;
    } else {
      return this.htmlPlayer.currentTime;
    }
  }

  volume(perc?: number): void | number {
    if (perc !== undefined) {
      this.htmlPlayer.volume = perc;
    } else {
      return this.htmlPlayer.volume;
    }
  }

  playbackRate(rate?: number): void | number {
    if (rate !== undefined) {
      this.htmlPlayer.playbackRate = rate;
    } else {
      return this.htmlPlayer.playbackRate;
    }
  }
}
