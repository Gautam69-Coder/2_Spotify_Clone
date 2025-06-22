let currentsong = new Audio();
let songs

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const PlayMusic = (track, pause = false) => {
    currentsong.src = "/songs/" + track;
    if (!pause) {
        currentsong.play();
        play.src = "pause.svg";
    }
    let songname = track.replaceAll("%20", " ").replaceAll(".mp3", " ");
    document.querySelector(".songname").innerHTML = songname;
    document.querySelector(".songduration").innerHTML = "00:00";
};

async function main() {
    songs = await getsongs();
    // console.log(songs)
    let songul = document.querySelector(".songlist ul");
    PlayMusic(songs[0], true)

    for (const song of songs) {
        songul.innerHTML += `
        <li data-track="${song}">
            <div class="info">
                <div>${song.replaceAll("%20", " ").replaceAll(".mp3", "")}</div>
                <div>Gautam</div>
            </div>
            <div class="playnow">
                <span>Play Now</span>
                <img class="invert" src="plyer.svg" alt="">
            </div>
        </li>`;
    }

    Array.from(document.querySelectorAll(".songlist li")).forEach(e => {
        e.addEventListener("click", () => {
            let track = e.getAttribute("data-track");
            PlayMusic(track);
        });
    });

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songduration").innerHTML =
            `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".scircle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".scircle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100
    })

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.src = "pause.svg";
        } else {
            currentsong.pause();
            play.src = "play.svg";
        }
    });

    document.querySelector(".humburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0"
    })

    document.querySelector(".cross-svg").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%"
    })

    document.querySelector(".btn-previous").addEventListener("click", () => {
        console.log("previous")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            PlayMusic(songs[index - 1])
        }
    })

    document.querySelector(".btn-next").addEventListener("click", () => {
        console.log("next")
        console.log(currentsong.src)
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) >= 0) {
            PlayMusic(songs[index + 1])
        }
    })

    currentsong.addEventListener("ended", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if (index + 1 < songs.length) {
            PlayMusic(songs[index + 1]);
        }
    });

    let mainSection = document.querySelector(".main-section");
    mainSection.innerHTML = "";

    songs.forEach(song => {
        let songName = song.replaceAll("%20", " ").replaceAll(".mp3", "");

        mainSection.innerHTML += `
        <div class="music-box-hover bgc" data-track="${song}">
            <div class="music-main">
                <div class="music-img">
                    <img  class="song-img" src="sp.jpeg">
                    <div class="music-name">${songName}</div>
                </div>
            </div>
        </div>
    `;
    });

    document.querySelectorAll(".music-box-hover").forEach(el => {
        el.addEventListener("click", () => {
            let track = el.getAttribute("data-track");
            PlayMusic(track);
        });
    });

    document.getElementById("fullscreen-btn").addEventListener("click", () => {
        const elem = document.documentElement; // You can also use a specific div
        if (!document.fullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) { // Safari
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { // IE11
                elem.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });

}

main();
