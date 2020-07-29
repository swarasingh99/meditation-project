
const app = () =>{
	const song= document.querySelector('.song');
	const play= document.querySelector('.play');
	const outline= document.querySelector('.moving-outline circle')//blue circle

	const video= document.querySelector('.vid-container video');

	//SOUNDS
	const sounds= document.querySelectorAll('.sound-picker button');
	//TIME DISPLAY
	const timeDisplay=document.querySelector('.timeDisplay');
	const timeSelect= document.querySelectorAll('.time-select button');
	//LENGTH OF OUTLINE/SONG
	const outlineLength= outline.getTotalLength();
	//DURATION FOR WHICH SONG PLAYS
	let fakeDuration= 600; //defualt 600=> 10mins


	outline.style.strokeDasharray= outlineLength; //shows this much length of svg
	outline.style.strokeDashoffset= outlineLength; //leaves that much svg out
	timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;

	//PICK RAIN/BEACH SOUND
	sounds.forEach(sound=>{
		sound.addEventListener('click', function(){
			song.src= this.getAttribute('data-sound');
			video.src= this.getAttribute('data-video');
			checkPlaying(song);
		})
	})



	//PLAY/PAUSE SOUND
	play.addEventListener('click', function() {
  checkPlaying(song);
});

	const checkPlaying= song =>{
		if(song.paused){
		song.play();
		play.src= 'svg/pause.svg';
		video.play();
	
	    }
	    else{
		song.pause();
		play.src= 'svg/play.svg';
		video.pause();
	    }

	}

	//SELECT SOUND TIMING
	timeSelect.forEach(option=>{
		option.addEventListener('click', function(){
			fakeDuration= this.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
		})
	})

	//animate circle
	song.ontimeupdate = ()=>{
		let currentTime= song.currentTime;
		let elapsed= fakeDuration- currentTime;
		let seconds= Math.floor(elapsed%60);
		let minutes= Math.floor(elapsed/60);

		let progress= outlineLength- (currentTime/fakeDuration)*outlineLength;
	    outline.style.strokeDashoffset= progress; //show white part fo circle this much

	//ANIMATE TEXT
	timeDisplay.textContent = `${minutes}:${seconds}`;
	//to stop song when time over
	if(currentTime>=fakeDuration){
		song.pause();
		song.currentTime=0;
		play.src= 'svg/play.svg';
		video.pause();

	}

	}
}


app();