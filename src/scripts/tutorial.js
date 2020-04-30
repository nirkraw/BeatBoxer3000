(function () {
      stage = 0; 
      next = document.querySelector(".instructions-button");
      pad = document.querySelector(".pad-tutorial");
      arrow1 = document.querySelector(".arrow1");
      arrow2 = document.querySelector(".arrow2");
      arrow3 = document.querySelector(".arrow3");
      arrow4 = document.querySelector(".arrow4");
      arrow5 = document.querySelector(".arrow5");
      recordSound1 = document.querySelector(".record-sound-tutorial-1");
      recordSound2 = document.querySelector(".record-sound-tutorial-2");
      recordSound3 = document.querySelector(".record-sound-tutorial-3");
      bigButton = document.querySelector(".big-button-tutorial")
      playButton = document.querySelector(".play-button-tutorial")
      faderTutorial = document.querySelector(".fader-tutorial");

      opening = document.querySelector(".opening");
      startTour= document.querySelector(".start-tour");
      skipTour = document.querySelector(".skip-tour") 
  

      nextAudio = document.getElementById("tom");
      readyAudio = document.getElementById("cable");

      tutorial = (() => {
        opening.classList.add("hide");
        next.classList.add("show");
        stage++
        if(stage !== 8 ) {
          nextAudio.currentTime = 0;
          nextAudio.volume = .5;
          nextAudio.play();
        }
        if(stage === 1) {
          next.classList.add("show");
          next.classList.remove("restart-tutorial");
          next.innerHTML = "Next"
          pad.classList.add("show");
          arrow1.classList.add("show");
        }
        if(stage === 2) {
          pad.classList.remove("show");
          arrow1.classList.remove("show");
          recordSound1.classList.add("show");
          arrow2.classList.add("show");
        }
        if(stage === 3) {
          recordSound2.classList.add("show");
        }
        if(stage === 4) {
          recordSound3.classList.add("show");
        }
        if(stage === 5 ) {
          recordSound1.classList.remove("show");
          recordSound2.classList.remove("show");
          recordSound3.classList.remove("show");
          arrow2.classList.remove("show");
          faderTutorial.classList.add("show");
          arrow5.classList.add("show");
        }
        if(stage ===6 ) {
          faderTutorial.classList.remove("show");
          arrow5.classList.remove("show");
          bigButton.classList.add("show");
          arrow3.classList.add("show"); 
        }
        if(stage == 7) {
          bigButton.classList.remove("show");
          arrow3.classList.remove("show");
          playButton.classList.add("show");
          arrow4.classList.add("show");
          next.innerHTML = "Ready!"
        }
        if(stage === 8) {
          next.classList.add("restart-tutorial");
          next.innerHTML = "See tutorial"
          playButton.classList.remove("show");
          arrow4.classList.remove("show");
          stage = 0;
          readyAudio.volume =.5;
          readyAudio.play();
        }
       
      });

      skipTutorial = (()=>{
        opening.classList.add("hide");
        next.classList.add("restart-tutorial");
        next.innerHTML = "See tutorial"
        next.classList.add("show");
      })

      next.addEventListener("click", tutorial); 
      startTour.addEventListener("click", tutorial);
      skipTour.addEventListener("click", skipTutorial)

})();