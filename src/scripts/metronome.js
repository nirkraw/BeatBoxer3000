(function() {

    recordButtons = document.querySelectorAll(".red-button")
    metronome = document.getElementById("metronome")

    for (const button of recordButtons) {
        button.addEventListener("click", () => {

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
                button.classList.remove("record-on")
                clearInterval(beep);
                metronome.pause();

            }
            for (const newButton of recordButtons) {
                if (button !== newButton) {
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

