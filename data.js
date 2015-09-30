var Data = {
    Tools: {},
    Upgrades: {}

}
//Static tool info
Data.Tool = function(Name, Identifier) {
    this.name = Name;
    this.id = Identifier;
    this.baseCost = 10;
    this.income = 1;
    this.CheckUnlockCond = function(){return DebugMode;};
    this.Income = function(){return this.income};
    
}

// Info about a tool that needs to be saved
Data.PlayerTool = function(Identifier) {
    this.id = Identifier;
    this.count = 0;
    this.curCost = Data.Tools[this.id].baseCost;
    this.locked = true;
}




Data.InitializeTools = function() {
    var t = new Data.Tool("Casual Player", 'player');
    t.baseCost = 10;
    t.income = 1;
    t.CheckUnlockCond = function(){return Player.cards > this.baseCost};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Card Shark", 'shark');
    t.baseCost = 50;
    t.income = 4;
    t.CheckUnlockCond = function(){return Player.Tools['player'].count >= 5};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Collector's Club", 'club');
    t.baseCost = 100;
    t.income = 6;
    t.CheckUnlockCond = function(){return Player.Tools['shark'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Inkjet Printer", 'printer');
    t.baseCost = 500;
    t.income = 24;
    t.CheckUnlockCond = function(){return Player.Tools['club'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Card Shop", 'shop');
    t.baseCost = 1000;
    t.income = 36;
    t.CheckUnlockCond = function(){return Player.Tools['printer'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Industrial Printer", 'big_printer');
    t.baseCost = 5000;
    t.income = 144;
    t.CheckUnlockCond = function(){return Player.Tools['shop'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Alchemist", 'alchemist');
    t.baseCost = 10000;
    t.income = 216;
    t.CheckUnlockCond = function(){return Player.Tools['big_printer'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Card Factory", 'factory');
    t.baseCost = 50000;
    t.income = 864;
    //t.Income = function(){return t.income + t.income * Player.Upgrades['factory_up1'].owned};
    t.CheckUnlockCond = function(){return Player.Tools['alchemist'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Wizard", 'wizard');
    t.baseCost = 100000;
    t.income = 1296;
    t.CheckUnlockCond = function(){return Player.Tools['factory'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
    t = new Data.Tool("Card Planet", 'earth');
    t.baseCost = 500000;
    t.income = 5184;
    t.CheckUnlockCond = function(){return Player.Tools['wizard'].count > 0};
    Data.Tools[t.id] = t;
    if(Player.Tools[t.id] == undefined) {
        Player.Tools[t.id] = new Data.PlayerTool(t.id);
    }
    
}

// Static upgrade info
Data.Upgrade = function(Name, Identifier) {
    this.name = Name;
    this.id = Identifier;
    this.desc = "Words cannot describe this.";
    this.desc_effect = "The upgrade! It does nothing! (Probably)";
    this.baseCost = 100;
    this.CheckRevealCond = function(){return Player.cards > 100}; 
    this.CheckUnlockCond = function(){return Player.cards > 1000};
    this.desc_unlock = "Unlocked when you have 1000 cards";
    this.EstProfit = function(){return 0};
    this.owned = false;
    this.revealed = false; // Visible. Upgrades should be easier to make visible than to unlock.  
    this.locked = true; // Some condition other than cost to be able to buy it. 
    this.icon = "missing icon.png"
}

Data.Upgrade.prototype.CalcEff = function() {
    return this.EstProfit / this.baseCost;
}

Data.Upgrade.prototype.toString = function() {
    return "Upgrade: " + this.name;
}

// Info about an upgrade that needs to be saved
Data.PlayerUpgrade = function(Identifier) {
    this.id = Identifier
    this.revealed = false;
    this.locked = true;
    this.owned = false;
    this.previousKnowledge = false; // Upgrades owned in a past life should be revealed
}

Data.InitializeUpgrades = function() {
    var u = new Data.Upgrade("Veteran Card Slinger", 'veterancy');
    u.desc = "This all looks pretty familiar.";
    u.desc_effect = " +10 c/s for each time you've won the game.";
    u.baseCost = 500;
    u.CheckRevealCond = function(){return HasAchievement('Legacy1')};
    u.CheckUnlockCond = function(){return HasAchievement('Legacy1')};
    u.EstProfit = function(){return 10 * Player.wins;};
    Data.Upgrades[u.id] = u;
    Player.Upgrades[u.id] = new Data.PlayerUpgrade(u.id);
    
    var u = new Data.Upgrade("Expanded Social Circle", 'players_reset_cost');
    u.desc = "It's fun to play with friends. Let's make more friends!";
    u.desc_effect = "Cost of Players is reset";
    u.CheckRevealCond = function(){return Player.Tools.player.total > 10};
    Data.Upgrades[u.id] = u;
    Player.Upgrades[u.id] = new Data.PlayerUpgrade(u.id);
    
    var u = new Data.Upgrade("Motivated Workers", 'factory_up1');
    u.desc = "Give them cookies and see how they go!";
    u.desc_effect = "Double base income of factories";
    u.CheckRevealCond = function(){return Player.Tools.factory.total > 10};
    Data.Upgrades[u.id] = u;
    Player.Upgrades[u.id] = new Data.PlayerUpgrade(u.id);
}

