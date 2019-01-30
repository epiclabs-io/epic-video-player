# epic-video-player

JS library to wrap different video libraries (at the moment, [dashjs](https://github.com/Dash-Industry-Forum/dash.js) and [hls.js](https://github.com/video-dev/hls.js)).

*NB*: This library is in progress and it still lacks a lot of features that are needed to work with video in the real world. You are more than welcome to contribute, ask for features and buy me a beer (not PayPal, just ask me for my postal address and you can directly send me the beer :D).

*NB2*: I am still fighting and learning on the best approach to bundle the solution. This is a first functional attempt but unfortunately the **typescript definitions are not available at this point**.

# Installation

1. Install the dependency into your project
    ```
    $ npm install epic-video-player
    ```

2. Import it:
    ```
    import * as evp from 'epic-video-player';
    ```

3. Make use of it:
    ```
    let myPlayer = evp.newPlayer('some-video-url', document.getElementById('html-video-id'));

    myEvp.pause();
    myEvp.currentTime(10);
    myEvp.play();
    ```

4. The HTML ```<video>``` element has been also exposed, so you can operate directly against it:
    ```
    myPlayer.htmlPlayer.play();
    
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

| Name              | Properties                                                                                                                                                        |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IStatsTimeRanges  | start: number;<br>end: number;                                                                                                                                    |
| IStats            | buffered: IStatsTimeRanges[];<br>duration: number;<br>droppedFrames: number;<br>loadTime: number;<br>played: IStatsTimeRanges[];<br>seekable: IStatsTimeRanges[]; |
| IRendition        | audioCodec?: string;<br>bitrate: number;<br>height: number;<br>level?: number;<br>name?: string;<br>videoCodec?: string;<br>width: number;                        |
| IPlayerConfig     | initialRenditionKbps?: number;<br>initialRenditionIndex?: number; |

