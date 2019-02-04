# epic-video-player

JS library to wrap different video libraries (at the moment, [dashjs](https://github.com/Dash-Industry-Forum/dash.js) and [hls.js](https://github.com/video-dev/hls.js)).

*NB*: This library is in progress and it still lacks a lot of features that are needed to work with video in the real world. You are more than welcome to contribute or ask for features.

# Installation

Install the dependency into your project
    ```
    $ npm install epic-video-player
    ```

# Using it as CommonJS module
    ```
    import { newPlayer } from '@epiclabs/epic-video-player';
    
    ...

    let myPlayer = newPlayer('some-video-url', document.getElementById('html-video-id'));

    myPlayer.pause();
    myPlayer.currentTime(10);
    myPlayer.play();
    ```

# Using it as UMD module within ```<script>``` tag
    ```
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
                var myEvp = evp.newPlayer('https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd', document.getElementById('my-video'));
                myEvp.htmlPlayer.oncanplay = () => {
                    myEvp.currentTime(14);
                };
            });
        </script>
        ...
    </body>
    ```

# Development
    ```
    $ git clone https://github.com/epiclabs-io/epic-video-player.git
    $ cd epic-video-player
    $ npm install
    $ npm run build
    ```

# API

## Methods

- **newPlayer(url: string, htmlPlayer: HtmlVideoElement, config?: IPlayerConfig)**

  Creates a new instance of epic-video-player.
  
- **pause()**
  
  Stops playback of the video.

- **play()**
  
  Begins playback of the video.

- **currentTime(secs?: number)**

  It can receive a double indicating the number of seconds, in which case it will seek the video to the new time.
    
  If not parameters are provided it will return the current playback time in seconds.

- **volume(perc?: number)**

  It can receive a double (from 0.0 to 1.0) indicating the level of the volume, in which case it will set the volume to the new level.
    
  If not parameters are provided, it will return the current volume level.

- **playbackRate(rate?: number)**

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
| IPlayerConfig | initialRenditionKbps?: number;<br>initialRenditionIndex?: number; |

