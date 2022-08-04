
let buttonLeft;
let buttonRight;
let buttonMiddle;
let imgLeft;

let canonDirection = 90;
let canonX = 0;
let canonY = 100;
let projIsShooting = false;
let projLifeTime = 0;
let projLifeTimeMax = 500
let projsize = 15;
let projX;
let projY;
let projSpeedX; 
let projSpeedY;
let speedDirectionX;
let speedDirectionY;
let projSpeedMulti = 3;
let targetX;
let targetY;
let targetwidth;
let targetheight;
let wallheight;
let hit = false;
let bouncemultiplier = 1;
let score = 0;
let highscore = 0;

let life = 3;
let gamewidth;

let startpage = true;
let gameover = false;
let ingame = false;

let infotextsize = gamewidth/30;

//------------------------------------------------


//--------------------------------------------------------------------------
function preload() {
    imageLeft = loadImage('assets/ButtonLeftNew.png');
    imageRight = loadImage('assets/ButtonRightNew.png');
    imageFire = loadImage('assets/ButtonFireNew.png');
    imageBackground = loadImage('assets/Sketches2.png');
    imageBackgroundDark = loadImage('assets/Sketchesdark.png');
    imageCanon = loadImage('assets/Canon.png');
    imageBullet = loadImage('assets/Bullet.png');
    imageTarget = loadImage('assets/Target.png');
    imageGameOver = loadImage('assets/GameOver.png');
    imageHeartEmpty = loadImage('assets/heart empty.png');
    imageHeartFull = loadImage('assets/heart full.png');
    
}

