let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("Game is started");
        started = true;
        
        levelUp();
    }
})

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function userClick(btn){
    btn.classList.add("userClick");
    setTimeout(function(){
        btn.classList.remove("userClick");
    }, 150);

    userSeq.push(btn);
    // console.dir(userSeq);

    checkAns(userSeq.length - 1);
}

function checkAns(idx){
    // let idx = level-1; // this idx value was fixed
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length){
            // levelUp();
            setTimeout(levelUp, 1000);
        }
        console.log("Correct");
    } else{
        console.log("Game Over! Press any key to Restart");
        h2.innerText = `Game Over! Your highest score is ${level}. Press any key to Restart`;

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);

        reset();
    }
}

function levelUp(){
    userSeq = [];
    
    level++;
    h2.innerText = `Level ${level}`;

    let randInd = Math.floor(Math.random() * 3);
    let randCol = btns[randInd];
    let randColor = document.querySelector(`.${randCol}`);
    btnFlash(randColor);

    gameSeq.push(randColor);
    // console.dir(gameSeq);
}

function userFlash(){
    console.log(this);
    userClick(this);
}

let buttons = document.querySelectorAll(".button");
for(btn of buttons){
    btn.addEventListener("click", userFlash);
}

function reset(){
    started = false;
    level = 0;

    gameSeq = [];
    userSeq = [];
}
