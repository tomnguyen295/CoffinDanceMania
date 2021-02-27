var GameOn, lives, score, xPos;
var line1_x, line1_y, line1_length;
var line2_x, line2_y, line2_length;
var enemySpeed1, enemySpeed2
var leftCart, rightCart

var deadX, deadY

let GameState = 0;

function preload() {
    mainCoffin = loadSound("soundtrack/coffinDance8bit.mp3")
    sadCoffin = loadSound("soundtrack/sadCoffin.mp3")
    point = loadSound("soundtrack/pointSound1.mp3")
    lost = loadSound("soundtrack/lostLifeSound.mp3")
}

function locateCanvas(cnv) {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x=x);
}

function setup(){
    xPos=0
    score=0
    lives=5
    GameOn=true
    deadX = 0
    deadY = 0

    line1_y = -300
    line1_x = random(5, 575)
    line1_length = random(20, 320);
    
    line2_y = -300;
    line2_x = random(5, 575)
    line2_length = random(20, 320);
    enemySpeed1 = 1
    enemySpeed2 = 1

    
}
function draw(){
    
    if (GameOn) {
        GameState = 0
        if (!mainCoffin.isPlaying() && GameState == 0) {
            mainCoffin.play();
        }
        var spacing = 0;
        var cnv = createCanvas(580, 400);
        locateCanvas(cnv);
        background(167, 251, 252);
        noStroke();
        fill (255, 216, 138);
        rect (0, 300, width, 150);
        
        textSize(30);
        fill(242, 255, 0) 
        text("LIVES: ", 5, 30)

        textSize(30);
        fill(242, 255, 0) 
        text("SCORE: " + score, 420, 30)

        for (var i = 0; i < lives; i++) {
            noStroke();
            fill(255);
            ellipse(120 + spacing, 20, 20, 20);
            spacing += 25;
        }

        fill (255)
        triangle(10, 250, 50, 200, 90, 250)
        triangle(130, 250, 170, 200, 210, 250)
        triangle(250, 250, 290, 200, 330, 250)
        triangle(370, 250, 410, 200, 450, 250)
        triangle(490, 250, 530, 200, 570, 250)

        fill(26, 140, 3)
        triangle(0,200,0,50,40,200)
        triangle(160,200,110,50,60,200)
        triangle(280,200,230,50,180,200)
        triangle(400,200,350,50,300,200)
        triangle(520,200,470,50,420,200)
        triangle(580,200,580,50,540,200)

        fill(56, 36, 4)
        rect(0,200,5,100)
        rect(100,200,20,100)
        rect(220,200,20,100)
        rect(340,200,20,100)
        rect(460,200,20,100)
        rect(575,200,5,100)

        stroke(100)
        line(30,250,30,300)
        line(70,250,70,300)
        line(150,250,150,300)
        line(190,250,190,300)
        line(270,250,270,300)
        line(310,250,310,300)
        line(390,250,390,300)
        line(430,250,430,300)
        line(510,250,510,300)
        line(550,250,550,300)
        noStroke()
        fill (69, 46, 0)
        circle(270+xPos,300,20)
        circle(290+xPos,300,20)
        circle(310+xPos,300,20)
        circle(330+xPos,300,20)
        fill(235, 175, 84)
        rect(250+xPos,260,100,30)

        leftCart = 250+xPos
        rightCart = leftCart + 100

        stroke(0);
        strokeWeight(4);
        
        line(line1_x, line1_y, line1_x, line1_y + line1_length);
        line(line2_x, line2_y, line2_x, line2_y + line2_length);
        
        line1_y += enemySpeed1;
        line2_y += enemySpeed2;
        
        
        if (keyIsPressed && (keyCode ==LEFT_ARROW || key=="a")){
            xPos -= 5
        }
        if (keyIsPressed && (keyCode ==RIGHT_ARROW || key=="d")){
            xPos += 5
        }
        if (line1_y+line1_length > 260 && line1_y < 310) {
            if (line1_x > leftCart && line1_x < rightCart) {
                point.play();
                score += 1
                line1_y = -300
                line1_x = random(5, 575)
                line1_length = random(20, 320);
                enemySpeed1 += .125
   

            }
        } 
        if (line2_y+line2_length > 260 && line2_y < 310) {
            if (line2_x > leftCart && line2_x < rightCart) {
                point.play();
                score += 1
                line2_y = -300;
                line2_x = random(5, 575)
                line2_length = random(20, 320);
                enemySpeed2 += .125
            }
        } 

        if (xPos < -350) {
            xPos = 330;
        }
        if (xPos > 330) {
            xPos = -350;
        }

        if (line1_y > 400) {
            lost.play();
            line1_y = -300
            line1_x = random(5, 575)
            line1_length = random(20, 320);
            lives -=1;
            enemySpeed2 +- .125
        }

        if (line2_y > 400) {
            lost.play()
            line2_y = -300;
            line2_x = random(5, 575)
            line2_length = random(20, 320);
            enemySpeed2 += .125
            lives -= 1;
        }
       
        if (lives<=0) {
            GameOn = false;
            deadX = 0;
            deadY = 0;
            GameState = 1;
            mainCoffin.stop();
        }
    }
    else {

        if (!sadCoffin.isPlaying() && GameState == 1) {
            sadCoffin.play();
        }
        var cnv = createCanvas(580, 400);
        locateCanvas(cnv);
        background(0);
        textSize(25);
        fill(242, 255, 0) 
        text("YOU ARE DEAD. GET IN THE COFFIN TO \nRESTART THE GAME.", 5, 30)
        
        noStroke();
        
        fill(69, 46, 0)
        circle(145, 100, 60)
        circle(435, 100, 60)
        circle(145, 300, 60)
        circle(435, 300, 60)

        fill(235, 175, 84)
        rect(145, 100, 290, 200)
        stroke("black");
        fill("crimson"); 
        text("Final Score: " + score, 210, 130)
        
        stroke("white");
        fill(0);
        rect(155,150,270, 100);

        stroke("white")
        fill(244,56,90)
        rect(265,175,50,50)

        stroke("black")
        textSize(16);
        text("GET IN THE SQUARE", 210,270)

        fill(0, 255, 238)
        ellipse(30+deadX, 350+deadY, 20)

        circleX = 30+deadX;
        circleY = 350+deadY;


        var widt;
        widt = 210;
        stroke("rgb(255,0,0)")

        line(170,215,200,180)
        line(200,215,170,180)

        line(170+widt,215,200+widt,180)
        line(200+widt,215,170+widt,180)

        
        stroke("yellow");
        strokeWeight(5);

        line(20+deadX,340+deadY,40+deadX,340+deadY)

        

        if (keyIsPressed && (keyCode ==LEFT_ARROW || key=="a")){
            deadX -= 5
        }
        if (keyIsPressed && (keyCode ==RIGHT_ARROW || key=="d")){
            deadX += 5
        }
        if (keyIsPressed && (keyCode ==UP_ARROW || key=="w")){
            deadY -= 5
        }
        if (keyIsPressed && (keyCode ==DOWN_ARROW || key=="s")){
            deadY += 5
        }
        if (circleX > 265 && circleX < 315 && circleY > 175 && circleY < 215) {
            sadCoffin.stop()
            setup()
        }

        
        
    }

}