import { IPlayerConfig } from './models';
import { PlayerDash } from './player-dash';
import { PlayerHls } from './player-hls';
import { PlayerNative } from './player-native';

export * from './models';
export * from './player';
export * from './player-hls';
export * from './player-dash';

export function newPlayer(
  url: string,
  htmlVideo: HTMLVideoElement,
  config?: IPlayerConfig,
) {
  if (config && config.type) {
    if (config.type === 'application/dash+xml') {
      return new PlayerDash(url, htmlVideo, config);
    } else if (config.type === 'application/x-mpegURL') {
      return new PlayerHls(url, htmlVideo, config);
    } else {
      return new PlayerNative(url, htmlVideo, config);
    }
  } else {
    const filename = url.substring(url.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop();

    if (extension === 'm3u8') {
      return new PlayerHls(url, htmlVideo, config);
    } else if (extension === 'mpd') {
      return new PlayerDash(url, htmlVideo, config);
    } else {
      return new PlayerNative(url, htmlVideo, config);
    }
  }
}
