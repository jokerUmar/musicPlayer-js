let musicContainer = document.getElementById("audio-container")
let prevBtn = document.getElementById("prev")
let playBtn = document.getElementById("play")
let nextBtn = document.getElementById("next")

let audio = document.getElementById("audio")
let progressContainer = document.getElementById("progress-container")
let progress = document.getElementById("progress")
let title = document.querySelector(".title")
let cover = document.getElementById("cover")

const songs = [
    "Sunroof" , "korean" , "heat-wawes"  
]

let songIndex = 2 ; 

function loadSong(song) {
    
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`

}

loadSong(songs[songIndex])

function playSong() {

    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove("play")

    playBtn.querySelector("i.fas").classList.add("fa-play")
    playBtn.querySelector("i.fas").classList.remove("fa-pause")

    audio.pause()
}

function prevSong() {
    songIndex--

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}



function nextSong() {
    songIndex++
    
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}



function updateProgress(e) {

    const  {duration , currentTime} = e.srcElement
    const progressPercent = (currentTime/duration) * 100
    progress.style.width = `${progressPercent}%`

}

function setProgress(e) {
    let width = e.clienWidth
    let clickX = e.offsetX
    let duration = audio.duration
    console.log(clickX , width ,  duration);
    audio.currentTime = (clickX / width) * duration ;    
}

playBtn.addEventListener("click" , function (e) {
    const isPlaying = musicContainer.classList.contains("play")
    if (isPlaying) {
        pauseSong()
    }else{
        playSong()
    }
})

prevBtn.addEventListener("click" , prevSong)
nextBtn.addEventListener("click" , nextSong)

audio.addEventListener("timeupdate" , updateProgress)

progressContainer.addEventListener("click" , setProgress)

audio.addEventListener("ended" , nextSong)

