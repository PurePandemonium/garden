// Incrementer Alpha: Card Collector
// Cookie Clicker Ripoff
// aka A Place to Start
// uses jquery

var VERSION = 0.02;
var DebugMode = false;
var toolCostMultiplier = 1.15;

$(function() {
	Initialize();
});

var Player = {};

// Saveable game data goes in here
function Game(){
    this.version = 0;
    this.cards = 0;
    this.Tools = {};
    this.Upgrades = {};
	this.income = 0;
    this.wins = 0;
}


// Income = function(){return 1 + 10 * Upgrades['players1']}

function CollectCard(){
	Player.cards++;
	RefreshResources();
}

function BuyTool(tool_id){
    var pt = Player.Tools[tool_id];
    var dt = Data.Tools[tool_id];
	var price = Math.round(pt.curCost);
    if (price <= Player.cards){
			Player.cards -= price;
			pt.count++;
			pt.curCost *= 1.15;
            CalculateIncome();
			//Player.income += dt.Income();
			Interface.RefreshTools();
			RefreshResources();
			UnlockTools();
            UnlockUpgrades();
	}
}

function Initialize(){
    LoadGame();
    Data.InitializeUpgrades();
    Data.InitializeTools();
    InitializeToolInterface();
    Interface.InitializeUpgrades();
    Interface.InitializeTabs();
	RefreshResources();
    UnlockTools();
    UnlockUpgrades();
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
    Interface.CheckBuyables();
	CheckWin();
	Autosave();
}

function UnlockTools(){
	for (var k in Data.Tools){
        if (Data.Tools[k].CheckUnlockCond()){
            Player.Tools[k].locked = false;
            Interface.Reveal(k);
        }
	}
}

function UnlockUpgrades(){
    for (var id in Data.Upgrades){
        if (Data.Upgrades[id].CheckUnlockCond()){
            Player.Upgrades[id].locked = false;
            Interface.RevealUpgrade(id);
        }
	}
}

function CurrentCost(tool){
    var cost = Player.Tools[tool].count * Data.Tools[tool].cost ^ toolCostMultiplier;
    return cost;
}

function CalculateIncome() {
    var income = 0;
    for (var id in Player.Tools) {
        income += Data.Tools[id].Income() * Player.Tools[id].count;
    }
    Player.income = income;

}


function CheckWin(){
	if (Player.income > 3000000 && !Player.haswon){
        Player.haswon = true;
		alert("You win!");
        Notify("Congratulations, traveler! You won the game!");
		Player.cards = Infinity;
		Player.income = 0;
		clearInterval(gameLoopInterval);
		//for (var k in Player.Tools){
		//	Player.Tools[k].locked = true;
		//	Interface.Hide(k);		
		//}
		RefreshResources();		
	}
}

function SaveGame() {
    var saveData = new Game();
    for (var i in saveData){
        saveData[i] = Player[i];
    }
    Notify("Game saved.");
    localStorage['player'] = btoa(JSON.stringify(saveData));
}

function LoadGame() {
    if (!localStorage['player']){
        Notify("New game started. Hello, traveler!");
        Player = new Game();
        Player.version = VERSION;
        return;
    }
    
    var saveData = JSON.parse(atob(localStorage['player']));
    
    
    
    if (saveData.version == undefined) {
        Reset();
        Player.version = VERSION;
        Notify("New game started. Hello, traveler!");
        return;
    } 
    
    Player = new Game();
    for (var i in Player){
        Player[i] = saveData[i];
    }
    Notify("Game Loaded. Welcome back, traveler.");
}

var saveCountdown = 60;
function Autosave(){
    if (saveCountdown <= 0){
        SaveGame();
        saveCountdown = 60;
    }
    else {
        saveCountdown--;
    }
}

function HasAchievement(chievo){
    return true;
}

function Reset(prompt){
    if (!prompt || confirm("Erase all progress and start over?")){
        Player = new Game();
        RefreshResources();
        Data.InitializeUpgrades();
        Data.InitializeTools();
        Interface.RefreshTools();
        Interface.RefreshUpgrades();
    }
}