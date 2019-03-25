/*
Theme color
    background: #009688;
    background: #337ab7;
 */

let linkgithub = "https://github.com/kirbisity"
let linklinef = "https://www.youtube.com/watch?v=gIF-82xRhpQ)";
let linkresume = "data/resume_yanlin_zhu.pdf";
let linklinkedin = "https://www.linkedin.com/in/zhu-yanlin/";
let linkwiki = "wikirby/scienceofcomputer.html";
let linkscalespaper = "../data/scales_paper.pdf";
let castgitlink = "https://github.com/CSDTs/CSDT_Single_Page";
function openlink(textlink) {
    window.open(textlink);
}
let headlineshow = 0;
function showTopNav(){
    if (!headlineshow){
        document.getElementById('headline').style.display = "block";
        document.getElementById('topmenushow').innerHTML = "&#10005";
        headlineshow = 1;
    } else {
        document.getElementById('headline').style.display = "none";
        document.getElementById('topmenushow').innerHTML = "&#9776";
        headlineshow = 0;
    }
}
let pageH = $(window).height();
let pageW = $(window).width();
let docH = $(document).height();
let scrollY = window.pageYOffset;

/*
$('a[href^="#"]').on('click', function(event) {
*/
$('.button').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 500);
    }
});





