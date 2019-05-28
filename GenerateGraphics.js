let c = document.getElementById("canvas1");
let ctx = c.getContext("2d");

ctx.canvas.width = window.innerWidth - 15;
ctx.canvas.height = window.innerHeight - 20;

//background code
ctx.fillStyle = "black";
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

/*function radiansToDegrees(angle)
{
    return angle * 180 / Math.PI;
}

{
    let b = radius / 1.1;
    let a = radius * 0.75;
    let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

//c's size is the same for both sides of the heart

    let B = radiansToDegrees(Math.acos((Math.pow(b, 2) - (Math.pow(a, 2) + Math.pow(c, 2))) / (-2 * a * c)));

    console.log(b);
    console.log(a);
    console.log(c);
    console.log(B);//B = about 50.5 degrees

    //so the two angles will be -90 + - 50.5 and -90 + 50.5 since the angles are from the center 90 degree line
}*/
//formula to get an angle in a triangle
//b^2 = a^2 + c^2 - 2ac*cos(B)
//b always needs to be the side directly across from the angle you want to find
//be sure that your sides are correctly plugged in to get the angle you want

function degreesToRadians(angle)
{
    return angle * Math.PI / 180;
}

function drawHeart(x, y, height, angle = 0, color = "darkred")
{
    //radius dependant on total height of heart
    let radius = height / 3.5;

    //diagonal distance from center point to circle centers
    let hypotenuse = Math.sqrt(Math.pow(radius * 0.75, 2) + Math.pow(radius / 1.1, 2));

    //left circle center
    let leftCircleCenterX = x + hypotenuse * Math.cos(degreesToRadians(-90 + - 50.5 + angle));
    let leftCircleCenterY = y + hypotenuse * Math.sin(degreesToRadians(-90 + - 50.5 + angle));

    //point on furthest out of left circle
    let leftCircleFurthestX = leftCircleCenterX + radius * Math.cos(degreesToRadians(90 + 45 / 0.8 + angle));
    let leftCircleFurthestY = leftCircleCenterY + radius * Math.sin(degreesToRadians(90 + 45 / 0.8 + angle));

    //right circle center
    let rightCircleCenterX = x + hypotenuse * Math.cos(degreesToRadians(-90 + 50.5 + angle));
    let rightCircleCenterY = y + hypotenuse * Math.sin(degreesToRadians(-90 + 50.5 + angle));

    //point on furthest out of right circle
    let rightCircleFurthestX = rightCircleCenterX + radius * Math.cos(degreesToRadians(45 / 1.2 + angle));
    let rightCircleFurthestY = rightCircleCenterY + radius * Math.sin(degreesToRadians(45 / 1.2 + angle));

    //the point between the circles to fill up to
    let topHeartFillX = x + (radius * 0.75) * Math.cos(degreesToRadians(-90 + angle));
    let topHeartFillY = y + (radius * 0.75) * Math.sin(degreesToRadians(-90 + angle));

    //the bottommost point of the heart
    let bottomHeartFillX = x + (radius * 1.5) * Math.cos(degreesToRadians(90 + angle));
    let bottomHeartFillY = y + (radius * 1.5) * Math.sin(degreesToRadians(90 + angle));

    //draw it all out
    ctx.fillStyle = color;

    //draw the two circles
    ctx.beginPath();
    ctx.ellipse(leftCircleCenterX, leftCircleCenterY, radius, radius, 1, 0, 359);
    ctx.ellipse(rightCircleCenterX, rightCircleCenterY, radius, radius, 1, 0, 359);
    ctx.fill();

    //draw the bottom filled in part
    ctx.beginPath();
    ctx.moveTo(leftCircleFurthestX, leftCircleFurthestY);
    ctx.lineTo(bottomHeartFillX, bottomHeartFillY);
    ctx.lineTo(rightCircleFurthestX, rightCircleFurthestY);
    ctx.lineTo(topHeartFillX, topHeartFillY);
    ctx.fill();
}

let randomColorChoices = ["red", "darkred", "purple", "deeppink", "purple", "indigo", "darkorange", "yellow", "blue", "cyan", "white", "forestgreen", "green", "crimson", "darkblue"];

function generateRandoms()
{
    //random position keeping hearts on screen by considering their size
    let randomX = ctx.canvas.height / 15 + Math.random() * (ctx.canvas.width - ctx.canvas.height / 15 * 2);

    //random height with range of the original height - 2/3 to the original height + 1/3
    let randomHeight = ctx.canvas.height / 15 - ctx.canvas.height / 15 / 1.5 + Math.random() * (ctx.canvas.height / 15);

    let randomAngle = Math.random() * 360;

    //let randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
    let randomColor = randomColorChoices[Math.floor(Math.random() * randomColorChoices.length)];

    //random drop rate from 3 to (ctx.canvas.height / 10) - 1
    let randomDropRate = 3 + Math.random() * (ctx.canvas.height / 30);

    //random from -drop rate to drop rate to also determine the direction, faster falling hearts will possibly rotate faster
    let randomRotationRate = -randomDropRate + Math.random() * (randomDropRate * 2 + 1);

    return [randomX, -randomHeight, randomHeight, randomAngle, randomColor, randomDropRate, randomRotationRate];
}

function clearBackground()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

//initialize the hearts with info
let heartInfo = [];
for(let i = 0; i < ctx.canvas.width / 15; i++)
    heartInfo.push(generateRandoms());

function updateHearts()
{
    for(let i = 0; i < heartInfo.length; i++)
    {
        //update y
        if(heartInfo[i][1] + heartInfo[i][5] > ctx.canvas.height + heartInfo[i][2])//if it will be off screen taking into account the heart height
            heartInfo[i] = generateRandoms();
        else
            heartInfo[i][1] += heartInfo[i][5];

        //update rotation
        heartInfo[i][3] += heartInfo[i][6];
    }
}

//generate gradient of equal proportions from top center to bottom center
let gradient = ctx.createLinearGradient(ctx.canvas.width / 2, ctx.canvas.height / 2 - ctx.canvas.height / 2 / 3.5 * 1.75, ctx.canvas.width / 2, ctx.canvas.height / 2 + ctx.canvas.height / 2 / 3.5 * 1.75);

let colors = ["pink", "orange", "red", "darkred", "indigo", "purple"];//maybe a dropbox for colors could be possible
for(let i = 0; i < colors.length; i++)
    gradient.addColorStop(1 / colors.length * i, colors[i]);//the first parameter is where the color will start in the gradient

function drawAllHearts()
{
    for(let i = 0; i < heartInfo.length; i++)
        drawHeart(heartInfo[i][0], heartInfo[i][1], heartInfo[i][2], heartInfo[i][3], heartInfo[i][4]);

    //main heart
    drawHeart(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.height / 2, 0, gradient);
}

function animateHearts()
{
    clearBackground();
    updateHearts();
    drawAllHearts();
    window.requestAnimationFrame(animateHearts);
}

window.requestAnimationFrame(animateHearts);