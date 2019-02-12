import * as dashjs from 'dashjs';
import { IPlayerConfig, IRendition, PlayerType } from './models';
import { Player } from './Player';

export class PlayerDash extends Player<dashjs.MediaPlayerClass> {
  private static getCodecName(codec: string): string {
    const re = /"(.*?)"/g;
    const codecName = re.exec(codec);
    if (codecName && codecName.length > 0 && !!codecName[1]) {
      return codecName[1];
    }
    return;
  }

  constructor(url: string, htmlPlayer: HTMLVideoElement, config: IPlayerConfig) {
    super(url, htmlPlayer, config);
  }

  public load(): void {
    this.reset();
    try {
      this.player = dashjs.MediaPlayer().create();
      this.player.getDebug().setLogToBrowserConsole(false);
      this.player.initialize(this.htmlPlayer, this.url, false);

      // an initial rendition needs to be loaded
      if (this.config && typeof this.config.initialRenditionKbps === 'number') {
        if (this.config.initialRenditionKbps >= 0) {
          this.player.setAutoSwitchQualityFor('video', false);
          this.player.enableLastBitrateCaching(false);
          this.player.setInitialBitrateFor('video', this.config.initialRenditionKbps);
        } else {
          this.player.setAutoSwitchQualityFor('video', true);
          this.player.enableLastBitrateCaching(false);
        }
      }

      this.initListeners();
      this.playerType = PlayerType.DASH;
    } catch (e) {
      console.error(e);
    }
  }

  public destroy(): void {
    try {
      if (this.player !== undefined) {
        this.player.reset();
      }
      this.playerType = undefined;
    } catch (e) {
      // nothing to do
    }
  }

  public getRenditions(): IRendition[] {
    if (this.player === undefined) {
      return;
    }

    return this.convertBitratesToIRenditions(this.player.getBitrateInfoListFor('video'));
  }

  public setRendition(rendition: IRendition | number, immediately: boolean): void {
    if (this.player === undefined) {
      return;
    }

    if (typeof rendition === 'number') {
      if (rendition === -1) {
        this.player.setAutoSwitchQualityFor('video', true);
      } else {
        this.player.setAutoSwitchQualityFor('video', false);
        this.player.enableLastBitrateCaching(false);
        this.player.setQualityFor('video', rendition);
        if (immediately) {
          // dash.js does not provide this feature yet
        }
      }
      return;
    } else {
      const renditions = this.getRenditions();
      if (renditions !== undefined && renditions.length > 0) {
        for (let i = 0; i < renditions.length; i++) {
          if (renditions[i].bitrate === rendition.bitrate) {
            return this.setRendition(i, immediately);
          }
        }
      }
    }
    return this.setRendition(-1, immediately);
  }

  public getCurrentRendition(): IRendition {
    if (this.player === undefined) {
      return;
    }

    const renditions = this.getRenditions();
    if (renditions !== undefined && renditions.length > 0) {
      const currentQuality = this.player.getQualityFor('video');
      if (currentQuality >= 0 && renditions.length > currentQuality) {
        return renditions[currentQuality];
      }
    }
    return;
  }

  private convertBitratesToIRenditions(bitrates: dashjs.BitrateInfo[]): IRendition[] {
    if (bitrates === undefined || bitrates.length === 0) { return; }

    let videoInfo: dashjs.MediaInfo;
    try {
      videoInfo = this.player.getCurrentTrackFor('video');
    } catch (e) {
      // nothing to do
    }

    let audioInfo: dashjs.MediaInfo;
    try {
      audioInfo = this.player.getCurrentTrackFor('audio');
    } catch (e) {
      // nothing to do
    }

    return bitrates.map((b: dashjs.BitrateInfo) => {
      return {
        audioCodec: audioInfo && audioInfo.codec ? PlayerDash.getCodecName(audioInfo.codec) : undefined,
        bitrate: b.bitrate !== undefined ? b.bitrate : undefined,
        height: b.height !== undefined ? b.height : undefined,
        level: b.qualityIndex !== undefined ? b.qualityIndex : undefined,
        videoCodec: videoInfo && videoInfo.codec ? PlayerDash.getCodecName(videoInfo.codec) : undefined,
        width: b.width !== undefined ? b.width : undefined,
      };
    });
  }
}
