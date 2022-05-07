let songObj = [{
    name: "Viah Wala Card - Official Song",
    singer: "Ravneet",
    song: "music/1.mp3",
    thumbnail: "music/1.jpg",
    duration: "03:16"
}, {
    name: "Tere bin nahi lagda dil ",
    singer: "Simbba",
    song: "music/2.mp3",
    thumbnail: "music/2.jpg",
    duration: "03:36"
}, {
    name: "Jallah Wallah",
    singer: "Ishqzaade",
    song: "music/3.mp3",
    thumbnail: "music/3.jpg",
    duration: "05:51"
}, {
    name: "Kinna Sohna",
    singer: "Bhaag Johnny",
    song: "music/4.mp3",
    thumbnail: "music/4.jpg",
    duration: "05:03"
}, {
    name: "Move On",
    singer: "Inder Chahal",
    song: "music/5.mp3",
    thumbnail: "music/5.jpg",
    duration: "03:59"
}, {
    name: "Unforgettable Song",
    singer: "Rachi Khairal",
    song: "music/6.mp3",
    thumbnail: "music/6.jpg",
    duration: "03:52"
}, {
    name: "Ye Tune Kya Kiya",
    singer: "Javed Bashir",
    song: "music/7.mp3",
    thumbnail: "music/7.jpg",
    duration: "06:49"
}]

let url = "music.txt";
fetch(url).then((response) => response.json())
.then((data) => {songObj = data});

// Adding songs in the List
let songListContainer = document.querySelector(".songListContainer");

str = "";
for (obj of songObj) {
    code = ` <div class="songItem">
                <img class="songItemIcon" src="${obj.thumbnail}">
                <p class="songItemName">${obj.name}</p>
                <p class="songItemPlayTime">${obj.duration}</p>
                <img id="${songObj.indexOf(obj)}" onclick="changeDesign(this.id)" src="songPlayBtn.png" class="songItemPlayBtn">
            </div>`;
    str += code;
    songListContainer.innerHTML = str;
}

// Changing play style design 
let musicImg = document.getElementById("musicImg");

const changeDesign = (index) => {
    songSetup = songObj[index];
    musicImg.children[0].setAttribute("src", songSetup.thumbnail);
    musicImg.children[0].setAttribute("style", "animation: rotateThumbnail 5s linear 0s infinite forwards;");
    musicImg.children[1].innerHTML = songSetup.name;
    musicImg.children[2].innerHTML = songSetup.singer;
    musicImg.style.background = `linear-gradient(90deg, rgba(0, 0, 0, 0.9) 0%, rgba(255, 255, 255, 0) 100%), url(${songSetup.thumbnail}) no-repeat center center`;
    musicImg.style.backgroundSize = `cover`;
}

// playing songs from musicbar
let songNum = 0;
let audioPlay = new Audio(songObj[songNum].song);
let playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
    if (audioPlay.paused || audioPlay.currentTime <= 0) {
        musicImg.children[0].setAttribute("style", "animation: rotateThumbnail 5s linear 0s infinite forwards;");
        playBtn.setAttribute("src", "pauseBtn.PNG");
        songItemPlayBtn[songNum].setAttribute("src", "songPauseBtn.PNG");
        audioPlay.play();
    } else {
        musicImg.children[0].removeAttribute("style");
        playBtn.setAttribute("src", "playBtn.png");
        songItemPlayBtn[songNum].setAttribute("src", "songPlayBtn.PNG");
        audioPlay.pause();
    }
});


// Playing songs from List
let songItemPlayBtn = document.getElementsByClassName("songItemPlayBtn");
const resetAllList = () => {
    Array.from(songItemPlayBtn).forEach((ele) => {
        ele.setAttribute("src", "songPlayBtn.png");
    });
};
Array.from(songItemPlayBtn).forEach((ele, ind) => {
    ele.addEventListener('click', (e,) => {
        resetAllList();
        songNum = parseInt(e.target.id);
        e.target.setAttribute("src", "songPauseBtn.PNG");
        playBtn.setAttribute("src", "pauseBtn.PNG");
        musicImg.children[0].setAttribute("style", "animation: rotateThumbnail 5s linear 0s infinite forwards;");
        let songPlay = songObj[songNum].song;
        audioPlay.src = songPlay;
        audioPlay.play();
    });
});


// Changing Next or Previous Song

let nextSongBtn = document.getElementById("nextSongBtn");
nextSongBtn.addEventListener("click", () => {
    if (songNum <= songObj.length) {
        songNum++;
    }
        resetAllList();
        changeDesign(songNum);
        songItemPlayBtn[songNum].setAttribute("src", "songPauseBtn.PNG");
        playBtn.setAttribute("src", "pauseBtn.png");
        let songPlay = songObj[songNum].song;
        audioPlay.src = songPlay;
        audioPlay.play();
});

let backSongBtn = document.getElementById("backSongBtn");
backSongBtn.addEventListener("click", () => {
    if (songNum > 0) {
        songNum--;
    }
        resetAllList();
        changeDesign(songNum);
        songItemPlayBtn[songNum].setAttribute("src", "songPauseBtn.PNG");
        playBtn.setAttribute("src", "pauseBtn.png");
        let songPlay = songObj[songNum].song;
        audioPlay.src = songPlay;
        audioPlay.play();
});



// Updating progressBar
let progressBar = document.getElementById("progressBar");
let songCurrentTime = document.getElementById("songCurrentTime");
let songDuration = document.getElementById("songDuration");

audioPlay.addEventListener("timeupdate", () => {
    progressBar.value = (audioPlay.currentTime / audioPlay.duration) * 100;
    songCurrentTime.innerHTML = formatTime(audioPlay.currentTime);
    songDuration.innerHTML = formatTime(audioPlay.duration);
});
progressBar.addEventListener('change', () => {
    audioPlay.currentTime = progressBar.value * audioPlay.duration / 100;
    console.log(audioPlay.currentTime);
});
function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}
