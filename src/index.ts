import { IPlayerConfig } from './models';
import { PlayerDash } from './PlayerDash';
import { PlayerHls } from './PlayerHls';

export * from './models';
export * from './Player';
export * from './PlayerHls';
export * from './PlayerDash';

export function newPlayer(url: string, htmlVideo: HTMLVideoElement, config?: IPlayerConfig) {
  const filename = url.substr(url.lastIndexOf('/') + 1);
  const extension = filename.split('.').pop();

  if (extension === 'm3u8') {
    return new PlayerHls(url, htmlVideo, config);
  } else {
    return new PlayerDash(url, htmlVideo, config);
  }
}