function setup(){
    rectMode(CENTER);
    textAlign(CENTER);
    imageMode(CENTER);
    colorMode(RGB, 255, 255, 255, 1);
    textFont('verdana');

    
    let canvas = createCanvas(window.innerWidth, window.innerHeight-7);
    if(width > height){
        gamewidth = height;
    }else if(width < height){
        gamewidth = width;
    }
    projX = width/2;
    projY = height-100;
    projSpeedX = 5;
    projSpeedY = 5;
    wallheight = 75;
    const image1 = imgLeft;
    
    newTarget()

};
//--------------------------------------------------------------------------    
function draw(){
    background(50);
    imageMode(CORNERS);
    image(imageBackground, (width/2)-(gamewidth/2),0,(width/2)+(gamewidth/2),height)
    imageMode(CENTER);
    if ((localStorage.getItem('highscore')) == null){
        localStorage.setItem("highscore", 0)
    }

    if (startpage == true && ingame == false && gameover == false){
        drawstartpage();
    }else if (startpage == false && ingame == false && gameover == true){
        drawgameoverpage()
    }else if(startpage == false && ingame == true && gameover == false){

    if (projIsShooting == true){
        drawProj();
    }else{
    
    }

    //canon
    stroke(255);
    strokeWeight(20);
    drawLine(canonDirection);
    fill(150);
    noStroke();
    imageMode(CENTER);
    image(imageCanon, width/2, height-100, height/5, height/5 )

    
    //taskbar
    fill(30,60,70);
    rect(width/2, height, width, 200);
    //Wall
    rectMode(CORNER);
    rect(0, 0, width, wallheight);
    rectMode(CENTER);

    //Wall L R
    if(width>height){
    imageMode(CORNERS);
    image(imageBackgroundDark, width/2-gamewidth/2-height*1.5,0,width/2-gamewidth/2,height);
    image(imageBackgroundDark, width/2+gamewidth/2,0,width/2+gamewidth/2+height*1.5,height);
    imageMode(CENTER);
    }

    //Target;
    imageMode(CORNER)
    fill(200);
    image(imageTarget,targetX, targetY, targetwidth+10, targetheight+10)
    imageMode(CENTER);

    //number
    textSize(height/30);
    fill(0,250,255)
    text((round(canonDirection)) , width/2, height-108);

    //buttons
    fill(30)
    ellipse(width/2 - 100, height-35, 85, 60)
    ellipse(width/2 + 100, height-35, 85, 60)
    ellipse(width/2, height-35, 85, 50)
    image(imageFire, width/2, height-60, 90, 90);
    image(imageRight,width/2 + 100, height-50, 80, 80);
    image(imageLeft, width/2 - 100, height-50, 80, 80);

    //scoreboard
    textAlign(CENTER);
    textSize(height/40);
    fill(255);
    textStyle(BOLD);
    text("score | "+ score +"       highscore | "+ localStorage.getItem('highscore') ,width/2, 0+30 );
    textStyle(NORMAL);
    textAlign(CENTER);
    fill(30,20,20)
    rect(width/2, 0+70, 160, 55, 8)
    fill(60,35,35)
    rect(width/2, 0+65, 160, 55, 8)
    if(life == 3){
        image(imageHeartFull, width/2-50, 0+65, 50, 50)
        image(imageHeartFull, width/2, 0+65, 50, 50)
        image(imageHeartFull, width/2+50, 0+65, 50, 50)
    }else if(life == 2){
        image(imageHeartFull, width/2-50, 0+65, 50, 50)
        image(imageHeartFull, width/2, 0+65, 50, 50)
        image(imageHeartEmpty, width/2+50, 0+65, 50, 50)
    }else if(life == 1){
        image(imageHeartFull, width/2-50, 0+65, 50, 50)
        image(imageHeartEmpty, width/2, 0+65, 50, 50)
        image(imageHeartEmpty, width/2+50, 0+65, 50, 50)
    }

    


    if (keyIsDown(UP_ARROW)) {
        if (projIsShooting == false){
            
         
            const rad = (canonDirection+180)/180* Math.PI

            speedDirectionX = width/2 + 5 * Math.cos(rad);
            speedDirectionY = height-100 + 5 * Math.sin(rad);
            if (canonDirection <= 90){
                projSpeedX = speedDirectionX - width/2;
                projSpeedY = (height-100) - speedDirectionY;
            } else if (canonDirection >= 90){
                projSpeedX = speedDirectionX - width/2;
                projSpeedY = (height-100) - speedDirectionY;
            }


            projIsShooting = true;
        }
    }

    if (keyIsDown(LEFT_ARROW)) {
        if (canonDirection > 30.5)
        canonDirection -= 0.3;
    }
      
    if (keyIsDown(RIGHT_ARROW)) {
        if (canonDirection < 149.6)
        canonDirection += 0.3;
    }

    const buC = width/2;
    const buH = height-50;

    if (projIsShooting == false && 
        mouseIsPressed == true &&
        mouseX >= buC - 40 &&
        mouseX <= buC + 40 &&
        mouseY >= buH - 40 &&
        mouseY <= buH + 40)
        {   
            const rad = (canonDirection+180)/180* Math.PI

            speedDirectionX = width/2 + 5 * Math.cos(rad);
            speedDirectionY = height-100 + 5 * Math.sin(rad);
            if (canonDirection <= 90){
                projSpeedX = speedDirectionX - width/2;
                projSpeedY = (height-100) - speedDirectionY;
            } else if (canonDirection >= 90){
                projSpeedX = speedDirectionX - width/2;
                projSpeedY = (height-100) - speedDirectionY;
            }


            projIsShooting = true;
        }

    if (canonDirection > 30.5 &&
        mouseIsPressed == true && 
        mouseX >= buC - 40 -100 &&
        mouseX <= buC + 40 -100 &&
        mouseY >= buH - 40 &&
        mouseY <= buH + 40)
        {
        canonDirection -= 0.3;
        }

    if (canonDirection < 149.6 &&
        mouseIsPressed == true && 
        mouseX >= buC - 40 +100 &&
        mouseX <= buC + 40 +100 &&
        mouseY >= buH - 40 &&
        mouseY <= buH + 40)
        {
        canonDirection += 0.3;
        }   
    }
}
//--------------------------------------------------------------------------

function drawstartpage(){
      if(width>height){
        imageMode(CORNERS);
        image(imageBackgroundDark, width/2-gamewidth/2-height*1.5,0,width/2-gamewidth/2,height);
        image(imageBackgroundDark, width/2+gamewidth/2,0,width/2+gamewidth/2+height*1.5,height);
        imageMode(CENTER);
        }

    fill(255,255,255, 0.6)
    rect(width/2,height/2,gamewidth,height)
    fill(30)
    ellipse(width/2 - 100, height-200, 85, 60)
    ellipse(width/2 + 100, height-200, 85, 60)
    ellipse(width/2, height-200, 100, 70)
    image(imageFire, width/2, height-220, 100, 100);
    image(imageRight,width/2 + 100, height-215, 80, 80);
    image(imageLeft, width/2 - 100, height-215, 80, 80);
    
    const informationtext = "Shoot the target on top, but make it tricky.                        More bounces means more Points!"
    textAlign(CORNER)
    fill(0,0,0,1)
    textSize(55)
    textStyle(BOLD);
    text("HOW TO", width/2, height/2.5, 300, height/2);
    textStyle(NORMAL);
    textSize(20);
    text(informationtext, width/2, height/2, 300, height/2);
    text("Use the Arrowkeys or Buttons LEFT / RIGHT to aim.  And the key UP or the middle Button to shoot.                       don't hit yourself!", width/2, height-250, 300, height/2);
    text("Press to start", width/1.6, height, 300, 250);
    
     if(mouseIsPressed == true || keyIsPressed == true){
        gameover = false;
        ingame = true;
        startpage = false;
    } 
}

