const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const bgBody = ["#e5e7e9", "#e3c7cb", "#f8ded3", "#ffc382", "#f5eda6", "#ffcbdc", "#dcf3f3", "#ffaacc"];

const lifeat = $('#lifeat')
const musicPlayer = $('#music-player')
const songs = $(".songs")
var songElements
const audio = $('#audio')
const playerHeader = $('.player-header')
const playerHeaderImg = $('.player-header .avt')
const playerHeaderHeading = $('.player-info-heading')
const playerHeaderTitle = $('.player-info-title')
const playerImg = $('.player-img')
const playBtn = $('.btn-play')
const prvBtn = $('.prv-btn')
const nxtBtn = $('.nxt-btn')
const progress = $('.progress')
const progressFilled = $('.progress-filled')
const progressPoint = $('.progress-point')
const headerHeading = $('.player-info-heading')
const headerTitle = $('.player-info-title')
var songActive;
var currentSong = 0;
var playing = false;

const app = {
    /// Get data
    songs: [
        {
            name: "Talking To The Moon",
            artist: "Bruno Mars",
            path: "./assets/mp3/1/TalkingToTheMoonxPlayDate.mp3",
            img: "./assets/img/avt.jpg"
        },
        {
            name: "Dancing With Your Ghost",
            artist: "Sasha Sloan",
            path: "./assets/mp3/2/Sasha Sloan  Dancing With Your Ghost .mp3",
            img: "./assets/img/avt.jpg"
        },{
            name: "Bật nhạc lên",
            artist: "HIEUTHUHAI",
            path: "./assets/mp3/3/HIEUTHUHAI  Bật Nhạc Lên.mp3",
            img: "http://physical-authority.surge.sh/imgs/1.jpg"
        },{
            name: "To The Moon",
            artist: "hooligan",
            path: "./assets/mp3/4/TO THE MOON  hooligan.mp3",
            img: "./assets/img/avt.jpg"
        },{
            name: "Reality",
            artist: "Lost Frequencies",
            path: "./assets/mp3/5/Reality    Lost  Frequencies.mp3",
            img: "./assets/img/avt.jpg"
        },
        {
            name: "Timeline",
            artist: "lastlings",
            path: "./assets/mp3/6/timeline.mp3",
            img: "./assets/img/avt.jpg"
        },{
            name: "BMAGER",
            artist: "Khoi Vu",
            path: "./assets/mp3/7/BMAGER KhoiVu.mp3",
            img: "./assets/img/avt.jpg"
        },{
            name: "To the Moon",
            artist: "hooligan",
            path: "./assets/mp3/8/TO THE MOON  hooligan.mp3",
            img: "./assets/img/avt.jpg"
        },{
            name: "Công chúa của anh",
            artist: "Rabbiz",
            path: "./assets/mp3/9/Công Chúa Của Anh  Rabbiz.mp3",
            img: "./assets/img/avt.jpg"
        },{
            name: "Little Luv",
            artist: "nameless",
            path: "./assets/mp3/10/thuckhuyuanhtinhbangtra.mp3",
            img: "./assets/img/avt.jpg"
        }
    ],

    updateAudio(index = currentSong) {
        lifeat.style.background = bgBody[index%bgBody.length]
        playerHeaderImg.src = app.songs[index].img
        playerHeaderHeading.innerText = app.songs[index].artist
        playerHeaderTitle.innerText = app.songs[index].name
        audio.src = app.songs[index].path

        if(songActive) songActive.classList.remove('active')
        songActive = songElements[index]
        songActive.classList.add('active')

        headerTitle.classList.toggle("run-animation",checkOverflow(headerTitle))
        headerHeading.classList.toggle("run-animation",checkOverflow(headerHeading))

        app.handleEvents()
    },

    updateProgress(ratio) {
        progressFilled.style.width = ratio*progress.clientWidth + 'px'
    },

    updateTime(ratio) {
        audio.currentTime = audio.duration*ratio
    },

    playing: function(index = currentSong,updated = 0) {
        currentSong = index;
        audio.pause()
        if(updated == false) app.updateAudio(index)
        audio.play()
    },

    prvSong: function(index = currentSong) {
        return index - 1 >= 0 ? index - 1 : this.songs.length-1
      },
  
    nxtSong: function(index = currentSong) {
        return index + 1 < this.songs.length ? index + 1 : 0
    },

    handleEvents: function() {

        songElements.forEach((song,index) => {
            song.onclick = function() {
                app.playing(index)
            }
        })

        // Play or not
        playerImg.onclick = function() {
            if(!playing) {
                audio.play();
            }else{
                audio.pause()
            }
        }

        // Nxt/Prv Song
        prvBtn.onclick = function() {
            
            app.playing(app.prvSong())
        }

        nxtBtn.onclick = function() {
           
            app.playing(app.nxtSong())
        }

        audio.onplay = function() {
            playing = true;
            playBtn.classList.toggle('playing',playing)
        }

        audio.onpause = function() {
            playing = false;
            playBtn.classList.toggle('playing',playing)
        }

        /// clientX of progress bar
        progress.onclick = function(e) {
            if(e.target == progressPoint) return;
            let ratio = e.offsetX / progress.clientWidth;
            app.updateProgress(ratio)
            app.updateTime(ratio)
        }

        audio.ontimeupdate = function() {
            app.updateProgress(audio.currentTime/audio.duration)

            if(audio.ended) app.updateProgress(0),nxtBtn.click()
        }
    },
    // render UI
    render: function() {
        // Render songs
        songs.innerHTML = "";
        app.songs.forEach( (song,index) => {

            const html = `
                    <div class="song" data-index='${index}'>
                        <img src="${song.img}" alt="">
                        
                        <div class="song-info">
                        
                        <p class="song-heading text-hidden">
                        ${song.name}
                        </p>
        
                        <span class="song-title">
                        ${song.artist}
                        </span>

                        <span class="song-time">
                        
                        </span>
                        </div>
                    </div>
                    `
                
            songs.innerHTML += html
        })

        // 
        songElements = [...$$('.song')]
        // Update Auido
        app.updateAudio()
    },

    start: function() {
        currentSong = 0
        this.render()
        playerImg.click()
    }
}

