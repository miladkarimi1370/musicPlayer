const allSongs = [
    {
        id: 0,
        poster: "img/Eminem.jpg",
        nameOfMusic: "lose yourself",
        singer: "Eminem",
        song: "https://dl.musicdel.ir/Music/1400/09/eminem_lose_yourself%20128.mp3",

    }
    ,
    {
        id: 1,
        poster: "img/50cente.webp",
        nameOfMusic: "wanksta",
        singer: "50 Cent",
        song: "https://upmup.ir/kj/dl/78542/cc/484/758/50%20Cent%20-%20Get%20Rich%20Or%20Die%20Tryin/17%20Wanksta.mp3",

    }
    ,
    {
        id: 2,
        poster: "img/snoop dogg.jpg",
        nameOfMusic: "OMG",
        singer: "Snoop dogg",
        song: "https://dl.javanmelody.ir/dl/1402/12/Arash-OMG-(Ft-Snoop-Dogg)-abanmusics.com-320.mp3",

    }
    ,
    {
        id: 3,
        poster: "img/pitbull.jpg",
        nameOfMusic: "give me everything",
        singer: "Pitbull",
        song: "https://cdn.behmelody.in/1399/Aban/Pitbull%20-%20Give%20Me%20Everything%20feat%20Ne-Yo%20Afrojack%20%20Nayer.mp3",

    }
    ,
    {
        id: 4,
        poster: "img/the game.jpg",
        nameOfMusic: "lets ride",
        singer: "The Game",
        song: "https://www.dl.khaltoormusic.com/vif/The%20Game/03-The%20Game%20-%20Let's%20Ride.mp3",

    }
    ,
    {
        id: 5,
        poster: "img/Drdre.jpg",
        nameOfMusic: "still dre",
        singer: "Dr dre ft Snoop Dogg",
        song: "http://cdn.behmelody.in/1400/Bahman/1.%20Dr.%20Dre%2C%20Snoop%20Dogg%20-%20Still%20D.R.E.%20%28320%29.mp3",

    }
    ,
    {
        id: 6,
        poster: "img/2pac.jpg",
        nameOfMusic: "all eyes on me",
        singer: "2Pac",
        song: "https://cdn.behmelody.in/1399/Khordad/2Pac/2Pac%20-%20All%20Eyez%20On%20Me%20ft%20Big%20Syke.mp3?_=2",

    }
    ,
    {
        id: 7,
        poster: "img/enrique.jfif",
        nameOfMusic: "Bailando",
        singer: "Enrique Iglesias",
        song: "https://files.musicfeed.ir/dir/2020/11/Enrique%20Iglesias%20Bailando%20128.mp3"
    }
]


let showPlayer = true;
let activeFlagOfplayer = 0;
let playMusicFlag = false;
const firstPage = document.getElementById("firstPage");
const secondPage = document.getElementById("secondPage");
const showAlbumName = document.getElementById("showAlbumName");
const showNameOfSong = document.getElementById("showNameOfSong");
const showCurrentTimeOfSong = document.getElementById("showCurrentTimeOfSong");
const showTotalTimeOfSong = document.getElementById("showTotalTimeOfSong");
const showImgOfSong = document.getElementById("imgOfSong");
const myAudio = document.getElementById("myAudio");
const playAudio = document.getElementById("playAudio");
const puaseAudio = document.getElementById("puaseAudio");
const wrapperOfArrowAndPause = document.querySelector(".wrapperOfArrowAndPause");
let wrapperOfSeeked = document.querySelector("#wrapperOfSeeked");
const previousSong = wrapperOfArrowAndPause.children[0];
const pauseSong = wrapperOfArrowAndPause.children[1];
const PlaySong = wrapperOfArrowAndPause.children[2];
const nextSong = wrapperOfArrowAndPause.children[3];
const reloadSong = document.getElementById("reloadSong");
const toggleForShowingListPlayOrAppPlay = document.getElementById("toggleForShowingListPlayOrAppPlay");
const toggleForShowingListOfPlayOrPlayAppPlay2 = document.getElementById("toggleForShowingListOfPlayOrPlayAppPlay2");
let myInterval;
let flagOfChangeCurrentSeconds = false;
let currentSeconds;
let mySeekedBarInterval;
let currentSong = allSongs.filter((item) => item.id === activeFlagOfplayer);
let totalTimeOfCurrentMusic;
let wrapperOfSeekedOffsetWidth;

