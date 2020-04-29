(function() {
    
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(function (mediaStreamObj) {
        let recordButtons = document.querySelectorAll(".red-button");
        let mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];

        for (const button of recordButtons) {
            button.addEventListener('click', (e) => {
                const padCode = e.path[1].attributes[0].nodeValue
                const audioPlayback = document.querySelector(`audio[padCode="${padCode}"]`)

                if (!button.classList.contains("record-on")) {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                } else {
                    setTimeout(() => {
                        mediaRecorder.start();
                        console.log(mediaRecorder.state);
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
    .catch(function (err) {
        console.log(err.name, err.message);
    });

})();