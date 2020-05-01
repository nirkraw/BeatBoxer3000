(function() {

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
    //delays recording in order to account for the metrenome count down 
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
})();