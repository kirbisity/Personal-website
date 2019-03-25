function speedAdjust() {
    this.speed = 20;
};

/**
 * Creates an instance of Bubble.
 *
 * @constructor
 * @author: yanlin
 * @this {Bubble}
 */
function Bubble() {
    this.lastvx = 0;
    this.lastvy = 0;
    this.x = 0;
    this.y = 100;
    this.vx = bubbleSpeed.speed * (Math.random()-0.5);
    this.vy = bubbleSpeed.speed * (Math.random()-0.5);
};

let bubbleTime = 0;

function runbubble() {
    let scroll = window.pageYOffset;
    pageH = $(window).height();
    let skilltop = Math.round(document.getElementById('skillList').getBoundingClientRect().top + scroll);
    let skillbot = Math.round(document.getElementById('skillList').getBoundingClientRect().bottom + scroll);

    //not playing when not on screen
    if (scroll > skillbot+100 || scroll+pageH < skilltop-100){
        return;
    }

    if (bubbleTime > 1000){
        return;
    }
    bubbleTime += 1;
    console.log('here');

    bounding_box[0] = pageW;

    bounding_box[1] = Math.round($('#skillList').height());

    for (let i = 0; i < bubbleList.length; i++) {
        let friction = 1;
        friction = Math.max(0, 1 - bubbleTime * 0.001);
        bubbleList[i].vx *= friction;
        bubbleList[i].vy *= friction;


        bubbleList[i].x += bubbleList[i].vx;
        bubbleList[i].y += bubbleList[i].vy;
        bubbleList[i].lastvx = bubbleList[i].vx;
        bubbleList[i].lastvy = bubbleList[i].vy;
        let speed = Math.sqrt(bubbleList[i].vx * bubbleList[i].vx + bubbleList[i].vy * bubbleList[i].vy);

        bubbleList[i].vx = Math.max(0.95,1-speed*0.02)*bubbleList[i].vx;
        bubbleList[i].vy = Math.max(0.95,1-speed*0.02)*bubbleList[i].vy;

        if (bubbleList[i].x < bubble_radius) {
            bubbleList[i].vx += bubbleSpeed.speed * 0.2;
        } else if (bubbleList[i].x > bounding_box[0]-bubble_radius) {
            bubbleList[i].vx -= bubbleSpeed.speed * 0.2;
        }
        if (bubbleList[i].y < bubble_radius) {
            bubbleList[i].vy += bubbleSpeed.speed * 0.2;
        } else if (bubbleList[i].y > bounding_box[1]-bubble_radius) {
            bubbleList[i].vy -= bubbleSpeed.speed * 0.2;
        }
        let spd = Math.sqrt(bubbleList[i].vx*bubbleList[i].vx+bubbleList[i].vy*bubbleList[i].vy);
        if (spd < 0.02){
            bubbleList[i].vx = 0;
            bubbleList[i].vy = 0;
        }

        //gathering of bubbles
        if (i < 7){
            if (bubbleList[i].x < bounding_box[0]*0.34) {
                bubbleList[i].vx += bubbleSpeed.speed * 0.01;
            } else if (bubbleList[i].x > bounding_box[0]*0.34) {
                bubbleList[i].vx -= bubbleSpeed.speed * 0.01;
            }
        } else {
            if (bubbleList[i].x < bounding_box[0]*0.67) {
                bubbleList[i].vx += bubbleSpeed.speed * 0.01;
            } else if (bubbleList[i].x > bounding_box[0]*0.67) {
                bubbleList[i].vx -= bubbleSpeed.speed * 0.01;
            }
        }

        if (bubbleList[i].y < bounding_box[1]*0.55) {
            bubbleList[i].vy += bubbleSpeed.speed * 0.01;
        } else if (bubbleList[i].y > bounding_box[1]*0.55) {
            bubbleList[i].vy -= bubbleSpeed.speed * 0.01;
        }


        //collision between individual nodes
        for (let j = i+1; j < bubbleList.length; j++) {
            if (getDistance(bubbleList[i].x, bubbleList[i].y, bubbleList[j].x, bubbleList[j].y) < bubble_radius){
                exchange_speed(i, j);
            }
        }

        bubbleList[i].vx = 0.7 * bubbleList[i].vx + 0.3 * bubbleList[i].lastvx;
        bubbleList[i].vy = 0.7 * bubbleList[i].vy + 0.3 * bubbleList[i].lastvy;

        document.getElementById(bubbleIDList[i]).style.left = Math.round(bubbleList[i].x-40).toString() + "px";
        document.getElementById(bubbleIDList[i]).style.top = Math.round(bubbleList[i].y-40).toString() + "px";

    }

}


function getCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    return x, y
}

function getDistance(ax, ay, bx, by) {
    return Math.sqrt((ax-bx) * (ax-bx) + (ay-by) * (ay-by));
}
function exchange_speed(a, b) {
    let xd = bubbleList[b].x - bubbleList[a].x;
    let yd = bubbleList[b].y - bubbleList[a].y;
    let dd = Math.sqrt(xd * xd + yd * yd);
    if (!dd) {
        return;
    }
    let df = bubbleSpeed.speed * 0.02*(bubble_radius-dd);
    bubbleList[a].vx -= df*(xd/dd);
    bubbleList[a].vy -= df*(yd/dd);
    bubbleList[b].vx += df*(xd/dd);
    bubbleList[b].vy += df*(yd/dd);
}