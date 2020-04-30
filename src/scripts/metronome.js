(function() {

    recordButtons = document.querySelectorAll(".red-button")
    metronome = document.getElementById("metronome")

    for (const button of recordButtons) {
        button.addEventListener("click", () => {
            //if the record button is clicked then it starts a count down to begin recording 
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
        // if it is clicked again before recording starts it cancels countdown. 
                button.classList.remove("record-on")
                clearInterval(beep);
                metronome.pause();

            }
            for (const newButton of recordButtons) {
                if (button !== newButton) {
        //any pad that is not being recorded dissapears 
                    if (button.classList.contains("record-on")) {
                        newButton.classList.add("record-off")
                    } else {
                        newButton.classList.remove("record-off")
                    }
                }
            }

        })
    }

})();

