import { IPlayerConfig, IRendition, PlayerType } from './models';
import { Player } from './player';

export class PlayerNative extends Player<HTMLVideoElement> {

    constructor(url: string, htmlPlayer: HTMLVideoElement, config: IPlayerConfig) {
        super(url, htmlPlayer, config);
    }

    public load(): void {
        this.reset();
        this.player = this.htmlPlayer;
        this.htmlPlayer.src = this.url;
        this.playerType = PlayerType.NATIVE;

        this.initListeners();
    }

    public destroy(): void {
        this.htmlPlayer.src = '';
        this.playerType = undefined;
    }

    public getRenditions(): IRendition[] {
        let renditions: IRendition[];

        if (this.htmlPlayer.videoTracks && this.htmlPlayer.videoTracks.length > 0) {
            renditions = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.htmlPlayer.videoTracks.length; i++) {
                const vt = this.htmlPlayer.videoTracks[i];
                if (vt) {
                    renditions.push({
                        bitrate: 0,
                        height: this.htmlPlayer.videoHeight,
                        name: vt.label || this.htmlPlayer.videoHeight.toString(),
                        width: this.htmlPlayer.videoWidth,
                    });
                }
            }
        }

        return renditions;
    }

    public setRendition(rendition: number | IRendition, immediately?: boolean): void {
        if (this.htmlPlayer.videoTracks && this.htmlPlayer.videoTracks.length > 0) {
            if (typeof rendition === 'number') {
                if (rendition < this.htmlPlayer.videoTracks.length) {
                    this.htmlPlayer.videoTracks[rendition].selected = true;
                }
            } else {
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.htmlPlayer.videoTracks.length; i++) {
                    const vt = this.htmlPlayer.videoTracks[i];
                    if (rendition.name && vt.label === rendition.name) {
                        vt.selected = true;
                    }
                }
            }
        }
    }

    public getCurrentRendition(): IRendition {
        if (this.htmlPlayer.videoTracks && this.htmlPlayer.videoTracks.length > 0 &&
          this.htmlPlayer.videoTracks.selectedIndex < this.htmlPlayer.videoTracks.length) {
            const track = this.htmlPlayer.videoTracks[this.htmlPlayer.videoTracks.selectedIndex];
            return {
                bitrate: 0,
                height: this.htmlPlayer.videoHeight,
                name: track.label || '',
                width: this.htmlPlayer.videoWidth,
            };
        }

        return undefined;
    }
}
