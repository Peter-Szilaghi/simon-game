let colors = ["green", "red", "yellow", "blue"]; //buttons color for class, random number and audio 
let game = []; //save Random Numbers; 
let clickCount = 0;
let startGame = false;

function randomNum() {

    let num = Math.round( Math.random() * 3 ); //Random Number
    let colorNum = colors[num]; //Colors for Random Number

    playSound(colorNum);
    buttonAnimation(`#${ colorNum }`, "pressed");
    game.push( colorNum ); //Add Random Number to array

    $("h1").text( `Level ${ game.length }` );
}

$(document).click( ()=> { //PlayAgain
    if (!startGame) {
        randomNum();
        startGame = true;
    }
});

$("[type = button]").click( function() { 
    let curentClick = $(this).attr("id");
    buttonAnimation(this, "pressed");

    if ( $(this).is( `#${ game[ clickCount ] }` ) ) { //Verify colors

        playSound(curentClick);
        if ( clickCount === game.length - 1 ) { //If all true go to next Lvl
            setTimeout(() => {
                randomNum();
            }, 500);
            clickCount = 0;
        } else { //If true click the next color
            clickCount++;
        }
                
    } else { //IF not match the colors, Restart pressing any key
        $("h1").text("Game Over, Click/Tap to Restart");
        playSound("wrong");
        buttonAnimation("body", "red");
        ResetGame();
    }

} );


function playSound(sound){
    new Audio( `sounds/${sound}.mp3` ).play();
}

function buttonAnimation(e, anim){
    $(e).addClass(anim); 
    setTimeout(() => { 
        $(e).removeClass(anim);
    }, 100);
}

function ResetGame(){
    game = [];
    clickCount = 0;
    startGame = false;
}
