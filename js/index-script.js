let sectionPos = [0,0,0,0,0,0]
sectionPos[1] = Math.round(document.getElementById('featured1').getBoundingClientRect().top + scrollY);
sectionPos[2] = Math.round(document.getElementById('aboutme').getBoundingClientRect().top + scrollY);
sectionPos[3] = Math.round(document.getElementById('experienceList').getBoundingClientRect().top + scrollY);
sectionPos[4] = Math.round(document.getElementById('projectList').getBoundingClientRect().top + scrollY);
sectionPos[5] = Math.round(document.getElementById('footer').getBoundingClientRect().top + scrollY);

let time = 0;
let time2 = 0;
let timeCount = setInterval(myTimer, 100);
let timeCount2 = setInterval(myTimer2, 20);
//let colors = [[42, 187, 252], [54, 131, 245]]
let colors = [[42, 187, 252], [44, 111, 215]]
//let colors = [[180, 180, 180], [160, 160, 160]];
let colorA = 0
let cStepA = 0.5
let colorB = 0
let cStepB = 0.5


function graphicComponents() {
    this.preview = 0;
}

function Globals() {
    this.hour = new Date().getHours();
    this.colortimeA = [[0,0,5], [0,0,5], [0,0,5], [0,0,5], [0,10,15], [10,35,55], [20,55,85], [22,58,90], [25,59,97], [29,60,111], [30,61,117], [31,62,119], [32,63,121], [33,63,119], [34,63,117], [35,63,115], [36,63,105], [38,63,95], [40,63,90], [20,30,61], [0,10,25], [0,5,15], [
        0,0,5], [
        0,0,5]];
    this.colortimeB = [[0,5,25], [0,5,25], [0,5,25], [0,5,25], [0,15,30], [45,35,40], [85,55,50], [95,145,210], [106,146,211], [107,147,212], [108,148,213], [109,149,214], [110,150,215], [111,149,211], [114,148,207], [118,147,195], [124,144,170], [145,142,135], [169,140,95], [100,80,60], [15,10,45], [0,10,35], [0,5,25], [0,5,25]];


    /**
     * set sky color according to current time
     * @param {int} hour - the time of the day. Used to calculate the color based on four base colors matching the current time.
     */
    this.changeSkyColor = function (hour) {
        let colorsA = this.colortimeA[hour];
        let colorsB = this.colortimeB[hour];


        /* The old version, using four pivot time to give the color of the sky at the current time, doesn't look good
        if (hour < 6) {
            for (let i=0; i < 3; i++) {
                let ratio = hour/6; // ratio of 6am color
                colorsA.push(Math.round(this.colortimeA[0][i] * ratio + this.colortimeA[3][i] * (1 - ratio)));
                colorsB.push(Math.round(this.colortimeB[0][i] * ratio + this.colortimeB[3][i] * (1 - ratio)));
            }
        } else if (hour < 12) {
            for (let i=0; i < 3; i++) {
                let ratio = (hour-6)/6; // ratio of 12am color
                colorsA.push(Math.round(this.colortimeA[1][i] * ratio + this.colortimeA[0][i] * (1 - ratio)));
                colorsB.push(Math.round(this.colortimeB[1][i] * ratio + this.colortimeB[0][i] * (1 - ratio)));
            }
        } else if (hour < 18) {
            for (let i=0; i < 3; i++) {
                let ratio = (hour-12)/6; // ratio of 18am color
                colorsA.push(Math.round(this.colortimeA[2][i] * ratio + this.colortimeA[1][i] * (1 - ratio)));
                colorsB.push(Math.round(this.colortimeB[2][i] * ratio + this.colortimeB[1][i] * (1 - ratio)));
            }
        } else if (hour < 24) {
            for (let i=0; i < 3; i++) {
                let ratio = (hour-18)/6; // ratio of 0am color
                colorsA.push(Math.round(this.colortimeA[3][i] * ratio + this.colortimeA[2][i] * (1 - ratio)));
                colorsB.push(Math.round(this.colortimeB[3][i] * ratio + this.colortimeB[2][i] * (1 - ratio)));
            }
        } else {

        }
        */
        let gradBeg = 'rgba(' + colorsA[0].toString() + ', ' + colorsA[1].toString() + ', ' + colorsA[2].toString() + ', 1)';
        let gradEnd = 'rgba(' + colorsB[0].toString() + ', ' + colorsB[1].toString() + ', ' + colorsB[2].toString() + ', 1)';
        let gradient = 'linear-gradient(' + gradBeg + ', ' + gradEnd + ')';
        document.getElementById('intro0').style.background = gradient;
    };

    /**
     * fresh the hour clock and sky color, called every 10 miniutes
     */
    this.refreshClock = function () {
        this.hour = new Date().getHours();
        this.changeSkyColor(this.hour);
    };
}

