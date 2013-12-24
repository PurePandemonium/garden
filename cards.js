// Incrementer Alpha: Card Collector
// Cookie Clicker Ripoff
// aka A Place to Start
// uses jquery

var VERSION = 0.01;
$(function() {
	Initialize();
});


var Player = {
    cards: 0,
    Tools: {
        'player':{name:"Player", total:0, cost:10, income: 1, locked:true},
        'shark':{name:"Card Shark", total:0, cost:50, income: 4, locked:true},
        'club':{name:"Collector's Club", total:0, cost:100, income: 6, locked:true},
        'printer':{name:"Inkjet Printer", total:0, cost:500, income: 24, locked:true},
        'shop':{name:"Card Shop", total:0, cost:1000, income: 36, locked:true},
        'industrialprinter':{name:"Industrial Printer", total:0, cost:5000, income: 144, locked:true},
        'factory':{name:"Card Factory", total:0, cost:10000, income: 216, locked:true},
    },
	income: 0
}

function CollectCard(){
	Player.cards++;
	RefreshResources();
}

function BuyTool(toolname){
    var tool = Player.Tools[toolname];
	var price = Math.round(tool.cost);
    if (price <= Player.cards){
			Player.cards -= price;
			tool.total++;
			tool.cost *= 1.15;
			//tool.cost = Math.ceil(tool.cost);
			Player.income += tool.income;
			RefreshTool(toolname);
			RefreshResources();
			UnlockTools(toolname);
	}
}

function Initialize(){
    LoadGame();
	InitializeTools();
	RefreshResources();
	GameLoop();
}

var gameLoopInterval;
function GameLoop(){
	gameLoopInterval = setInterval(GameStep, 1000);
}

function GameStep(){
	Player.cards += Player.income;
	RefreshResources();
	if ((Player.Tools["player"].locked) && Player.cards >= 10){
		Player.Tools["player"].locked = false;
		Interface.Reveal("player");
	}
	CheckWin();
	Autosave();
}

function UnlockTools(tool){
	var Tool = Player.Tools[tool];
	for (var k in Player.Tools){
		if (Player.Tools[k].locked && Tool.cost * 1.5 > Player.Tools[k].cost){
			Player.Tools[k].locked = false;
			Interface.Reveal(k);
		}
	}
}

function CheckWin(){
	if (Player.income > 30000){
		alert("You win!");
		Player.cards = Infinity;
		Player.income = 0;
		clearInterval(gameLoopInterval);
		for (var k in Player.Tools){
			Player.Tools[k].locked = true;
			Interface.Hide(k);		
		}
		RefreshResources();		
	}

}

function SaveGame() {
   Notify("Game saved!");
   localStorage['player'] = btoa(JSON.stringify(Player));
}

function LoadGame() {
    if (!localStorage['player']) return;
    var saveData = JSON.parse(atob(localStorage['player']));
    Player = saveData;
    RefreshResources();
}

var saveCountdown = 30;
function Autosave(){
    if (saveCountdown <= 0){
        SaveGame();
        saveCountdown = 30;
        console.log("Game saved!");
    }
    else {
        saveCountdown--;
    }
}