document.addEventListener("DOMContentLoaded", checkShowOrNotPlayer);
document.addEventListener("DOMContentLoaded", () => {
    wrapperOfSeekedOffsetWidth = wrapperOfSeeked.offsetWidth;
})
function checkShowOrNotPlayer(show) {
    if (show) {
        secondPage.classList.add("hidden");
        firstPage.classList.remove("hidden")
        showCurrentTimeOfSong.innerText = "00 : 00"
        setSong(activeFlagOfplayer);
    } else {
        firstPage.classList.add("hidden");
        secondPage.classList.remove("hidden");


        allSongs.map((item) => {
            const myElement = document.createElement("li");
            myElement.classList.add("bg-[#1c1c1c]", "p-4", "rounded-2xl", "cursor-pointer", "mb-2", "cursor-pointer", "relative");
            myElement.dataset.id = item.id
            myElement.innerHTML = `
                      
                            <a href="" class="w-full h-full ATag">
                                <h5 class="text-white capitalize text-xl font-bold">${item.nameOfMusic}</h5>
                                <p class="text-[#6272A4] capitalize text-sm font-light">${item.singer}</p>
                            </a>
                   
                `;
            secondPage.children[0].children[0].appendChild(myElement)
        })
        if (secondPage.children[0].children[0].children) {
            const allATags = document.querySelectorAll(".ATag");

            allATags.forEach((item) => {
                item.parentElement.addEventListener("click", (e) => {
                    e.preventDefault();

                    activeFlagOfplayer = Number(e.currentTarget.getAttribute("data-id"));

                    setSong(activeFlagOfplayer);

                    myAudio.addEventListener("loadedmetadata", () => {
                        totalTimeOfCurrentMusic = myAudio.duration;
                    })

                    //// start width of seeked bar
                    let totalWidthOfSeekedBar = wrapperOfSeekedOffsetWidth;

                    const relativeSeeked = Math.abs(totalWidthOfSeekedBar / totalTimeOfCurrentMusic);

                    mySeekedBarInterval = setInterval(() => {
                        let myWidth = wrapperOfSeeked.children[0].computedStyleMap().get("width").value;
                        myWidth = myWidth + relativeSeeked;

                   


                        wrapperOfSeeked.children[0].style.width = (myWidth + "px");


                    }, 1000);
                    //// end width of seeked bar

                    setTimerOfSong(activeFlagOfplayer);

                    myAudio.play();




                }, true)
            })



        }




    }
}



playAudio.addEventListener("click", () => {
    playAudio.classList.toggle("hidden");
    puaseAudio.classList.toggle("hidden");
    pauseSong.classList.toggle("hidden");
    PlaySong.classList.toggle("hidden")
    if (!playMusicFlag) {


        myAudio.play();
        setTimerOfSong(activeFlagOfplayer)
        setWidthOfSeekedBar();
        playMusicFlag = true;
    }
})

function setTimerOfSong() {
    showCurrentTimeOfSong.innerText = "00:00";
    if (totalTimeOfCurrentMusic) {
        myAudio.addEventListener("timeupdate", () => {
            currentSeconds = myAudio.currentTime;
            if (currentSeconds < totalTimeOfCurrentMusic) {
                showCurrentTimeOfSong.innerText = calcOfTimeOfMusic(currentSeconds);
            } else if (currentSeconds === totalTimeOfCurrentMusic) {
                showCurrentTimeOfSong.innerText = calcOfTimeOfMusic(totalTimeOfCurrentMusic);
                clearInterval(myInterval);
                currentSeconds = 0;
                showCurrentTimeOfSong.innerText = "00:00";
                activeFlagOfplayer++;
                setSong(activeFlagOfplayer);
                setTimerOfSong();
                myAudio.play();
            }
        })
    }



}
function setSong(id) {
    currentSong = allSongs.filter((item) => item.id === id)
    showAlbumName.innerText = currentSong[0].singer;
    showNameOfSong.innerText = currentSong[0].nameOfMusic;

    showImgOfSong.setAttribute("src", currentSong[0].poster);
    myAudio.setAttribute("src", currentSong[0].song);
    myAudio.addEventListener("loadedmetadata", () => {
        totalTimeOfCurrentMusic = myAudio.duration
        showTotalTimeOfSong.innerText = calcOfTimeOfMusic(myAudio.duration)
    })
};


puaseAudio.addEventListener("click", () => {
    playAudio.classList.toggle("hidden");
    puaseAudio.classList.toggle('hidden');
    PlaySong.classList.toggle("hidden");
    pauseSong.classList.toggle("hidden")
    if (playMusicFlag) {
        playMusicFlag = false;

        myAudio.pause();
        clearInterval(myInterval);
        clearInterval(mySeekedBarInterval)

    }

})

nextSong.addEventListener("click", () => {
    wrapperOfSeeked.children[0].style.width = (0 + "px");
    if (activeFlagOfplayer < allSongs.length) {
        activeFlagOfplayer++;
        currentSeconds = 0
        setSong(activeFlagOfplayer);

        clearInterval(myInterval);
        setTimerOfSong(activeFlagOfplayer);
        myAudio.play();
    } else {
        activeFlagOfplayer = 0;
        currentSeconds = 0;
        setSong(activeFlagOfplayer);

        clearInterval(myInterval);
        setTimerOfSong(activeFlagOfplayer);
        myAudio.play();
    }
})