/**
 * Creates an instance of class for the perspective cloud graphics.
 */
function GraphicCloud() {
    this.data = []; // left, top, width, transparency
    this.clouds = document.getElementsByClassName("graphics-element cloud");
    this.center = {x: Math.round(pageW/2), y:Math.round(pageH/2)};  // the center of the perspective
    this.k = 10000;  // smaller value represent larger movement

    /**
     * Setting the clouds
     */
    this.set = function() {
        let shax = this.center.x - mouseX;
        let shay = this.center.y - mouseY - 3*scroll;
        for (let i=0; i < this.clouds.length; i++){
            this.clouds[i].style.left = Math.round((this.data[i][0] + shax/this.k*this.data[i][2]) * pageW).toString() + "px";
            this.clouds[i].style.top = Math.round((this.data[i][1] + shay/this.k*this.data[i][2])* pageH).toString() + "px";
            if (4 < global.hour && global.hour < 20) {
                this.clouds[i].style.backgroundImage  = "url('images/graphics/cloud0.png')"
            } else {
                this.clouds[i].style.backgroundImage  = "url('images/graphics/cloud1.png')"
            }
        }
    };

    /**
     * Avoid abrupt shift in cloud position when the mouse moves out of the broswer and reenters
     */
    this.reCenter = function(xdiff, ydiff) {
        this.center.x += Math.round(xdiff);
        this.center.y += Math.round(ydiff);
    }

    /**
     * The clouds are drifting overtime from left to right
     */
    this.drift = function () {
        this.center.x += 10;
        if (this.center.x > 9007199254740975){
            this.center.x = 0
        }
        this.set();
        this.relocate();
    }

    /**
     * When the clouds drifted away, put them back to the left
     */
    this.relocate = function () {
        for (let i=0; i < this.clouds.length; i++){
            let le = parseInt(this.clouds[i].style.left.replace('px', ''));
            let wi = parseInt(this.clouds[i].style.width.replace('px', ''));
            if (le > pageW) {
                this.clouds[i].style.display = "block";
                this.data[i][0] -= 1.1 + wi/pageW;
            }
        }
    }

    /**
     * Clouds should not be the same every time you loaded the website
     */
    this.randomize = function () {
        this.data = [];
        for (let ci = 0; ci < 10; ci += 1) {
            let a = Math.random()
            let left_c = Math.random() * 0.2 + ci * 0.14 - 0.2;
            let top_c = Math.random() * 0.9 + 0.1;
            let width_c = Math.random() * 0.9 + 0.2;
            let trans_c = width_c/5 + 0.3;
            this.data.push([left_c - width_c/2, top_c - width_c/2, width_c, trans_c]);
        }
        for (let i=0; i < this.clouds.length; i++){
            this.clouds[i].style.left = Math.round(this.data[i][0] * pageW).toString() + "px";
            this.clouds[i].style.top = Math.round(this.data[i][1] * pageW).toString() + "px";
            this.clouds[i].style.width = Math.round(this.data[i][2] * pageW).toString() + "px";
            this.clouds[i].style.height = Math.round(this.data[i][2] * pageW).toString() + "px";
            this.clouds[i].style.opacity = (this.data[i][3]).toString();
            this.clouds[i].style.display = "block";
        }
    };

    this.show = function() {
        for (let i=0; i < this.clouds.length; i++){
            this.clouds[i].style.display = "block";
        }
    };
    
    this.hide = function() {
        for (let i=0; i < this.clouds.length; i++){
            this.clouds[i].style.display = "none";
        }
    };
};

let gcomp = new graphicComponents();
let gclouds = new GraphicCloud();
gclouds.randomize();

