function getImage(){
    playerImg = new Image();
    playerImg.src = "assets/people.png";

    e1Img = new Image();
    e1Img.src = "assets/hand.png";
    
    e2Img = new Image();
    e2Img.src = "assets/coronavirus.png";
    
    e3Img = new Image();
    e3Img.src = "assets/covid-19.png";

    homeImg = new Image();
    homeImg.src = "assets/real-estate.png";
}
function init(){
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext("2d");

    score=0;
    game_over=false;
    W = 700;
    H = 400;

    canvas.width = W;
    canvas.height = H;

    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        image: playerImg,
        moving: false,
    };

    e1={
        x:150,
        y:50,
        w:60,
        h:60,
        speed:20,
        image: e1Img,
    };
    e2={
        x:W-75,
        y:20,
        w:60,
        h:60,
        speed_x:-20,
        speed_y:30,
        image: e2Img,
    };
    e3={
        x:450,
        y:20,
        w:60,
        h:60,
        speed:40,
        image: e3Img,
    };
    enemies=[e1,e2,e3];
    home={
        x:W-60,
        y:H/2,
        w:60,
        h:60,
        image: homeImg,
    };

    canvas.addEventListener('mousedown',function(){
		console.log("Your pressed the mouse");
		player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("You released the mouse");
        player.moving = false;
    })
}
function draw(){
    pen.clearRect(0,0,W,H);
    pen.drawImage(player.image,player.x,player.y,player.w,player.h);

    for(let i=0;i<enemies.length;i++){
        pen.drawImage(enemies[i].image,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h);
    }

    pen.drawImage(home.image,home.x,home.y,home.w,home.h);

    pen.fillStyle="white";
    pen.fillText("Score "+score,10,10);
}
function hasCollided(p1,p2){
    if(Math.abs(p1.x-p2.x)<=p1.w && Math.abs(p1.y-p2.y)<=p1.h){
        return true;
    }
    return false;
}
function update(){
    if(player.moving==true){
        player.x+=player.speed;
        score+=20;
    }
    
    for(let i=0;i<enemies.length;i++){
        if(i==1){
            enemies[i].x+=enemies[i].speed_x;
            enemies[i].y+=enemies[i].speed_y;
            if(enemies[i].y>H-enemies[i].h){
                enemies[i].speed_y*=-1;
            }
            if(enemies[i].y<0){
                enemies[i].speed_x*=-1;
                enemies[i].speed_y*=-1;
            }
        }
        else{
            enemies[i].y+=enemies[i].speed;
            if(enemies[i].y<0 || enemies[i].y>H-enemies[i].h){
                enemies[i].speed*=-1;
            }
        }
    }

    for(let i=0;i<enemies.length;i++){
        if(hasCollided(player,enemies[i])){
            score-=(i+1)*25;
        }
    }

    if(hasCollided(player,home) || score<0){
        game_over=true;
    }
}

function gameloop(){
    if(game_over==true){
        clearInterval(g);
        alert("Score: "+score+" Maintain Social Distancing! Stay Home, Stay Safe!");
    }
    draw();
    update();
}

getImage();
init();
g=setInterval(gameloop,100);
