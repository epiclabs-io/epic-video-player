# Epic Video Player

[Live demo](https://adripanico.github.io/epic-video-player)

JS library to wrap different video libraries. Currently supporting native HTML video (WebM, Ogg Theora Vorbis, Ogg Opus, Ogg FLAC and MP4 H.264), MPEG-DASH ([dash.js](https://github.com/Dash-Industry-Forum/dash.js)) and HLS ([hls.js](https://github.com/video-dev/hls.js)) streams.

This project is not intended to be used in production since the result is a heavy library (over 1 MB minified!).

# ToC

1. [Installation](#Installation)
2. [Using it as CommonJS module](#Using-it-as-CommonJS-module)
3. [Using it as UMD module within ```<script>``` tag](#Using-it-as-UMD-module-within-```<script>```-tag)
4. [API](#API)
5. [Development](#Development)
6. [Contribution](#Contribution)

# Installation

Install the dependency into your project

    $ npm install @epiclabs/epic-video-player --save

# Using it as CommonJS module

    import { newPlayer } from '@epiclabs/epic-video-player';

    ...

    let myPlayer = newPlayer('some-video-url', document.getElementById('html-video-id'));

    myPlayer.pause();
    myPlayer.currentTime(10);
    myPlayer.play();

# Using it as UMD module within ```<script>``` tag

    <head>
        ...
        <script src="bundle/index.min.js"></script>
        ...
    </head>
    <body>
        ...
        <video id="my-video" style="width: 100%;" autoplay controls muted></video>
        ...
        <script type="text/javascript">
            document.addEventListener('DOMContentLoaded', () => {
                const myEvp = evp.newPlayer('https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd', document.getElementById('my-video'));
                myEvp.htmlPlayer.oncanplay = () => {
                    myEvp.currentTime(14);
                };
            });
        </script>
        ...
    </body>

# API

## Properties

- **htmlPlayer: HTMLVideoElement**

  Contains the [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement).

- **player: PlayerNative | PlayerDash | PlayerHls**

  Contains the internal instance of the video player.

  * For `PlayerNative`, it will match the `HTMLVideoElement`.

  * For `PlayerDash`, it will match the `MediaPlayer` object as documented [here](http://cdn.dashjs.org/latest/jsdoc/module-MediaPlayer.html).

  * For `PlayerHls`, it will match the `Hls` object as documented [here](https://github.com/video-dev/hls.js/blob/master/docs/API.md).

- **playerType: 'DASH' | 'HLS' | 'NATIVE'**

  The type of player currently being used.

- **config: IPlayerConfig**

  Returns the configuration provided when the player was created, if any.

## Methods

- **newPlayer(url: string, htmlPlayer: HtmlVideoElement, config?: IPlayerConfig): PlayerNative | PlayerDash | PlayerHls**

  Creates a new instance of epic-video-player.

- **load(): void**

  Triggers internally when newPlayer is called. If called manually, it will restart the current playback.

- **destroy(): void**

  Destroys the video player instance and related internal event listeners. Take into account that this doesn't remove the HTMLVideoElement element from the DOM.

- **pause(): void**

  Stops playback of the video.

- **play(): Promise<void>**

  Begins playback of the video.

- **currentTime(secs?: number): void | number**

  It can receive a double indicating the number of seconds, in which case it will seek the video to the new time.

  If not parameters are provided it will return the current playback time in seconds.

- **volume(percentage?: number): void | number**

  It can receive a double (from 0.0 to 1.0) indicating the level of the volume, in which case it will set the volume to the new level.

  If not parameters are provided, it will return the current volume level.

- **playbackRate(rate?: number): void | number**

  It can receive a double indicating the rate at which the video will be played back (1.0 by default).

  For negative numbers the video will be played backwards.

  If not parameters are provided it will return the current playback rate.

- **getStats()**

  Returns video stats as IStats.

- **getRenditions()**

  Returns the renditions of the video as an array of IRendition.

- **setRendition(rendition: IRendition | number, immediately: boolean)**

  Set the desired rendition. It will not drop the already buffered segments.

  If *rendition* is -1, the rendition selection will be set to automatic.

  If *immediately* is true, the buffer will be cleaned and the new rendition will be automatically rendered. In some cases (i.e. dashjs) it is not yet possible.

- **getCurrentRendition()**

  Returns the current rendition as a IRendition.

## Object interfaces

| Name | Properties |
| ---- | ---------- |
| IStatsTimeRanges | start: number;<br>end: number; |
| IStats | buffered: IStatsTimeRanges[];<br>duration: number;<br>droppedFrames: number;<br>loadTime: number;<br>played: IStatsTimeRanges[];<br>seekable: IStatsTimeRanges[]; |
| IRendition | audioCodec?: string;<br>bitrate: number;<br>height: number;<br>level?: number;<br>name?: string;<br>videoCodec?: string;<br>width: number; |
| IPlayerConfig | initialRenditionKbps?: number;<br>initialRenditionIndex?: number;<br>(*)type?: string; |

*Type examples: 'application/dash+xml', 'application/x-mpegURL', ...*

# Development

    $ git clone https://github.com/epiclabs-io/epic-video-player.git
    $ cd epic-video-player
    $ npm i

1. For development:

       $ npm run start

2. To build unminified version with source maps:

       $ npm run build-dev

3. To build minified version:

       $ npm run build

# Contribution

Everyone is welcome to collaborate to this project.

Just create a new branch from dev with a meaningful name and do a Pull Request against dev.

If the fix / feature is related to any open issue please provide a proper link.