app.start();

function checkOverflow(e)
{
   var curOverflow = e.style.overflow;

   if ( !curOverflow || curOverflow === "visible" )
      e.style.overflow = "hidden";

   var isOverflowing = e.clientWidth < e.scrollWidth 
      || e.clientHeight < e.scrollHeight;

   e.style.overflow = curOverflow;

   return isOverflowing;
}


// TIME BREAK


const clockTime = $('.clock__time')
const clockTimeElements = [...$$('.clock__time span')]
const clockBtn = $('.clock__btn')

var started = false;
var ended = false;
var playing = false
var type = 3
var timeOutList = []
var curMin = 0;
var curSec = 0;
const app = {

    breakList: [
        {
            time: 300,
            target: $('.break-choice.short')
        },
        {
            time: 1500,
            target: $('.break-choice.pomodoro')
        },
        {
            time: 900,
            target: $('.break-choice.long')
        }
    ],

    clearAllTimeOuts: function () {
        for(let x of timeOutList) {
            clearTimeout(x)
        }
    },

    updateTime: function(time) {
        if(time == 0) {
            // Reset Time
            ended = true
            clockBtn.innerText = 'Reset'
        }
        
        curMin = Math.floor(time/60)
        curSec = time%60
        app.renderTime()
    },

    renderTime: function(m = curMin,s = curSec) {
        clockTimeElements[0].innerText = m<10 ? '0' + m : m
        clockTimeElements[2].innerText = s<10 ? '0' + s : s
    },

    handleEvents: function() {
        clockBtn.onclick = function() {
            if(started && ended==false) {

                playing = !playing
                if(playing) {

                    clockBtn.innerText = "Pause"
                    let time = curMin*60 + curSec - 1;
                    app.updateTime(time)

                    for(let i = time;i>0;i--) {
                        const setTime = setTimeout(function() {
                            app.updateTime(i-1)
                        },(time-i+1)*1000)

                        timeOutList.push(setTime)
                    }
                } else {
                    clockBtn.innerText = "START"
                    app.clearAllTimeOuts()
                }
            } else if(ended == true) {
                app.breakList[type].target.click()
            } else {
                started = true
                playing = true
                ended = false

                clockBtn.innerText = "Pause"

                let time = app.breakList[type].time
                for(let i = time;i>0;i--) {
                    const setTime = setTimeout(function() {
                        app.updateTime(i-1)
                    },(time-i+1)*1000)

                    timeOutList.push(setTime)
                }
            }
        }

        app.breakList.forEach((e,i) => {
            e.target.onclick = function() {
                if($('.break-choice.active'))
                $('.break-choice.active').classList.remove('active')

                e.target.classList.add('active')

                type = i

                app.clearAllTimeOuts()

                started = false;
                ended = false;
                playing = false;

                clockBtn.innerText = "START"

                app.updateTime(e.time)
            }
        });
    },
    // render UI
    render: function() {

    },

    start: function() {
        app.handleEvents()
        app.breakList[1].target.click()
    }
}

app.start();