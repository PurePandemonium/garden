var Upgrade = function(){
    this.name = "An Upgrade";
    this.desc = "Words cannot describe this.";
    this.effectDesc = "The upgrade! It does nothing! (Probably)";
    this.cost = 100;
    this.RevealCond = function(){return Player.cards > 100}; 
    this.UnlockCond = function(){return Player.cards > 1000}; 
    this.owned = false;
    this.revealed = false; // Visible. Upgrades should be easier to make visible than to unlock.  
    this.unlocked = false; // Some condition other than cost to be able to buy it. 
    this.icon = "missing icon.png"
}


var Upgrades = {
}
    function InitializeUpgrades(){
    var u = new Upgrade();
    u.name = "Veteran Card Slinger";
    u.desc = "This all looks pretty familiar. +10 c/s for each Reset you've done.";
    u.cost = 500;
    u.RevealCond = function(){return true;};
    u.UnlockCond = function(){return HasAchievement('Legacy1')};
    
    Upgrades['veterancy'] = u;

}