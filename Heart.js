class heart
{
    constructor(x, y, height, angle, color, dropRate, rotationRate)
    {
        this.x = x;
        this.y = y;
        this.height = height;
        this.angle = angle;
        this.color = color;
        this.dropRate = dropRate;
        this.rotationRate = rotationRate;
    }

    generateRandoms()
    {
        //random position keeping hearts on screen by considering their size
        this.x = ctx.canvas.height / 15 / 2 + Math.random() * (ctx.canvas.width - ctx.canvas.height / 15);

        //random height with range of the original height - 2/3 to the original height + 1/3
        this.height = ctx.canvas.height / 15 - ctx.canvas.height / 15 / 1.5 + Math.random() * (ctx.canvas.height / 15);

        //to start the heart off above the screen
        this.y = -this.height;

        //random between 0 and 359
        this.angle = Math.random() * 360;

        //let randomColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        this.color = randomColorChoices[Math.floor(Math.random() * randomColorChoices.length)];

        //random drop rate from 3 to (ctx.canvas.height / 10) - 1
        this.dropRate = 3 + Math.random() * (ctx.canvas.height / 30);

        //random from -drop rate to drop rate to also determine the direction, faster falling hearts will possibly rotate faster
        this.rotationRate = -this.dropRate + Math.random() * (this.dropRate * 2 + 1);

        return this;
    }

    update()
    {
        //update y or generate new info
        if(this.y + this.dropRate > ctx.canvas.height + this.height)//if it will be off screen taking into account the heart height
            this.generateRandoms();
        else
        {
            //update y
            this.y += this.dropRate;

            //update rotation
            this.angle += this.rotationRate;
        }

        return this;
    }

    draw()
    {
        //radius dependant on total height of heart
        let radius = this.height / 3.5;

        //diagonal distance from center point to circle centers
        let hypotenuse = Math.sqrt(Math.pow(radius * 0.75, 2) + Math.pow(radius / 1.1, 2));

        //left circle center
        let leftCircleCenterX = this.x + hypotenuse * Math.cos(degreesToRadians(-90 - 50.5 + this.angle));
        let leftCircleCenterY = this.y + hypotenuse * Math.sin(degreesToRadians(-90 - 50.5 + this.angle));

        //point on furthest out of left circle
        let leftCircleFurthestX = leftCircleCenterX + radius * Math.cos(degreesToRadians(90 + 45 / 0.8 + this.angle));
        let leftCircleFurthestY = leftCircleCenterY + radius * Math.sin(degreesToRadians(90 + 45 / 0.8 + this.angle));

        //right circle center
        let rightCircleCenterX = this.x + hypotenuse * Math.cos(degreesToRadians(-90 + 50.5 + this.angle));
        let rightCircleCenterY = this.y + hypotenuse * Math.sin(degreesToRadians(-90 + 50.5 + this.angle));

        //point on furthest out of right circle
        let rightCircleFurthestX = rightCircleCenterX + radius * Math.cos(degreesToRadians(45 / 1.2 + this.angle));
        let rightCircleFurthestY = rightCircleCenterY + radius * Math.sin(degreesToRadians(45 / 1.2 + this.angle));

        //the point between the circles to fill up to
        let topHeartFillX = this.x + (radius * 0.75) * Math.cos(degreesToRadians(-90 + this.angle));
        let topHeartFillY = this.y + (radius * 0.75) * Math.sin(degreesToRadians(-90 + this.angle));

        //the bottommost point of the heart
        let bottomHeartFillX = this.x + (radius * 1.5) * Math.cos(degreesToRadians(90 + this.angle));
        let bottomHeartFillY = this.y + (radius * 1.5) * Math.sin(degreesToRadians(90 + this.angle));

        //draw it all out
        ctx.fillStyle = this.color;

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
}