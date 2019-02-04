import { IPlayerConfig, IRendition, IStats, PlayerType } from './models';
import * as Utils from './Utils';

export abstract class Player<T> {
  public player: T;
  public playerType: PlayerType;
  private stats: IStats;
  private loadStartTime: number;

  constructor(protected url: string, protected htmlPlayer: HTMLVideoElement, protected config: IPlayerConfig) {
    this.resetStats();
    this.load();
    this.initListeners();
  }

  public abstract getRenditions(): IRendition[];

  public abstract setRendition(rendition: IRendition | number, immediately: boolean): void;

  public abstract getCurrentRendition(): IRendition;

  public getStats(): IStats {
    return this.stats;
  }

  public pause() {
    this.htmlPlayer.pause();
  }

  public play() {
    this.htmlPlayer.play();
  }

  public currentTime(secs?: number): void | number {
    if (secs !== undefined) {
      this.htmlPlayer.currentTime = secs;
    } else {
      return this.htmlPlayer.currentTime;
    }
  }

  public volume(perc?: number): void | number {
    if (perc !== undefined) {
      this.htmlPlayer.volume = perc;
    } else {
      return this.htmlPlayer.volume;
    }
  }

  public playbackRate(rate?: number): void | number {
    if (rate !== undefined) {
      this.htmlPlayer.playbackRate = rate;
    } else {
      return this.htmlPlayer.playbackRate;
    }
  }

  protected abstract load(): void;

  protected abstract destroy(): void;

  protected reset(): void {
    this.destroyListeners();
    this.resetStats();
  }

  protected resetStats(): void {
    this.stats = {
      buffered: [],
      droppedFrames: 0,
      duration: 0,
      loadTime: -1,
      played: [],
      seekable: [],
    };
  }

  protected initListeners(): void {
    this.htmlPlayer.addEventListener('timeupdate', this.updateStats);
    this.htmlPlayer.addEventListener('loadstart', this.loadStart);
    this.htmlPlayer.addEventListener('canplay', this.loadEnd);
  }

  protected destroyListeners(): void {
    this.htmlPlayer.removeEventListener('timeupdate', this.updateStats);
    this.htmlPlayer.removeEventListener('loadstart', this.loadStart);
    this.htmlPlayer.removeEventListener('canplay', this.loadEnd);
  }

  protected updateStats = () => {
    this.stats = {
      buffered: Utils.timeRangesToITimeRanges(Utils.getBuffered(this.htmlPlayer)),
      droppedFrames: Utils.getDroppedFrames(this.htmlPlayer),
      duration: Utils.getDuration(this.htmlPlayer),
      loadTime: this.stats.loadTime,
      played: Utils.timeRangesToITimeRanges(Utils.getPlayed(this.htmlPlayer)),
      seekable: Utils.timeRangesToITimeRanges(Utils.getSeekable(this.htmlPlayer)),
    };
  }

  protected loadStart = () => {
    this.updateStats();
    if (this.stats.loadTime === -1) {
      this.loadStartTime = (new Date()).getTime();
    }
  }

  protected loadEnd = () => {
    this.updateStats();
    if (this.stats.loadTime === -1) {
      this.stats.loadTime = ((new Date()).getTime() - this.loadStartTime) / 1000;
    }
    this.updateStats();
  }
}
