import Hls from 'hls.js';
import { IPlayerConfig, IRendition } from './models';
import { Player } from './player';

export class PlayerHls extends Player<Hls> {
  private static convertLevelsToIRenditions(levels: Hls.Level[]): IRendition[] {
    if (levels === undefined || levels.length === 0) { return; }
    return levels.map((l: Hls.Level) => {
      return {
        audioCodec: l.audioCodec !== undefined ? l.audioCodec : undefined,
        bitrate: l.bitrate !== undefined ? l.bitrate : undefined,
        height: l.height !== undefined ? l.height : undefined,
        level: l.level !== undefined ? l.level : undefined,
        name: l.name !== undefined ? l.name : undefined,
        videoCodec: l.videoCodec !== undefined ? l.videoCodec : undefined,
        width: l.width !== undefined ? l.width : undefined,
      };
    });
  }

  constructor(
    url: string,
    htmlPlayer: HTMLVideoElement,
    config: IPlayerConfig,
  ) {
    super(url, htmlPlayer, config);
  }

  public load(): void {
    this.reset();
    try {
      if (Hls.isSupported()) {
        this.player = new Hls();
        this.player.loadSource(this.url);
        this.player.attachMedia(this.htmlPlayer);

        // an initial rendition needs to be loaded
        if (this.config && typeof this.config.initialRenditionIndex === 'number')  {
          if (this.config.initialRenditionIndex >= 0) {
            const setInitialRendition = (event, data) => {
              if (this.config.initialRenditionIndex > data.levels.length - 1) {
                this.player.loadLevel = data.levels.length - 1;
              } else {
                this.player.loadLevel = this.config.initialRenditionIndex;
              }
              this.player.off(Hls.Events.MANIFEST_PARSED, () => setInitialRendition);
            };
            this.player.on(Hls.Events.MANIFEST_PARSED, (event, data) => setInitialRendition(event, data));
          } else {
            this.player.loadLevel = -1;
          }
        }

        // hls is not supported but the native player is able to load the video
        // some features (like renditions getter/setter) will NOT be available
      } else if (this.htmlPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        this.player = undefined;
        this.htmlPlayer.src = this.url;
      }

      this.initListeners();
      this.playerType = 'HLS';
    } catch (e) {
      console.error(e);
    }
  }

  public destroy(): void {
    try {
      this.htmlPlayer.src = '';
      if (this.player !== undefined) {
        this.player.destroy();
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.htmlPlayer.pause();
      this.htmlPlayer.removeAttribute('src');
      this.htmlPlayer.load();
      this.playerType = undefined;
      this.reset();
    }
  }

  public getRenditions(): IRendition[] {
    if (this.player === undefined) {
      return;
    }

    return PlayerHls.convertLevelsToIRenditions(this.player.levels);
  }

  public setRendition(
    rendition: IRendition | number,
    immediately: boolean,
  ): void {
    if (this.player === undefined) {
      return;
    }

    if (typeof rendition === 'number') {
      if (immediately) {
        this.player.currentLevel = rendition;
      } else {
        this.player.loadLevel = rendition;
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
      const currentLevel = this.player.currentLevel;
      if (currentLevel >= 0 && renditions.length > currentLevel) {
        return renditions[currentLevel];
      }
    }
    return;
  }
}
