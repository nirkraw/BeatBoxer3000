# [BeatBoxer3000](https://nirkraw.github.io/BeatBoxer3000/)

## Background and Overview

BeatBoxer3000 is an app that allows a user to record their own sounds and then use a soundboard to make beats with those sounds. A user can record and playback their beat. 

## Functionality & MVP's

### 1.

 Users can play a pad upon a mouseclick or keypress. Implement using the HTML audio tags and setting its source to a default sound. Choose appropriate pad based on event and use Javascript play method to playback audio.

```JavaScript
 function playSound(e) {
    let event;
    if (e.keyCode) {
        event = e.keyCode
    } else {
        event = e.path[1].attributes[0].nodeValue
    }
    const audio = document.querySelector(`audio[padCode="${event}"]`)
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
 }
```

### 2.
 Users can record their own audio and add it to chosen pad. Store audio using MediaStreams API and assign to respective pad source. 

 ```JavaScript
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function (mediaStreamObj) {
        let recordButtons = document.querySelectorAll(".red-button");
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

    //allows for users to record a sound to an individual pad 
        for (const button of recordButtons) {
            button.addEventListener('click', (e) => {
                const padCode = e.path[1].attributes[0].nodeValue
                const audioPlayback = document.querySelector(`audio[padCode="${padCode}"]`)

                if (!button.classList.contains("record-on")) {
                    mediaRecorder.stop();
                } else {
    //delays recording in order to account for the metronome count down 
                    setTimeout(() => {
                        mediaRecorder.start();
                    }, 3500);
                }
                mediaRecorder.ondataavailable = function (e) {
                    chunks.push(e.data);
                }
                mediaRecorder.onstop = (e) => {
                    let blob = new Blob(chunks, { 'type': 'audio/wav' });
                    chunks = [];
                    let audioURL = window.URL.createObjectURL(blob);
                    audioPlayback.src = audioURL;
                }
            })
        }
    })
```
### 3. 
Limit delay in playback by creating a functional metronome using setTimeOut and HTML audio tag preset with a "beep" sound. Align with visual animation for best user experience. 

```JavaScript
    recordButtons = document.querySelectorAll(".red-button")
    metronome = document.getElementById("metronome")

    for (const button of recordButtons) {
        button.addEventListener("click", () => {
        //record button click starts a count down to begin recording 
            if (!button.classList.contains("record-on")) {
                button.classList.add("record-on")
                beep = setInterval(() => {
                    metronome.volume = 1.0;
                    metronome.play();
                }, 700);
                setTimeout(() => {
                    clearInterval(beep)
                }, 2800);
            } else {
        // if clicked before recording starts cancels countdown. 
                button.classList.remove("record-on")
                clearInterval(beep);
                metronome.pause();

            }

        })
    }
```
 ### 3.  
- Users can record their beat (sounds played in rhythmic succession) and have it played back. Create a mode in which all played audio is stored in the frontend using the data object properties of the audio tag, and the time in which it was played after the recording began. When finished, the play button will playback each stored object in succession by setTimeout, using the time in which it was recorded as the interval. This allows for an accurate playback without a need to store large audio files in the backend.
- In order to minimize discrepeancies in audio levels, include volume control for each pad, which can be stored in the frontend during recording.

```Javascript 

    // when an audio is played during a beat recording, it is stored. 
    if (recordBeat.classList.contains("beat-recording")) {
        beats.push({ note: event, clickedTime: (Date.now() - startingTime), volume: audio.volume });
    }
    //allows for volume control on an individual sound    
    fader = document.querySelector(`input[padCode="${event}"]`);
    fader.oninput = (e) => {
        audio.volume = e.target.value
    }
    audio.currentTime = 0;
    audio.play();

------------------------------
    let startingTime;
    let beats = [];

    playButton = document.querySelector(".play-beat-button");

    //function for playing back whole beat
    const playBeat = (() => {
        let audio;
        let pad;
        let currentInterval;
        if (beats.length === 0) return;
    //nothing happens if the recording is empty
        playButton.classList.add("playing")
        for (let i = 0; i < beats.length; i++) {
            const beat = beats[i];
    //plays back each sound at the relative time it was recorded
            currentInterval = setTimeout(() => {
                audio = document.querySelector(`audio[padCode="${beat.note}"]`);
                audio.currentTime = 0;
                audio.volume = beat.volume;
                audio.play();
                pad = document.querySelector(`.pad[padCode="${beat.note}"]`);
                pad.classList.add('pressed');
            }, beat.clickedTime);;
        }
    });
```

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