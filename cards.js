// Incrementer Alpha: Card Collector
// Cookie Clicker Ripoff
// aka A Place to Start
// uses jquery

var VERSION = 0.01;
var DebugMode = false;

$(function() {
	Initialize();
});

var Player = {
    cards: 0,
    Tools: {},
    Upgrades: {},
	income: 0,
    wins: 0
}


// Income = function(){return 1 + 10 * Upgrades['players1']}

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
    Data.InitializeTools();
    Data.InitializeUpgrades();
    LoadGame();
    InitializeToolInterface();
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
   Notify("Game saved.");
   localStorage['player'] = btoa(JSON.stringify(Player));
}

function LoadGame() {
    if (!localStorage['player']){
        Notify("New game started. Hello, traveller!");
        return;
    }
    var saveData = JSON.parse(atob(localStorage['player']));
    Player = saveData;
    RefreshResources();
    Notify("Game Loaded. Welcome back, traveller.");
}

var saveCountdown = 30;
function Autosave(){
    if (saveCountdown <= 0){
        SaveGame();
        saveCountdown = 30;
    }
    else {
        saveCountdown--;
    }
}