previousSong.addEventListener("click", () => {
    wrapperOfSeeked.children[0].style.width = (0 + "px");
    if (activeFlagOfplayer > 0) {
        activeFlagOfplayer--;
        currentSeconds = 0;
        setSong(activeFlagOfplayer);

        clearInterval(myInterval);
        setTimerOfSong(activeFlagOfplayer);
        myAudio.play();
    } else {
        activeFlagOfplayer = (allSongs.length - 1);
        currentSeconds = 0;
        setSong(activeFlagOfplayer);

        clearInterval(myInterval);
        setTimerOfSong(activeFlagOfplayer);
        myAudio.play();
    }
})

PlaySong.addEventListener("click", () => {
    playAudio.classList.toggle("hidden");
    puaseAudio.classList.toggle("hidden");
    pauseSong.classList.toggle("hidden");
    PlaySong.classList.toggle("hidden")
    if (!playMusicFlag) {


        setTimerOfSong(activeFlagOfplayer)

        setWidthOfSeekedBar(currentSeconds, activeFlagOfplayer);
        myAudio.play();



        playMusicFlag = true;
    }
})

pauseSong.addEventListener("click", () => {
    playAudio.classList.toggle("hidden");
    puaseAudio.classList.toggle('hidden');
    PlaySong.classList.toggle("hidden");
    pauseSong.classList.toggle("hidden")
    if (playMusicFlag) {
        playMusicFlag = false;

        clearInterval(myInterval);
        clearInterval(mySeekedBarInterval)
        myAudio.pause();
    }

})




function setWidthOfSeekedBar() {
    let totalWidthOfSeekedBar = wrapperOfSeeked.offsetWidth;

    const relativeSeeked = Math.abs(totalWidthOfSeekedBar / totalTimeOfCurrentMusic);

    mySeekedBarInterval = setInterval(() => {
        let myWidth = wrapperOfSeeked.children[0].computedStyleMap().get("width").value;
        myWidth = myWidth + relativeSeeked;



        wrapperOfSeeked.children[0].style.width = (myWidth + "px");


    }, 1000);
}
wrapperOfSeeked.addEventListener("click", (e) => {
    myAudio.pause();
    myAudio.currentTime = 0;
    wrapperOfSeeked.children[0].style.width = "0px"
    const tapOffset = e.offsetX;
    const totalWidht = wrapperOfSeeked.offsetWidth;
    let currentWidth = Math.abs(tapOffset);
    wrapperOfSeeked.children[0].style.width = (currentWidth + "px");

    let precentOfWidth = totalWidht / currentWidth
    precentOfWidth = precentOfWidth.toFixed(1);
    precentOfWidth = Number(precentOfWidth);
    precentOfWidth = Math.ceil(100 / precentOfWidth);

    currentSeconds = Math.ceil(((totalTimeOfCurrentMusic * precentOfWidth) / 100));
    myAudio.currentTime = currentSeconds
    showCurrentTimeOfSong.innerText = calcOfTimeOfMusic(currentSeconds)
    myAudio.play();


})


reloadSong.addEventListener("click", () => {
    myAudio.pause();
    myAudio.currentTime = 0;
    currentSeconds = 0
    setTimerOfSong(activeFlagOfplayer)
    wrapperOfSeeked.children[0].style.width = "0px";
    clearInterval(mySeekedBarInterval)
    setWidthOfSeekedBar();
    myAudio.play();

})

toggleForShowingListPlayOrAppPlay.addEventListener("click", () => {
    showPlayer = !showPlayer;
    checkShowOrNotPlayer();
})

toggleForShowingListOfPlayOrPlayAppPlay2.addEventListener("click", () => {
    showPlayer = !showPlayer;
    secondPage.classList.toggle("hidden");
    firstPage.classList.toggle("hidden")
})


function calcOfTimeOfMusic(time) {
    let Hour = 0;
    let minutes = 0;
    let seconds = 0;
    if (time > 0 && time < 60) {
        Hour = "00"
        minutes = "00";
        seconds = Number.parseInt(time);

        if (seconds < 10) {
            seconds = "0" + (Number.parseInt(seconds));
            return minutes + " : " + parseInt(seconds);
        } else {
            return minutes + " : " + (parseInt(seconds))
        }

    } else if (time >= 60 && time < 3600) {

        minutes = (Number.parseInt(time / 60));


        seconds = (Number.parseInt(time % 60));

        if (minutes < 10) {
            minutes = "0" + (Number.parseInt(minutes));
        }
        if (seconds < 10) {
            seconds = "0" + (Number.parseInt(seconds))
        }


        return minutes + " : " + seconds
    } else if (time >= 3600) {
        Hour = parseInt(time / 60);
        minutes = parseInt(time % 60);
        seconds = parseInt(minutes % 60);

        if (Hour < 10) {
            Hour = "0" + Hour
        }
        if (minutes < 10) {
            minutes = "0" + parseInt(minutes)
        }
        if (seconds < 10) {
            seconds = "0" + parseInt(seconds)

        }
        return Hour + " : " + minutes + " : " + parseInt(seconds)
    }


}