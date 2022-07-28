//Initial game variables and values
let winning_score = 100
let player_1_score = 0
let player_2_score = 0

let play = false
let game_over = false

//set player names
let player_1 = "Player 1"
let player_2 = "Player 2"

let curr_player = player_1;

//Setting the Player 1(default) Name
function setFPlayerName(){
    if(play === false){
        player_1 = prompt("Enter name for Player 1")
        document.querySelector("#player_1_name").innerHTML = (player_1 === "")?"Player 1":player_1
        curr_player = player_1
    }
}

//Setting the Player 2(default) Name
function setSPlayerName(){
    if(play === false){
        player_2 = prompt("Enter name for Player 2")
        document.querySelector("#player_2_name").innerHTML = (player_2 === "")?"Player 2":player_2
    }
}

//Setting the winning score(default: 100)
function setWinningScore(){
    if(play === false){
        winning_score = prompt("Set the Winning Score")
        document.querySelector("#winning_score").innerHTML = "Winning Score: "+winning_score
    }
}

//Roll the dice on button click
let roll = document.getElementById("roll_btn")
roll.addEventListener('click',rollDice)

//Resets the game on button click
let reset = document.getElementById("reset_btn")
reset.addEventListener('click',resetGame)

//loads the dice images and selecting the image holders
let dice_img  = ["img/dice_1.png","img/dice_2.png","img/dice_3.png","img/dice_4.png","img/dice_5.png","img/dice_6.png",]
let dices = document.querySelectorAll(".dice_img");

//Handle the dice rolling functionality and the main game logic
function rollDice(){
    if(game_over === false){
        play = true
        dices.forEach(function(die) {
            die.classList.add("roll");
        });
        setTimeout(function(){
            dices.forEach(function(die){
                die.classList.remove("roll");
            })
        },800)
        
        let die_1 = Math.floor(Math.random()*6)
        let die_2 = Math.floor(Math.random()*6)
        document.querySelector("#dice_1").setAttribute("src",dice_img[die_1])
        document.querySelector("#dice_2").setAttribute("src",dice_img[die_2])
        let total_score = (die_1 + 1) + (die_2 + 1)
        console.log(player_1,player_2,curr_player)
        calculateScore(total_score)
        checkForWinner()
        curr_player = handleTurn(die_1,die_2)
    
    }
}


//Highlights the current player by changing the border colors
//Player who has the current turn will be notified in red
function highLightPlayer(num){
    if(num === 1){
        document.querySelector("#player_1").style.borderColor = "darkred"
        document.querySelector("#player_2").style.borderColor = "white"
    }
    if(num === 2){
        document.querySelector("#player_2").style.borderColor = "darkred"
        document.querySelector("#player_1").style.borderColor = "white"
    }
}

//Handle the turns
function handleTurn(die1_val,die2_val){

    if(curr_player === player_1){
        if(die1_val != die2_val){
            highLightPlayer(2)
            return player_2
        }else if((die1_val === 0 && die2_val === 0)){
            player_1_score = 0
            document.querySelector("#player_1_score").innerHTML = "SCORE: 0"+player_1_score
            highLightPlayer(2)
            return player_2
        }
        else{
            return player_1
        }
    }
    if(curr_player === player_2){
        if(die1_val != die2_val){
            highLightPlayer(1)
            return player_1
        }else if((die1_val === 0 && die2_val === 0)){
            player_2_score = 0
            document.querySelector("#player_2_score").innerHTML = "SCORE: 0"+player_2_score
            highLightPlayer(1)
            return player_1
        }
        else{
            return player_2
        }
    }
    
    
}

//Calculate and Update the score after each roll
function calculateScore(total_score){
    if(curr_player === player_1){
        player_1_score += total_score
        document.querySelector("#player_1_score").innerHTML = (player_1_score < 10)?("SCORE: 0"+player_1_score):("SCORE: "+player_1_score)
    }
    else if(curr_player === player_2){
        player_2_score += total_score
        document.querySelector("#player_2_score").innerHTML = (player_2_score < 10)?("SCORE: 0"+player_2_score):("SCORE: "+player_2_score)
    }

}

//Highlights the winner by changing the border colors
//Player who won will be notified in aqua
function highlightWinner(num){
    if(num === 1){
        document.querySelector("#player_1").style.borderColor = "aqua"
        document.querySelector("#player_2").style.borderColor = "white"
        const score = document.querySelector("#player_1_score")
        score.innerHTML = "WINNER"
        score.style.color = "aqua"
    }
    if(num === 2){
        document.querySelector("#player_2").style.borderColor = "aqua"
        document.querySelector("#player_1").style.borderColor = "white"
        const score = document.querySelector("#player_2_score")
        score.innerHTML = "WINNER"
        score.style.color = "aqua"
    }
}

//Check for winner
function checkForWinner(){
    if(player_1_score >= winning_score){
        highlightWinner(1)
        game_over = true
    }
    else if(player_2_score >= winning_score){
        highlightWinner(2)
        game_over = true
    }
}

//Reset the game
function resetGame(){
    location.reload()
}

