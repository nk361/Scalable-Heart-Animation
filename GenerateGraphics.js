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

function clearBackground()
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

//create and initialize the hearts with random values
let hearts = [];
let randomColorChoices = ["red", "darkred", "purple", "deeppink", "purple", "indigo", "darkorange", "yellow", "blue", "cyan", "white", "forestgreen", "green", "crimson", "darkblue"];
for(let i = 0; i < ctx.canvas.width / 15; i++)
{
    hearts.push(new heart().generateRandoms(randomColorChoices));
}

//generate gradient of equal proportions from top center to bottom center
let gradient = ctx.createLinearGradient(ctx.canvas.width / 2, ctx.canvas.height / 2 - (ctx.canvas.width / 4 + ctx.canvas.height / 4) / 3.5 * 1.75, ctx.canvas.width / 2, ctx.canvas.height / 2 + (ctx.canvas.width / 4 + ctx.canvas.height / 4) / 3.5 * 1.75);

let colors = ["pink", "orange", "red", "darkred", "indigo", "purple"];
for(let i = 0; i < colors.length; i++)
    gradient.addColorStop(1 / colors.length * i, colors[i]);//the first parameter is where the color will start in the gradient

let foreverAlpha = 0;

function drawAllGraphics()
{
    //draw all small animated hearts
    for(let i = 0; i < hearts.length; i++)
        hearts[i].draw();

    //main heart
    new heart(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 4 + ctx.canvas.height / 4, 0, gradient).draw();

    //draw text
    ctx.font = "" + (ctx.canvas.width / 4 + ctx.canvas.height / 4) / 9 + "px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText("BMcC + NK", ctx.canvas.width / 2, ctx.canvas.height / 2 - (ctx.canvas.width / 4 + ctx.canvas.height / 4) / 7);
    //ctx.font = "" + (ctx.canvas.width / 4 + ctx.canvas.height / 4) / 7 + "px Arial";
    //ctx.fillText("Happy Birthday!", ctx.canvas.width / 2, ctx.canvas.height - ctx.canvas.height / 12);

    //draw fading in text effect on heart
    ctx.font = "" + (ctx.canvas.width / 4 + ctx.canvas.height / 4) / 9 + "px Arial";
    ctx.globalAlpha = foreverAlpha;
    ctx.fillText("Forever", ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.globalAlpha = 1;
}

let frameCount = 0;

function animateHearts()
{
    clearBackground();

    for(let i = 0; i < hearts.length; i++)
        hearts[i].update();

    drawAllGraphics();
    if(frameCount <= 150)
    {
        if(foreverAlpha >= 1 && frameCount < 0)//this is just so that I can reset it in the console to record a video
            foreverAlpha = 0;
        frameCount++;
    }
    else if(foreverAlpha < 1)
        foreverAlpha += 0.01;
    window.requestAnimationFrame(animateHearts);
}

window.requestAnimationFrame(animateHearts);