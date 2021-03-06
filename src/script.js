/**
 * @constructor Clock
 * @struct
 * @param {Element} canvas element for draw
 * @param {number} width width of canvas
 * @param {number} height height of canvas
 */
var Clock = function(canvas, width, height) {
    this.time = "00:00:00";
    this.canvas = canvas;
    this.xCenter = width / 2;
    this.yCenter = height / 2;
}
/**Start a clock */
Clock.prototype.start = function(){
    this.drawClock();
    setTimeout( () => {
        this.drawClock();
        setTimeout( () => this.start(), 1000)
    }, 1000);
}
/**Draws a clock */
Clock.prototype.drawClock = function() {
    /** @type {Date} */ let now = new Date();
    /** @type{Array<number>} */ let angles;

    this.time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    angles = this.getAngles() //[0]hour,[1]min, [2]sec
    //background
    this.drawBackground("#f5f5f5", 210)
    //angle between arrows
    this.drawAngle(angles[0], angles[1], 120, "#ffa163");
    //timestamps    
    this.drawTimeStamps(110, 15, "gray");
    //shadow for arrows
    this.drawArrow (angles[1]+2, 200, 5, "#e5e4e4");
    this.drawArrow (angles[0]+2, 150, 8, "#e5e4e4");
    //arrows
    this.drawArrow (angles[1], 200, 5, "#333333");
    this.drawArrow (angles[0], 150, 8, "#333333");
    this.drawArrow (angles[2], 200, 3, "gray");
    //cap
    this.drawBackground("#ff6600",10)
}
/**
 * Draws background for a clock
 * @param {string} color background color for a clock
 * @param {number} radius radius for a clock background
 */
Clock.prototype.drawBackground = function(color, radius) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.xCenter, this.yCenter, radius, 0, Math.PI*2);
    ctx.fill();
}
/**
 * Draws angle as arc between two arrows
 * @param {number} a degree of first arrow
 * @param {number} b degree of second arrow
 * @param {number} radius radius of arc
 * @param {string} color color as string
 */
Clock.prototype.drawAngle = function(a, b, radius, color){
    var ctx = this.canvas.getContext('2d');
    //degree to radian
    a = a * (Math.PI/180) - Math.PI/2;
    b = b * (Math.PI/180) - Math.PI/2;
    //shadow
    ctx.beginPath();
    ctx.strokeStyle = "#e5e4e4";
    ctx.arc(this.xCenter, this.yCenter+3, radius, a, b)
    ctx.lineWidth = 3;
    ctx.stroke();
    //arrow
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(this.xCenter, this.yCenter, radius, a, b)
    ctx.lineWidth = 3;
    ctx.stroke();
}
/**
 * Draws 4 timestamps
 * @param {number} radius distance from center
 * @param {number} width width of stamps
 * @param {string} color color of stamps
 */
Clock.prototype.drawTimeStamps = function(radius, width, color) {
    var ctx = this.canvas.getContext('2d');
    /** @type {Array<Array<number>>} */ var stamps = [[6.26, 0.02], [1.55, 1.59], [3.12, 3.16], [4.69, 4.73]];
        for (let i = 0; i < 4; i ++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(this.xCenter, this.yCenter, radius, ...stamps[i]);
        ctx.lineWidth = width;
        ctx.stroke();
    }
}
/**Draws arrow 
 * @param {number} angle direction of arrow on clock as degree
 * @param {number} length length of arrow
 * @param {number} width width of arrow
 * @param {string} color color of arrow
*/    
Clock.prototype.drawArrow = function (angle, length, width, color) {
    var ctx = this.canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.moveTo(this.xCenter - 3, this.yCenter - 3);
    ctx.lineTo(this.xCenter + length*Math.cos(Math.PI/2 - angle*(Math.PI/180)), this.yCenter - length*Math.sin(Math.PI/2 - angle*(Math.PI/180)));
    ctx.lineTo(this.xCenter + 3, this.yCenter + 3);
    ctx.stroke();
    ctx.closePath();
}
/**
 * Get angles for arrows
 * @return {Array<number>} [0]hour,[1]minutes, [2]second
 */
Clock.prototype.getAngles = function() {
    numbers = this.time.split(":");

    hours = parseInt(numbers[0], 10);
    minutes = parseInt(numbers[1], 10);
    seconds = parseInt(numbers[2], 10);

    minutesAngle = minutes * 6;
    secondsAngle = seconds * 6;
    hoursAngle = (hours%12 * 30) + (30 / (360 / minutesAngle));

    return [hoursAngle, minutesAngle, secondsAngle]
}
/**
 * Returns angle between two arrows as degree
 * @param {numbers} a degree of first arrow
 * @param {numbers} b degree of second arrow
 * @return {number} Angle as degree
 */
Clock.prototype.getAngleBetweenArrows = function(a, b){
    angle = Math.abs(b - a)
    return Math.min(angle, 360 - angle)
}

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);

    var clock = new Clock(canvas, canvas.width, canvas.height);
    clock.start();
});

