import { IPlayerConfig, IRendition } from './models';
import { Player } from './player';

export class PlayerNative extends Player<HTMLVideoElement> {
  constructor(
    url: string,
    htmlPlayer: HTMLVideoElement,
    config: IPlayerConfig,
  ) {
    super(url, htmlPlayer, config);
  }

  public load(): void {
    this.reset();
    this.player = this.htmlPlayer;
    this.htmlPlayer.src = this.url;
    this.playerType = 'NATIVE';

    this.initListeners();
  }

    public destroy(): void {
        this.htmlPlayer.src = '';
        this.playerType = undefined;
    }

  public getRenditions(): IRendition[] {
    // no renditions information is provided by native browser player
    return [];
  }

  public setRendition(
    rendition: number | IRendition, // eslint-disable-line
    immediately?: boolean, // eslint-disable-line
  ): void {
    // no renditions capabilities are provided by native browser player
    return;
  }

  public getCurrentRendition(): IRendition {
    // no renditions capabilities are provided by native browser player
    return undefined;
  }
}
