var textEntry;
var currentQuestion;
var questTextEntry;
var jsonObj = getUrlParameters();
var wrongAnswer = false;
var trueAnswer  = false;
var done = false;
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
        var message = this.add.text(10, 10, 'Hej '+jsonObj.name+ '! Glædelig jul! Du skal svare på nogle spørgsmål inden du får din gave', { font: '24px Courier', fill: '#ffffff' }).setWordWrapWidth(1024);
        questTextEntry = this.add.text(10, 80, currentQuestion.q, { font: '24px Courier', fill: '#ffffff' }).setWordWrapWidth(1024);
        textEntry = this.add.text(10, 120, '', { font: '24px Courier', fill: '#ffff00' }).setWordWrapWidth(1024);
        
        var newInput = "";
        
        this.input.keyboard.on('keydown', function (event) {
            if(done ===false){
                if (event.keyCode === 8 && textEntry.text.length > 0)
                {
                    newInput = textEntry.text.substr(0, textEntry.text.length - 1);
                }
                else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
                {
                    newInput += event.key;
                }
                else if (event.keyCode === 13){
                    var input = textEntry.text.trim();
                    if(currentQuestion.a === input){
                        cnt++;
                        if(cnt === jsonObj.questions.length){
                            done = true;
                            questTextEntry.text = "";
                            textEntry.text = "";
                            message.text = "Fedt! Du kom igennem!!!\nDu skal sende følgende kode ["+jsonObj.kode+ "] som sms, eller på discord til jeres onkel";
                            return;
                        }
                        currentQuestion = jsonObj.questions[cnt];
                        questTextEntry.text = currentQuestion.q;
                        trueAnswer = true;
                    }
                    else{ wrongAnswer = true; }
                    newInput = "";
                }
                textEntry.text = newInput;
            }
        });
    }

    onEvent()
    {
        questTextEntry.text = currentQuestion.q;
    }

    update()
    {
        if(wrongAnswer){
            questTextEntry.text = "Forkert!";
            var timer = this.scene.scene.time.delayedCall(1500, this.onEvent, null, null);  // delay in ms
            wrongAnswer = false;
        }
        if(trueAnswer){
            questTextEntry.text = "Rigtigt!";
            var timer = this.scene.scene.time.delayedCall(1500, this.onEvent, null, null);  // delay in ms
            trueAnswer = false;
        }
        if(done){
            //console.log("done");
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