let subheaderfull = "Computer Science & Computer System Engineering";
let subheadertext = "";
let subheaderplace = 0;

let doskillheader = 0;
let skillheaderfull = "Skills";
let skillheadertext = "";
let skillheaderplace = 0;
let global = new Globals();


/** Increament graphics animation in a infinite loop by one frame at a time.
 */
function myTimer() {
    time += 1

    /*
    colorA += cStepA;
    colorB += cStepB;

    if (colorA >= 80) {
        cStepA = -1
    } else if (colorA <= 0) {
        cStepA = 1
    }
    if (colorB >= 60) {
        cStepB = -1
    } else if (colorB <= 0) {
        cStepB = 1
    }
    let colorsA = [0, 0, 0]
    let colorsB = [0, 0, 0]
    colorsA[0] = Math.round(colors[0][0] + colorA)
    colorsA[1] = Math.round(colors[0][1] + colorA)
    colorsA[2] = Math.round(colors[0][2] - 2 * colorA)
    colorsA[2] = colors[0][2]

    colorsB[0] = Math.round(colors[1][0] - 2 * colorB)
    colorsB[1] = Math.round(colors[1][1] + colorB)
    colorsB[2] = Math.round(colors[1][2] + colorB)

    let gradBeg = 'rgba(' + colorsA[0].toString() + ', ' + colorsA[1].toString() + ', ' + colorsA[2].toString() + ', 0.7)'
    let gradEnd = 'rgba(' + colorsB[0].toString() + ', ' + colorsB[1].toString() + ', ' + colorsB[2].toString() + ', 0.5)'
    let gradient = 'linear-gradient(' + gradBeg + ', ' + gradEnd + ')'
    document.getElementById('intro-overlay').style.background = gradient
    */

    if (subheaderplace < subheaderfull.length){
        subheadertext += subheaderfull.charAt(subheaderplace);
        subheaderplace+=1;
        document.getElementById("indexsubheader").innerHTML = "/* " +subheadertext + "&nbsp */";
    }
    if (skillheaderplace < skillheaderfull.length+14){
        skillheaderplace+=1;
        if (skillheaderplace >= 14){
            skillheadertext += skillheaderfull.charAt(skillheaderplace-14);
            document.getElementById("skill-table-title").innerHTML = skillheadertext + "&nbsp";
        }
    }

    if (time%10 < 5) {
        document.getElementById("indexsubheader").innerHTML = "/* " +subheadertext + "| */";
        document.getElementById("skill-table-title").innerHTML = skillheadertext + "|";
    }
    else {
        document.getElementById("indexsubheader").innerHTML = "/* " +subheadertext + "&nbsp */";
        document.getElementById("skill-table-title").innerHTML = skillheadertext + "&nbsp";
    }
    if (time%2 == 1) {
        global.refreshClock();
    }



}



function myTimer2() {
    if (doskillheader){
        time2 += 1;
    }
    // THe following will enable the skill text effect to occur repeatedly
    /*
    else {
        time2 = 0;
        if (skillheaderplace) {
            skillheadertext = "";
            skillheaderplace = 0;
        }
        return;
    }
    */
    if (time2<50){
        let tableitems = document.getElementsByClassName("skill-table-td");
        for (let i=0; i < tableitems.length; i++){
            tableitems[i].style.letterSpacing = (Math.min(50, 50-time2)*1 + 3).toString()+"px";
            tableitems[i].style.opacity = Math.min(1, time2*0.05).toString();
        }
    }
    gclouds.drift();
}

let pos = 0;
let sBg = 0;
let buttonsLit = [0, 0, 0, 0];
let lastslideprecentage = 0;


