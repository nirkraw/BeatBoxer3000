(function () {
    let startingTime;
    let beats = [];

    playButton = document.querySelector(".play-button")

    const playBeat = (() => {
        let audio;
        let pad;
        let currentInterval;
        if (beats.length === 0) return;
        playButton.classList.add("playing")
        console.log(beats);
        for (let i = 0; i < beats.length; i++) {
            const beat = beats[i];
            currentInterval = setTimeout(() => {
                audio = document.querySelector(`audio[padCode="${beat.note}"]`);
                audio.currentTime = 0;
                audio.play();
                pad = document.querySelector(`.pad[padCode="${beat.note}"]`);
                pad.classList.add('pressed');
            }, beat.clickedTime);

            setTimeout(() => {
                pad = document.querySelector(`.pad[padCode="${beat.note}"]`);
                pad.classList.remove("pressed");
                console.log(pad)
                playButton.classList.remove("playing");
            }, beat.clickedTime + 100);
        }
    });

    recordBeat = document.querySelector(".record-beat");

    recordBeat.addEventListener("click", () => {
        recordBeat.classList.toggle("beat-recording");
        console.log(recordBeat);
        if (recordBeat.classList.contains("beat-recording")) {
            startingTime = Date.now();
            beats = [];
        }
    })

    playButton.addEventListener("click", playBeat);

    buttons = document.querySelectorAll("p")
    for (const button of buttons) {
        button.addEventListener("click", playSound)
    }
    window.addEventListener('keydown', playSound);

    function playSound(e) {
        let event;
        if (e.keyCode) {
            event = e.keyCode
        } else {
            event = e.path[1].attributes[0].nodeValue
        }
        const audio = document.querySelector(`audio[padCode="${event}"]`)
        if (!audio) return;
        if (recordBeat.classList.contains("beat-recording")) {
            beats.push({ note: event, clickedTime: (Date.now() - startingTime) });
        }

        fader = document.querySelector(`input[padCode="${event}"]`);
        fader.oninput = (e) => {
            audio.volume = e.target.value
        }

        audio.currentTime = 0;
        audio.play();
        
        const pad = document.querySelector(`.pad[padCode="${event}"]`)
        pad.classList.add('pressed');
        setTimeout(function () {
            pad.classList.remove("pressed")
        }, 100)
    };
})();