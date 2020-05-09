# [BeatBoxer3000](https://nirkraw.github.io/BeatBoxer3000/)

## Background and Overview

BeatBoxer3000 is an app that allows a user to record their own sounds and then use a soundboard to make beats with those sounds. A user can record and playback their beat. 

## Functionality & MVP's

- Users can play a pad upon a mouseclick or keypress. Implement using the HTML audio tags and setting its source to a default sound. Choose appropriate pad based on event and use Javascript play method to playback audio.
- Users can record their own audio and add it to chosen pad. Store audio using MediaStreams API and assign to respective pad source. Limit delay in playback by creating a functional metronome using setTimeOut and HTML audio tag preset with a "beep" sound. Align with visual animation for best user experience.   
- Users can record their beat (sounds played in rhythmic succession) and have it played back. Create a mode in which all played audio is stored in the frontend using the data object properties of the audio tag, and the time in which it was played after the recording began. When finished, the play button will playback each stored object in succession by setTimeout, using the time in which it was recorded as the interval. This allows for an accurate playback without a need to store large audio files in the backend. 
- In order to minimize discrepeancies in audio levels, include volume control for each pad, which can be stored in the frontend during recording.

## Wireframe
### Normal app view:
![Wireframe](./wireframe/beatboxerwireframe.png)

### Modal for recording a pad sound:
![Wireframe Modal](./wireframe/beatboxermodal.png)

## Architecture and Technology 

- Javascript

## Implementation Timeline

- Day 1: Research and implement how to setup a drum machine that on a click or keypress plays a pre-created audio file. Animate keypresses to imitate a pad press. 

- Day 2: Research and implement how to let users record audio. Assign to the appropriate pad. Potentially create a countdown to recording in order to minmize lag. 

- Day 3: Create a recording functionality that can store when a note pad was played and achieve playback functionality. Add volume fader to individual pads.

## BONUS

- Store recordings in database and have shareable link