$(window).resize(function() {
    bubbleTime = 0;
    pageH = $(window).height();
    pageW = $(window).width();
    if (pageW >= 992 && !headlineshow){
        document.getElementById('headline').style.display = "block";
        document.getElementById('topmenushow').innerHTML = "&#10005";
        headlineshow = 1;
    }
});
let scroll = window.pageYOffset;
let windowSize = [pageH, pageW];
$(window).scroll(function (event) {

    scroll = window.pageYOffset;
    docH = $(document).height();
    let pct = scroll/(docH-pageH-150);
    gclouds.set();

    if (windowSize[0] != pageH || windowSize[1] != pageW) {
        sectionPos[1] = Math.round(document.getElementById('featured1').getBoundingClientRect().top + scroll);
        sectionPos[2] = Math.round(document.getElementById('aboutme').getBoundingClientRect().top + scroll);
        sectionPos[3] = Math.round(document.getElementById('experienceList').getBoundingClientRect().top + scroll);
        sectionPos[4] = Math.round(document.getElementById('projectList').getBoundingClientRect().top + scroll);
        sectionPos[5] = Math.round(document.getElementById('footer').getBoundingClientRect().top + scroll);
        windowSize = [pageH, pageW];
        console.log("window size changed to", windowSize)
    }
    document.getElementById("pBarL").style.width = Math.round(pct*50).toString() +"%";
    document.getElementById("pBarR").style.width = Math.round(pct*50).toString() +"%";
    if (scroll <= 1000) {
        document.getElementById("intro-content").style.top = Math.round(scroll/4).toString() + "px";
        document.getElementById("intro-content").style.opacity = Math.max(0, 1-scroll*0.002).toString();
        if (pos != 0) {
            pos = 0
            subheaderplace = 0;
            subheadertext = "";
            gclouds.show();
            document.getElementById("topMenuMain").style.height = "80px";
            document.getElementById("topMenuMain").style.background = "rgba(55,55,55,0.8)";
            document.getElementById("headline").style.top = "30px";
            document.getElementById("topmenushow").style.fontSize = "35px";
            document.getElementById("topmenushow").style.lineHeight = "50px";

        }
    } else if (scroll > 1000) {
        if (pos == 0) {
            pos = 1;
            gclouds.hide();
            gclouds.randomize();
            document.getElementById("topMenuMain").style.height = "60px";
            document.getElementById("topMenuMain").style.background = "rgba(55,55,55,1)";
            document.getElementById("headline").style.top = "10px";
            document.getElementById("topmenushow").style.fontSize = "30px";
            document.getElementById("topmenushow").style.lineHeight = "40px";

        }
    }

    let aboutmeheight = Math.round(document.getElementById('aboutme').clientHeight);
    let toprot = sectionPos[2];
    if (scroll + pageH >= sectionPos[2] && scroll <= sectionPos[2] + aboutmeheight) {
        document.getElementById("introBGMotion0").style.transform = "rotate(" + ((scroll-toprot)/30).toString() + "deg)";
    }


    let skilltop = Math.round(document.getElementById('skillList').getBoundingClientRect().top + scroll);
    let skillbot = Math.round(document.getElementById('skillList').getBoundingClientRect().bottom + scroll);
    if (scroll < skillbot && scroll+pageH > skilltop){
        doskillheader = 1;
    }
    else {
        doskillheader = 0;
    }

    let slidertop = Math.round(document.getElementById('slider').getBoundingClientRect().top + scroll);
    let sliderbot = Math.round(document.getElementById('slider').getBoundingClientRect().bottom + scroll);
    if (scroll < sliderbot && scroll+pageH > slidertop){
        let disbound = 2 * (scroll+(pageH-slidertop-sliderbot)/2)/(pageH+sliderbot-slidertop);
        let precentage = -2;
        if (disbound < -0.2) {
            precentage = 1.25 * (-0.2-disbound);

        } else if (disbound > 0.5){
            precentage = 2 * (disbound-0.5);
        }
        if (precentage != -2) {

            let slidemaskitems = document.getElementsByClassName("img-mask");
            // for (let i=0; i < slidemaskitems.length; i++){
                // slidemaskitems[i].style.opacity = 1-Math.max(0, 2 * precentage).toString();
            // }

            let slideitems = document.getElementsByClassName("slide-image");
            for (let i=0; i < slideitems.length; i++){
                slideitems[i].style.opacity = 1-Math.max(0, precentage).toString();
            }

            // blur has larger performance impact, so do less frequently
            if (Math.abs(precentage-lastslideprecentage) > 0.02 && precentage != 0) {
                for (let i = 0; i < slideitems.length; i++) {
                    // blur has larger performance impact, so do less frequently
                    //slideitems[i].style.filter = "blur(" + Math.max(0, Math.round(20 * precentage - 1)).toString() + "px)";
                    slideitems[i].style.filter = "grayscale(" + Math.max(30, Math.round(20 * precentage - 1)).toString() + "%)";
                    //console.log("grayscale(" + Math.max(0, Math.round(100 * precentage - 1)).toString() + "%)");
                }
                lastslideprecentage = precentage;
            }
        }
    }
    else {
    }


    if (sBg && scroll <= sectionPos[5]-pageH-155) {
        document.getElementById("second-background").style.display = "none";
        sBg = 0;
    } else if (scroll > sectionPos[5]-pageH-155) {
        document.getElementById("second-background").style.bottom = Math.round((scroll-sectionPos[5]+pageH-155)/1.4).toString() + "px";
        if (!sBg){
            document.getElementById("second-background").style.display = "block";
            sBg = 1;
        }
    }
    let scroll_m = scroll + pageH/2;
    if (!buttonsLit[0] && (scroll_m >= sectionPos[1] + 250 && scroll_m < sectionPos[2])) {
        document.getElementById("featured").focus();
        buttonsLit[0] = 1;
    } else if (buttonsLit[0] && (scroll_m < sectionPos[1] + 250 || scroll_m >= sectionPos[2])) {
        document.getElementById("featured").blur();
        buttonsLit[0] = 0;
    }
    if (!buttonsLit[1] && (scroll_m >= sectionPos[2] && scroll_m < sectionPos[3])) {
        document.getElementById("about").focus();
        buttonsLit[1] = 1;
    } else if (buttonsLit[1] && (scroll_m < sectionPos[2] || scroll_m >= sectionPos[3])) {
        document.getElementById("about").blur();
        buttonsLit[1] = 0;
    }
    if (!buttonsLit[2] && (scroll_m >= sectionPos[3] && scroll_m < sectionPos[4])) {
        document.getElementById("experience").focus();
        buttonsLit[2] = 1;
    } else if (buttonsLit[2] && (scroll_m < sectionPos[3] || scroll_m >= sectionPos[4])) {
        document.getElementById("experience").blur();
        buttonsLit[2] = 0;
    }
    if (!buttonsLit[3] && (scroll_m >= sectionPos[4] && scroll_m < sectionPos[5])) {
        document.getElementById("projects").focus();
        buttonsLit[3] = 1;
    } else if (buttonsLit[3] && (scroll_m < sectionPos[4] || scroll_m >= sectionPos[5])) {
        document.getElementById("projects").blur();
        buttonsLit[3] = 0;
    }
    undoGraphics();
});



