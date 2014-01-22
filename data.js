var Upgrade = function(){
    this.name = "An Upgrade";
    this.cost = 100;
    this.RevealCond = function(){return player.cards > 100};
    this.UnlockCond = function(){return player.cards > 1000};
    this.owned = false;
    this.revealed = false;
    this.unlocked = false;
    
}


var Upgrades = {
    player1: new Upgrade(),
    }