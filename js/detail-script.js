$(window).resize(function() {
    pageH = $(window).height();
    pageW = $(window).width();
    if (pageW >= 992 && !headlineshow){
        document.getElementById('headline').style.display = "block";
        document.getElementById('topmenushow').innerHTML = "&#10005";
        headlineshow = 1;
    }
});

let pos = 0;
let windowSize = [pageH, pageW];
$(window).scroll(function (event) {
    let scroll = window.pageYOffset;
    docH = $(document).height();
    let pct = scroll/(docH-pageH-150);
    if (windowSize[0] != pageH || windowSize[1] != pageW) {
        windowSize = [pageH, pageW];
        console.log("window size changed to", windowSize)
    }
    //document.getElementById("pBarL").style.width = Math.round(pct*50).toString() +"%";
    //document.getElementById("pBarR").style.width = Math.round(pct*50).toString() +"%";
    if (scroll <= pageW * 0.3 - 100) {
        if (pos != 0) {
            pos = 0
            document.getElementById("topMenuMain").style.height = "80px";
            document.getElementById("topMenuMain").style.background = "rgba(55,55,55,0.8)";
            document.getElementById("headline").style.top = "30px";
            document.getElementById("topmenushow").style.fontSize = "35px";
            document.getElementById("topmenushow").style.lineHeight = "50px";
            //document.getElementById("issl").style.top = parseInt(100+scroll*0.5).toString()+'px';

            //document.getElementById("namebar").style.opacity = Math.max(0, 1-scroll*0.003).toString();
            //document.getElementById("issl").style.opacity = Math.max(0, 1-scroll*0.003).toString();
        }
    } else if (scroll > pageW * 0.3 - 100) {
        if (pos == 0) {
            document.getElementById("topMenuMain").style.height = "60px";
            document.getElementById("topMenuMain").style.background = "rgba(55,55,55,1)";
            document.getElementById("headline").style.top = "10px";
            document.getElementById("topmenushow").style.fontSize = "30px";
            document.getElementById("topmenushow").style.lineHeight = "40px";
            pos = 1
        }
    }

});