let previewpage = function (purl, opn) {
    var uagent = navigator.userAgent.toLowerCase();
    let deviceList = ['android', 'webos', 'blackberry', 'bb', 'playbook', 'ipod', 'iemobile', 'windows phone', 'kindle', 'silk', 'opera mini','iphone', 'ipad', 'kindle'];
    for (let i = 0; i < deviceList.length; i++) {
        if (uagent.search(deviceList[i]) > -1){
            return;
        }
    }
    if (opn) {
        gcomp.preview = 1;
        let msx = event.clientX;
        let msy = event.clientY;
        document.getElementById("preview-index").style.backgroundImage = purl;
        document.getElementById("preview-index").style.display = "block";
        if (msy < pageH * 0.8)
            document.getElementById("preview-index").style.top = (msy+30).toString()+"px";
        else
            document.getElementById("preview-index").style.top = (msy-130 - Math.round(pageH*0.16)).toString()+"px";
        document.getElementById("preview-index").style.left = (msx-pageW*0.14).toString()+"px";
        document.getElementById("index-mask").style.display = "block";
    } else {
        gcomp.preview = 0;
        document.getElementById("preview-index").style.display = "none";
        document.getElementById("index-mask").style.display = "none";
    }
}

let undoGraphics = function () {
    if (gcomp.preview){
        gcomp.preview = 0;
        previewpage('', 0);
    }
}

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', mouseMoves);
/** get mouseMoves position
 @param {event} event - the event
 */
function mouseMoves(event) {
    if (Math.abs(event.clientX - mouseX) > 100 || Math.abs(event.clientY - mouseY) > 100) {
        gclouds.reCenter(event.clientX - mouseX, event.clientY - mouseY);
    }
    mouseX = event.clientX;
    mouseY = event.clientY;
    gclouds.set();
}


