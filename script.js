let currentsong = new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getsongs() {
    return [
        "Blue Eyes copy.mp3",
        "Blue Eyes.mp3",
        "Brown Rang copy.mp3",
        "Brown Rang.mp3",
        "Dope Shope copy.mp3",
        "Dope Shope.mp3",
        "HIGH HEELS copy.mp3",
        "HIGH HEELS.mp3",
        "Jab Se Tere Naina copy.mp3",
        "Jab Se Tere Naina.mp3",
        "One Bottle Down copy.mp3",
        "One Bottle Down.mp3",
        "Suno Na Suno Na copy.mp3",
        "Suno Na Suno Na.mp3"
    ];
}

const PlayMusic = (track, pause = false) => {
    currentsong.src = "songs/" + track;
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

    let songul = document.querySelector(".songlist ul");
    PlayMusic(songs[0], true); // Autoplay first song but paused

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

    document.querySelectorAll(".songlist li").forEach(e => {
        e.addEventListener("click", () => {
            let track = e.getAttribute("data-track");
            PlayMusic(track);
        });
    });

    currentsong.addEventListener("timeupdate", () => {
        document.querySelector(".songduration").innerHTML =
            `${secondsToMinutesSeconds(currentsong.currentTime)}/${secondsToMinutesSeconds(currentsong.duration)}`;
        document.querySelector(".scircle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    });

    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".scircle").style.left = percent + "%";
        currentsong.currentTime = (currentsong.duration * percent) / 100;
    });

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
        document.querySelector(".left").style.left = "0";
    });

    document.querySelector(".cross-svg").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-100%";
    });

    document.querySelector(".btn-previous").addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index - 1) >= 0) {
            PlayMusic(songs[index - 1]);
        }
    });

    document.querySelector(".btn-next").addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
        if ((index + 1) < songs.length) {
            PlayMusic(songs[index + 1]);
        }
    });

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
                    <img class="song-img" src="sp.jpeg">
                    <div class="music-name">${songName}</div>
                </div>
            </div>
        </div>`;
    });

    document.querySelectorAll(".music-box-hover").forEach(el => {
        el.addEventListener("click", () => {
            let track = el.getAttribute("data-track");
            PlayMusic(track);
        });
    });

    document.getElementById("fullscreen-btn")?.addEventListener("click", () => {
        const elem = document.documentElement;
        if (!document.fullscreenElement) {
            elem.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    });
}

main();