function drawgameoverpage(){
    if(width>height){
        imageMode(CORNERS);
        image(imageBackgroundDark, width/2-gamewidth/2-height*1.5,0,width/2-gamewidth/2,height);
        image(imageBackgroundDark, width/2+gamewidth/2,0,width/2+gamewidth/2+height*1.5,height);
        imageMode(CENTER);
        }
    image(imageGameOver, width/2,height/4, gamewidth/2+150, gamewidth/2)
    image(imageHeartEmpty, width/2, height/1.8, gamewidth/5, gamewidth/5)
    image(imageHeartEmpty, width/2 - gamewidth/5, height/1.8, gamewidth/5, gamewidth/5)
    image(imageHeartEmpty, width/2 + gamewidth/5, height/1.8, gamewidth/5, gamewidth/5)

    rectMode(CENTER);
    noStroke()
    fill(255)
    textStyle(BOLD)
    textSize(gamewidth/20)
    text("Highscore  " + localStorage.getItem('highscore') , width/2, height/1.35)
    textStyle(NORMAL)
    fill(20,20,20)
    rect(width/2, height-100, gamewidth-100, 100, 30);
    textSize(gamewidth/15)
    fill(150,50,50)
    text("RETRY", width/2, height-85)

    if(mouseIsPressed == true &&
        mouseX >= width/2 - (gamewidth-100) &&
        mouseX <= width/2 + (gamewidth-100) &&
        mouseY >= height-100 - 100 &&
        mouseY <= height-100 + 100){
            score = 0;
            life = 3;
            gameover = false;
            ingame = true;
            startpage = false;

        }

}

function drawLine(angle){
    
    const rad = (angle+180)/180* Math.PI

    let x0 = width/2;
    let y0 = height-100;

    let x1 = width/2 + height/9 * Math.cos(rad);
    let y1 = height-100 + height/9 * Math.sin(rad);
    stroke(30,30,60)
    line(x0,y0,x1,y1);
}


function drawProj() {
    imageMode(CENTER);
    image(imageBullet,projX,projY,projsize, projsize)
    fill(255,255,255,0.5);
    circle(projX, projY, projsize);
    projX = projX + (projSpeedX * projSpeedMulti);
    projY = projY - (projSpeedY * projSpeedMulti);
    if (projX + projsize/2 >= (width/2+gamewidth/2) || projX - projsize/2 <= (width/2-gamewidth/2)){
        projSpeedX = projSpeedX * -1;
        bouncemultiplier +=1;
    }
    if (projY + projsize/2 >= height-100 || projY - projsize/2 <= wallheight){
        projSpeedY = projSpeedY * -1;
        bouncemultiplier +=1;
    }

    if (projX + projsize/2 >= width/2-((height/6)/2) && projX -projsize/2 <= width/2+((height/6)/2) &&
        projY -projsize/2 >= (height-100)-(height/6)/2 && projY -projsize/2 <= height-100 && bouncemultiplier > 1) {
            projLifeTime = projLifeTimeMax;
        }

    if (projX + projsize/2 >= targetX && projX -projsize/2 <= targetX + targetwidth &&
        projY -projsize/2 >= targetY && projY -projsize/2 <= targetY + targetheight) {
            hit = true;
            projLifeTime = projLifeTimeMax;
        }
    

    projLifeTime ++;

    if (projLifeTime >= projLifeTimeMax){
        if (hit == true){
            score += 2 * bouncemultiplier;
            hit = false;
            if (score > localStorage.getItem("highscore")) {
                localStorage.setItem("highscore", score);
              }
        } else if(hit == false){
            life -= 1;
            if(life == 0){
                gameover = true;
                ingame = false;
                startpage = false;
            }
        }
        bouncemultiplier = 1;
        projX = width/2;
        projY = height-100;
        projLifeTime = 0;
        projIsShooting = false;
        newTarget() 
    }
}
function newTarget() {
    targetwidth = height/20;
    targetheight = height/20;
    targetX = random((width/2)-(gamewidth/2), (width/2)+(gamewidth/2)-targetwidth)
    targetY = wallheight;
}


