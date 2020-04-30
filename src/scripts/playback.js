(function () {
    let startingTime;
    let beats = [];

    playButton = document.querySelector(".play-button")

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
    //plays back each sound at the time it was played at the relative time it was recorded
            currentInterval = setTimeout(() => {
                audio = document.querySelector(`audio[padCode="${beat.note}"]`);
                audio.currentTime = 0;
                audio.play();
                pad = document.querySelector(`.pad[padCode="${beat.note}"]`);
                pad.classList.add('pressed');
            }, beat.clickedTime);
    //removes the pressed down property 100 milliseconds after it was pressed 
            setTimeout(() => {
                pad = document.querySelector(`.pad[padCode="${beat.note}"]`);
                pad.classList.remove("pressed");
                playButton.classList.remove("playing");
            }, beat.clickedTime + 100);
        }
    });

    //function for recording sounds together to form a beat 
    recordBeat = document.querySelector(".record-beat");
    recordBeat.addEventListener("click", () => {
        recordBeat.classList.toggle("beat-recording");
    //creates a beats array for storage of played sounds 
        if (recordBeat.classList.contains("beat-recording")) {
            startingTime = Date.now();
            beats = [];
        }
    })

    //function allowing for playback of individual sound 
    playButton.addEventListener("click", playBeat);

    buttons = document.querySelectorAll("p")
    for (const button of buttons) {
        button.addEventListener("click", playSound)
    }
    window.addEventListener('keydown', playSound);

    function playSound(e) {
        let event;
    //handles events for keypresses and click 
        if (e.keyCode) {
            event = e.keyCode
        } else {
            event = e.path[1].attributes[0].nodeValue
        }
        const audio = document.querySelector(`audio[padCode="${event}"]`)
        if (!audio) return;
    // when an audio is played during a beat recording, it is stored. 
        if (recordBeat.classList.contains("beat-recording")) {
            beats.push({ note: event, clickedTime: (Date.now() - startingTime) });
        }
    //allows for volume control on an individual sound    
        fader = document.querySelector(`input[padCode="${event}"]`);
        fader.oninput = (e) => {
            audio.volume = e.target.value
        }

        audio.currentTime = 0;
        audio.play();
    //clears the pressed property 100 milliseconds after being played     
        const pad = document.querySelector(`.pad[padCode="${event}"]`)
        pad.classList.add('pressed');
        setTimeout(function () {
            pad.classList.remove("pressed")
        }, 100)
    };
})();