import { IPlayerConfig, IRendition, PlayerType } from './models';
import { Player } from './Player';

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
        try {
            this.htmlPlayer.src = '';
        } catch (e) {
            console.warn(e);
        } finally {
            this.playerType = undefined;
        }
    }

    public getRenditions(): IRendition[] {
        let renditions: IRendition[];

        if (this.htmlPlayer.videoTracks && this.htmlPlayer.videoTracks.length) {
            renditions = [];
            for (let i = 0; i < this.htmlPlayer.videoTracks.length; i++) {
                const vt = this.htmlPlayer.videoTracks.item(i);
                if (vt) {
                    renditions.push({
                        bitrate: 0,
                        height: this.htmlPlayer.videoHeight,
                        name: vt.label,
                        width: this.htmlPlayer.videoWidth,
                    });
                }
            }
        }

        return renditions;
    }

    public setRendition(rendition: number | IRendition, immediately: boolean): void {
        if (this.htmlPlayer.videoTracks) {
            if (typeof rendition === 'number') {
                if (rendition < this.htmlPlayer.videoTracks.length) {
                    this.htmlPlayer.videoTracks.item(rendition).selected = true;
                }
            } else {
                for (let i = 0; i < this.htmlPlayer.videoTracks.length; i++) {
                    const vt = this.htmlPlayer.videoTracks.item(i);
                    if (rendition.name && vt.label === rendition.name) {
                        vt.selected = true;
                    }
                }
            }
        }
    }

    public getCurrentRendition(): IRendition {
        if (this.htmlPlayer.videoTracks) {
            if (this.htmlPlayer.videoTracks.selectedIndex < this.htmlPlayer.videoTracks.length) {
                return {
                    bitrate: 0,
                    height: this.htmlPlayer.videoHeight,
                    name: this.htmlPlayer.videoTracks.item(this.htmlPlayer.videoTracks.selectedIndex).label,
                    width: this.htmlPlayer.videoWidth,
                };
            }
        }

        return undefined;
    }
}
