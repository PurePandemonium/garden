function InitializeToolInterface(){
    
	for (var k in Player.Tools){
        var Tool = Player.Tools[k];
		var toolBox = $('<div>')
			.addClass('toolBox')
			.attr('id','toolBox_' + k)
			.text(Tool.name + " ");
		
        if (Tool.locked){
            toolBox.addClass('hidden');
        }
        
		var buyButton = $('<button>')
			.addClass('toolBtn')
			
			.attr('id', 'toolBtn_' + k)
			.attr('onClick',"BuyTool('" + k + "')")
			.text("Buy 1 " + Tool.name);
				
		var toolPrice = $('<span>')
			.addClass('price')
			.attr('id','cost_' + k);
			
			
		var toolTotal = $('<span>')
			.addClass('toolTotal')
			.attr('id','total_' + k);
		
		var toolIncome = $('<div>')
			.addClass('toolIncome')
			.attr('id','income_per_' + k);
		
		var totalIncome = $('<div>')
			.attr('id','total_income_' + k);
		buyButton.append(toolPrice);
		
		toolBox.append(buyButton, toolTotal, toolIncome, totalIncome);
		
		toolBox.appendTo('#tools');
		RefreshTool(k);
    }
	

}

function RefreshTool(tool){
	var Tool = Player.Tools[tool];
	$("#cost_"+tool).text("(" + Math.round(Player.Tools[tool].cost) + " cards)");
	$("#total_"+tool).text("Total: " + Player.Tools[tool].total);
	$("#income_per_" + tool).text("Produces: " + Player.Tools[tool].income + " C/s");
	$("#total_income_" + tool).text("Income: " +Tool.income * Tool.total + " C/s");
}

function RefreshResources(){
	$("#stat_cards").text(Player.cards + " Cards");
	$("#stat_income").text("Total Income: " + Player.income + " C/s");

}

function Round(number){
	return Math.round(number);
}

var Interface = {
	Reveal: function(tool){
		$("#toolBox_" + tool).removeClass("hidden");
	},
	
	Hide: function(tool){
		$("#toolBox_" + tool).addClass("hidden");
	},

}

function Notify(text){
    var currentdate = new Date(); 
    var time = currentdate.getHours() + ":" + currentdate.getMinutes();
    var autoscroll = false;
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


