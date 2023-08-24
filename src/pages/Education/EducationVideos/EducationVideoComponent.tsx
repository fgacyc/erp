import { useRef } from 'react';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaVolumeSlider, MediaMuteButton, MediaOutlet, MediaPlayer,
        MediaPoster,
        MediaPlayButton,
        MediaTime,
        MediaTimeSlider,
        MediaSliderValue,
        MediaFullscreenButton,
         } from '@vidstack/react';
import { type MediaPlayerElement, MediaPlayEvent, MediaPauseEvent, MediaTimeUpdateEvent, MediaSeekingEvent, MediaFullscreenChangeEvent } from 'vidstack';
import { MediaLoadedMetadataEvent } from 'vidstack';


function EducationVideoComponent() {
   
    // USE PROPERTIES 
    //  - onEnd (Triggers when video is ended)
    // - onPause (Triggers when user pauses the video )
  
    const player = useRef<MediaPlayerElement>(null);
    const mediaSlider = useRef<MediaPlayerElement>(null);
  
    
    function onLoadedMetadata(event: MediaLoadedMetadataEvent) {
      // original media event (`loadedmetadata`) is still available.
      const originalMediaEvent = event.target;
      console.log('Check originalMediaEvent  ', originalMediaEvent);
    }
  
    function onMediaFullscreenChangeEvent(evt: MediaFullscreenChangeEvent) {
        console.log('full screen ! ',  evt);
    }
  
    function setVidPause(evt: MediaPauseEvent) {
      console.log('Check pause evt  ', evt ) ;
    }
  
    function onPlaying(evt: MediaPlayEvent) {
      console.log('Playing', evt);
    }
  
    function onSeeking(evt: MediaSeekingEvent) {
      console.log('Check MediaSeekingEvent evt ' , evt);
  
    }
  
    function onTimeUpdate(evt: MediaTimeUpdateEvent) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const timeProgress = (evt as any).detail.currentTime;
      console.log('Check timeProgress ', timeProgress);
    }

  
    return (
      <>
        <MediaPlayer
          title="Sprite Fight"
          ref={player}
          id="mediaPlayer"
          className=" transition ease-in-out hover:-translate-y-5 hover:border-x-fuchsia-300 duration-300"
          onPlay={onPlaying}
          onPause={setVidPause}
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMetadata}
          onSeeking={onSeeking}
          onFullscreenChange={onMediaFullscreenChangeEvent}
          src="https://stream.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/low.mp4"
          poster="https://image.mux.com/VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU/thumbnail.webp?time=268&width=980"
          thumbnails="https://media-files.vidstack.io/sprite-fight/thumbnails.vtt"
          aspectRatio={12 / 9} 
          keyShortcuts={{
            togglePaused: 'k Space',
            toggleMuted: 'm',
            toggleFullscreen: 'f',
            togglePictureInPicture: 'i',
            toggleCaptions: 'c',
            volumeUp: 'ArrowUp',
            volumeDown: 'ArrowDown',
          }}
          crossorigin=""
        >
  
            <MediaOutlet id="mediaOutlet">
            <MediaTime type="current" remainder className="text-slate-50 text-center flow-root" />
      <MediaPoster
        alt="Girl walks into sprite gnomes around her friend on a campfire in danger!"
      /> 
     <track
        src="https://media-files.vidstack.io/sprite-fight/subs/english.vtt"
        label="English"
        srcLang="en-US"
        kind="subtitles"
        default
      />
      <track
        src="https://media-files.vidstack.io/sprite-fight/chapters.vtt"
        srcLang="en-US"
        kind="chapters"
        default
      />
  
        </MediaOutlet>
        
        <div id="menuGroup" className="items-end">
            <MediaTimeSlider id="timeSlider" ref={mediaSlider} disabled={true} className="mx-1" >
            <MediaSliderValue type="pointer" format="time" slot="preview" />
            </MediaTimeSlider>
            <MediaPlayButton />
            <MediaMuteButton />
            <MediaVolumeSlider className="volumnSlider w-50" />
            <MediaFullscreenButton  className="float-right" />
        </div>
        {/* <MediaFullscreenButton /> */}
  
  
      </MediaPlayer>
      </>
    );
  }
  
  export default EducationVideoComponent;
  
