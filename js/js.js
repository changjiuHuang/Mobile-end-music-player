window.onload = function () {
    var myMusic = document.getElementById("myMusic");
    var oPlay = document.getElementsByClassName("play")[0];
    var oPause = document.getElementsByClassName("pause")[0];
    var oProgress = document.getElementsByClassName("progress")[0];
    var oBar = document.getElementsByClassName("bar")[0];
    var oBg = document.getElementsByClassName("bg")[0];
    var oSinger = document.getElementsByClassName("singer")[0];
    var oPrve = document.getElementsByClassName("prev")[0];
    var oNext = document.getElementsByClassName("next")[0];
    var oMusicTitle = document.getElementsByClassName("musicTitle")[0];
     
    
    /* 点击实现播放功能 */
    oPlay.onclick = function () {   
        myMusic.play();
        oPause.style.display = "block";
        this.style.display = "none";
        oSinger.className = "singer rotate";
    };
    
    /* 点击实现暂停功能 */
    oPause.onclick = function () {
        myMusic.pause();
        oPlay.style.display = "block";
        this.style.display = "none";
        oSinger.className = "singer";
    };
    
    /* 进度条功能 */
    var w = oProgress.offsetWidth - oBar.offsetWidth; //计算小滑块可移动的范围
    myMusic.addEventListener("timeupdate", function () {
        var s = this.currentTime/this.duration; //当前时间/总时间
        oBar.style.transform = "translate("+s*w +"px, -0.15rem)"; //滑块随音乐移动
        oBg.style.width = s*w + "px";
    });
    
    
    
    //触屏事件拖拽进度条
    var x = 0, l = 0, _left = 0;
    oBar.addEventListener("touchstart", function (e) {
        var x = e.changedTouches[0].pageX; //获取手指按下去的位置
        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", function () {
            l = _left;
        });
    });
    
    function move(e) {
        var x1 = e.changedTouches[0].pageX;
        var _left = x1 -x + l;
        if (_left < 0) {
            _left = 0;
        } else if (_left > w) {
            _left = w;
        }
        oBar.style.transform = "translate("+_left+"px, -0.15rem)";
        oBg.style.width = _left + "px";
        myMusic.currentTime = _left/w*myMusic.duration;
    }
    
    
    //用数组保存音乐
    var musicList = ["儿童歌曲-捉泥鳅.mp3", "李茂山-迟来的爱.mp3", "宋祖英-好日子.mp3",
    "谭嘉仪-小幸运.mp3", "王菲-爱不可及.mp3"];
    var n = 0; //索引
    
    //页面加载完成后显示的歌曲
    oMusicTitle.innerHTML = musicList[n];
    myMusic.src = "mp3/"+ musicList[n];
    
    if (myMusic.currentTime > myMusic.duration) {
        n ++;
        myMusic.src = "mp3/"+ musicList[n];
        myMusic.play();
    }
    
    //上一曲功能
    oPrve.onclick = function () {
        n --;
        if (n < 0) {
            n = 4;
        }
        myMusic.src = "mp3/"+ musicList[n];
        myMusic.play();
        oSinger.className = "singer rotate";
        oPause.style.display = "block";
        oPlay.style.display = "none";
    };
    
    //下一曲功能
    oNext.onclick = function () {
        n++;
        if (n > 4) {
            n = 0;
        }
        myMusic.src = "mp3/" +musicList[n];
        myMusic.play();
        oSinger.className = "singer rotate";
        oPause.style.display = "block";
        oPlay.style.display = "none";
    };
    
    //自动播放下一曲
    myMusic.addEventListener("ended", function (e){
        n ++;
        if (n > 4) {
            myMusic.pause();
            myMusic.src = "";
            oSinger.className = "singer";
            oBg.style.width = 0;
            oBar.style.transform = "translate("+0+"px, -0.15rem)";
            oPlay.style.display = "block";
            oPause.style.display = "none";
        }
        myMusic.src = "mp3/" +musicList[n];
        myMusic.play();
    });
    
    //用于显示当前播放的歌曲名
    myMusic.addEventListener("canplay", function () {
        oMusicTitle.innerHTML = musicList[n];
    });
};