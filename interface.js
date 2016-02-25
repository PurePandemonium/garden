function InitializeToolInterface(){
    
	for (var id in Data.Tools){
        var Tool = Data.Tools[id];
		var $toolBox = $('<div>')
			.addClass('toolBox')
			.attr('id','toolBox_' + id)
			.text(Tool.name + " ");
		
        
        $toolBox.addClass('hidden');
        
        
		var $buyButton = $('<button>')
			.addClass('toolBtn')
			
			.attr('id', 'toolBtn_' + id)
			.attr('onClick',"BuyTool('" + id + "')")
			.text("Buy");
				
		var $toolPrice = $('<span>')
			.addClass('price')
			.attr('id','cost_' + id);
			
			
		var $toolTotal = $('<span>')
			.addClass('toolTotal')
			.attr('id','total_' + id);
		
		var $toolIncome = $('<div>')
			.addClass('toolIncome')
			.attr('id','income_per_' + id);
		
		var $totalIncome = $('<div>')
			.attr('id','total_income_' + id);
		$buyButton.append($toolPrice);
		
		$toolBox.append($buyButton, $toolTotal, $toolIncome, $totalIncome);
		
		$toolBox.appendTo('#tools');
		RefreshTool(id);
    }
}

function RefreshTool(tool_id){
	var Tool = Player.Tools[tool_id];
	$("#cost_"+tool_id).text(" (" + Math.round(Tool.curCost) + " cards)");
	$("#total_"+tool_id).text("Count: " + Tool.count);
	$("#income_per_" + tool_id).text("Each Produces: " + Data.Tools[tool_id].Income() + " C/s");
	$("#total_income_" + tool_id).text("Income: " + Data.Tools[tool_id].Income() * Tool.count + " C/s");
    if (Tool.revealed){
        Interface.Reveal(tool_id);
    }
}

function RefreshResources(){
	$("#stat_cards").text(Player.cards + " Cards");
	$("#stat_income").text("Total Income: " + Player.income + " C/s");
}



function Round(number){
	return Math.round(number);
}

var Interface = {
	Reveal: function(tool_id){
        $("#toolBox_" + tool_id).fadeIn();
		//$("#toolBox_" + tool_id).removeClass("hidden");
	},
	
	Hide: function(tool_id){
        $("#toolBox_" + tool_id).fadeOut();
		//$("#toolBox_" + tool_id).addClass("hidden");
	},
    
    RevealUpgrade: function(upgrade_id){
        $("#upgradeBox_" + upgrade_id).fadeIn();
        // $("#upgradeBox_" + upgrade_id).removeClass("hidden");
    },
    
    HideUpgrade: function(upgrade_id){
        $("#upgradeBox_" + upgrade_id).fadeOut();
        //$("#upgradeBox_" + upgrade_id).addClass("hidden");
    },
    
    InitializeUpgrades: function(){
        for (var id in Data.Upgrades) {
            var u = Data.Upgrades[id];
            var $upgradeBox = $('<div>')
			.addClass('upgradeBox')
			.attr('id','upgradeBox_' + id)
			.text(u.name + " ");
		
        if (Player.Upgrades[id].locked){
            $upgradeBox.addClass('hidden');
        }
        
		var $buyButton = $('<button>')
			.addClass('upgradeBtn')
			
			.attr('id', 'upgradeBtn_' + id)
			.attr('onClick',"BuyUpgrade('" + id + "')")
			.text("Upgrade: " + u.name);
				
		var $upgradePrice = $('<span>')
			.addClass('price')
			.attr('id','cost_' + id);

		$buyButton.append($upgradePrice);
		
		$upgradeBox.append($buyButton);
		
		$upgradeBox.appendTo('#upgrades_pane');
        
        }
    
    },
    
    InitializeTabs: function(){
        $("#tab_notifications").click(function(){SelectTab("notifications")});
        $("#tab_about").click(function(){SelectTab("about")});
        $("#tab_config").click(function(){SelectTab("config")});
        SelectTab("notifications");
    },
    
    RefreshTools: function(){
        for (var id in Data.Tools){
            if (Player.Tools[id].locked){
                Interface.Hide(id);
            }
            RefreshTool(id);
        }
    },
    
    RefreshUpgrades: function(){
        for (var id in Data.Upgrades){
            if (!Player.Upgrades[id].revealed){
                Interface.HideUpgrade(id);
            }
        }
    },
    
    CheckBuyables: function() {
        for (var id in Data.Tools){
            if (Player.cards > Player.Tools[id].curCost) {
                $("#toolBtn_" + id).prop("disabled",false);
            } else {
                $("#toolBtn_" + id).prop("disabled",true);
            }
        }
    
    }
}


function SelectTab(tab){
    if (!$("#tab_" + tab).hasClass("selected")){
        $(".tab,.pane").stop(true,false); //instant finish animations, and clear queued animations
        
        $(".tab").removeClass("selected");
        $("#tab_" + tab).addClass("selected");
        $(".pane").fadeOut('fast');
        $(".pane").promise().done(function(){
            $("#pane_" + tab).fadeIn('fast');
        });
    }
}
function Notify(text){
    var currentdate = new Date(); 
    var autoscroll = false;
    var time = currentdate.getHours() + ":" + (currentdate.getMinutes()<10?'0':'') + currentdate.getMinutes();
    console.log(text);
    
    var log = document.getElementById("gamelog");
    if (log.scrollHeight - log.clientHeight == log.scrollTop){
        autoscroll = true;
    }
    $(log).append($("<div>").text(time + " " + text).addClass("notification"));
    
    if (autoscroll){
        log.scrollTop = log.scrollHeight;
    }   
}


