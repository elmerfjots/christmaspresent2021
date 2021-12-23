var textEntry;
var currentQuestion;
var questTextEntry;
var jsonObj = getUrlParameters();
var wrongAnswer = false;
var trueAnswer  = false;
class myScene extends Phaser.Scene {

    constructor (config)
    {
        super(config);
    }

    preload ()
    {
    
    }

    create () 
    {
        var cnt = 0;
        currentQuestion = jsonObj.questions[0];
        var pcEntry = this.add.text(10, 10, 'Hej '+jsonObj.name+ '!', { font: '24px Courier', fill: '#ffffff' }).setWordWrapWidth(1024);
        questTextEntry = this.add.text(10, 40, currentQuestion.q, { font: '24px Courier', fill: '#ffffff' }).setWordWrapWidth(1024);
        textEntry = this.add.text(10, 80, '', { font: '24px Courier', fill: '#ffff00' }).setWordWrapWidth(1024);
        
        var newInput = "";
        this.input.keyboard.on('keydown', function (event) {
            //console.log(event.keyCode)
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                //textEntry.text = textEntry.text.substr(0, textEntry.text.length - 1);
                newInput = textEntry.text.substr(0, textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
            {
                //textEntry.text += event.key;
                newInput += event.key;
            }
            else if (event.keyCode === 13){
                var input = textEntry.text;
                if(currentQuestion.a === input){
                    cnt++;
                    currentQuestion = jsonObj.questions[cnt];
                    questTextEntry.text = currentQuestion.q;
                    trueAnswer = true;
                }
                else{
                    questTextEntry.text = "Forkert!";
                    wrongAnswer = true;
                    
                }
                newInput = "";
            }
            textEntry.text = newInput;
        });
    }

    onEvent()
    {
        questTextEntry.text = currentQuestion.q;
    }

    update()
    {
        if(wrongAnswer){
           
            var timer = this.scene.scene.time.delayedCall(1500, this.onEvent, null, null);  // delay in ms
            wrongAnswer = false;
        }
        if(trueAnswer){
            questTextEntry.text = "Rigtigt!";
            var timer = this.scene.scene.time.delayedCall(1500, this.onEvent, null, null);  // delay in ms
            trueAnswer = false;
        }
    }
}
var config = {
type: Phaser.AUTO,
width: 1024,
height: 768,
// scene: {
//     preload: preload,
//     create: create,
//     update: update,
// }
};


var game = new Phaser.Game(config);
game.scene.add('myScene', myScene, true);

function validateInput(input)
{
switch(input) {
    case "4":
        return input +" er rigtig";
    case "y":
        // code block
        break;
    default:
        return "Jeg kender ikke til: "+input;
}
return input;
}
function getUrlParameters(){
    const queryString = window.location.search.substring(1);
    var jsonObj = null;
    if(queryString.length > 5){
        var decodedStringAtoB = atob(queryString);
        return JSON.parse(decodedStringAtoB);
    }
    return null;
}