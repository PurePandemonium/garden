var Data = {

//Static tool info
Tool: function(Name, Identifier) {
    this.name = Name;
    this.id = Identifier;
    this.cost = 10;
    this.income = 1;
    this.CheckUnlockCond = function(){return DebugMode;};
    this.Income = function(){return this.income};
    
},

// Info about a tool that needs to be saved
PlayerTool: function(Identifier) {
    this.id = Identifier;
    this.count = 0;
    this.unlocked = false;
},

InitializeTools: function() {
    var t = new Tool("Casual Player", 'player');
    t.cost = 10;
    t.income = 1;
    t.CheckUnlockCond = function(){return Player.cards > t.cost};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
    t = new Tool("Card Shark", 'shark');
    t.cost = 50;
    t.income = 4;
    t.CheckUnlockCond = function(){return Player.Tools['player'].count > 0};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
    t = new Tool("Collector's Club", 'club');
    t.cost = 100;
    t.income = 6;
    t.CheckUnlockCond = function(){return Player.Tools['shark'].count > 0};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
    t = new Tool("Inkjet Printer", 'printer');
    t.cost = 500;
    t.income = 24;
    t.CheckUnlockCond = function(){return Player.Tools['club'].count > 0};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
    t = new Tool("Card Shop", 'shop');
    t.cost = 1000;
    t.income = 36;
    t.CheckUnlockCond = function(){return Player.Tools['printer'].count > 0};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
    t = new Tool("Industrial Printer", 'big_printer');
    t.cost = 5000;
    t.income = 144;
    t.CheckUnlockCond = function(){return Player.Tools['shop'].count > 0};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
    t = new Tool("Card Factory", 'factory');
    t.cost = 10000;
    t.income = 216;
    t.CheckUnlockCond = function(){return Player.Tools['big_printer'].count > 0};
    Tools[t.id] = t;
    Player.Tools[t.id] = new PlayerTool(t.id);
    
},

// Static upgrade info
Upgrade: function(Name, Identifier) {
    this.name = Name;
    this.id = Identifier;
    this.desc = "Words cannot describe this.";
    this.desc_effect = "The upgrade! It does nothing! (Probably)";
    this.cost = 100;
    this.CheckRevealCond = function(){return Player.cards > 100}; 
    this.CheckUnlockCond = function(){return Player.cards > 1000};
    this.desc_unlock = "Unlocked when you have 1000 cards";
    this.EstProfit = function(){return 0};
    this.owned = false;
    this.revealed = false; // Visible. Upgrades should be easier to make visible than to unlock.  
    this.unlocked = false; // Some condition other than cost to be able to buy it. 
    this.icon = "missing icon.png"
},

Upgrade.prototype.CalcEff: function() {
    return this.EstProfit / this.cost;
},

Upgrade.prototype.toString: function() {
    return "Upgrade: " + this.name;
},

// Info about an upgrade that needs to be saved
PlayerUpgrade: function(Identifier) {
    this.id = Identifier
    this.revealed = false;
    this.unlocked = false;
    this.owned = false;
},

InitializeUpgrades: function() {
    var u = new Upgrade("Veteran Card Slinger", 'veterancy');
    u.desc = "This all looks pretty familiar.";
    u.desc_effect = " +10 c/s for each time you've won the game.";
    u.cost = 500;
    u.CheckRevealCond = function(){return HasAchievement('Legacy1')};
    u.CheckUnlockCond = function(){return HasAchievement('Legacy1')};
    u.EstProfit = function(){return 10 * Player.wins;};
    Upgrades[u.id] = u;
    Player.Upgrades[u.id] = new PlayerUpgrade(u.id);
    
    var u = new Upgrade("Expanded Social Circle", 'players_reset_cost');
    u.desc = "It's fun to play with friends. Let's make more friends!";
    u.desc_effect = "Cost of Players is reset";
    u.CheckRevealCond = function(){return Player.Tools.player.total > 10};
    Upgrades[u.id] = u;
    Player.Upgrades[u.id] = new PlayerUpgrade(u.id);
},

}