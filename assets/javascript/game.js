var characterObjects = [
  {
    name: "Qui-Gon Jinn",
    photo: "assets/images/qui.jpg",
    hp: 120,
    ap: 15
  },
  {
    name: "Anakin Skywalker",
    photo: "assets/images/anakin.jpg",
    hp: 100,
    ap: 10
  },
  {
    name: "Count Dooku",
    photo: "assets/images/dooku.jpg",
    hp: 150,
    ap: 18
  },
  {
    name: "General Grievous",
    photo: "assets/images/grievous.jpg",
    hp: 180,
    ap: 20
  }
];

var yourID;
var yourHp;
var defenderID;
var defenderHp;
//var yourDamage;
//var defDamage;
var yourAttackPower; // remember incresing
var isDefenderSlected;
var isEnemiesAvailable;
var isGameEnd;
//var defenderObj;
//var restartButtonObj;

var reset = function() {

	// Reveme Defender
	$("#defender").empty();
	isDefenderSlected = false;

	// Remove Restart button
	$("#defender").empty();

	// Empty #yourCharacter
	$("#yourCharacter").empty();

	// Empty #enemies;
	$("#enemies").empty();

	// Reset message
	$("#result").html("");

	// Remove Restart button
	$("#restart").empty();

	// Reset yourAttackPower
	yourAttackPower = 0;

	// Reset booleans
	isDefenderSlected = false;
	isEnemiesAvailable = false;
	isGameEnd = false;

	yourHp = 0;
	defenderHp = 0;
}

$(document).ready(function() {

	reset();

	// Display characters
	for (var i = 0; i < characterObjects.length; i++) {

		var charDiv = document.createElement("button");
		$("#characters").append(charDiv);

		$(charDiv).attr("class", "character");
		$(charDiv).attr("id", i);
		$(charDiv).attr("value", characterObjects[i].name);
		$(charDiv).append(characterObjects[i].name + '<br>')
		$(charDiv).append('<img src="' + characterObjects[i].photo + '">' + '<br>')
		$(charDiv).append(characterObjects[i].hp)
	}

	// Select your character
	//$(".character").on("click", function() {
	$("#characters").on("click", ".character",  function(event) {

		yourID = $(this).attr("id");
		yourHp = characterObjects[yourID].hp;

		// Move selected character to your character
		var charDiv = document.createElement("button");
		$("#yourCharacter").append(charDiv);

		$(charDiv).attr("class", "character");
		$(charDiv).attr("id", yourID);
		$(charDiv).attr("value", characterObjects[yourID].name);
		$(charDiv).append(characterObjects[yourID].name + '<br>')
		$(charDiv).append('<img src="' + characterObjects[yourID].photo + '">' + '<br>')
		//$(charDiv).append('<div id="yourHp">' + yourHp + '</div>')

		var hpDiv = document.createElement("div");
		$(charDiv).append(hpDiv);
		$(hpDiv).attr("id", "yourHp");
		$("#yourHp").html(yourHp);

		// Move the other characters to enemies
		for (var i = 0; i < characterObjects.length; i++) {

			if (i != yourID) {
				var charDiv = document.createElement("button");
				$("#enemies").append(charDiv);

				$(charDiv).attr("class", "enemy");
				$(charDiv).attr("id", i);
				$(charDiv).attr("value", characterObjects[i].name);
				$(charDiv).append(characterObjects[i].name + '<br>')
				$(charDiv).append('<img src="' + characterObjects[i].photo + '">' + '<br>')
				$(charDiv).append(characterObjects[i].hp)
			}

		}

		// Empty #characters
		$("#characters").empty();

	});

	// Select defender
	//$(".enemy").click(function(event) {
	$("#enemies").on("click", ".enemy", function(event) {

		if (!isDefenderSlected && !isGameEnd) {

			// Initialize #result
        	$("#result").html("");

			defenderID = $(this).attr("id");
			defenderHp = characterObjects[defenderID].hp;

			// Remove from ememies available to attack
			console.log(event.target.id);
			$(this).remove();

			// Move selected item to Defender
			var charDiv = document.createElement("button");
			$("#defender").append(charDiv);

			$(charDiv).attr("class", "defender");
			$(charDiv).attr("id", defenderID);
			$(charDiv).attr("value", characterObjects[defenderID].name);
			$(charDiv).append(characterObjects[defenderID].name + '<br>')
			$(charDiv).append('<img src="' + characterObjects[defenderID].photo + '">' + '<br>')
			//$(charDiv).append('<div id="defenderHp">' + characterObjects[defenderID].hp + '</div>')

			var hpDiv = document.createElement("div");
			$(charDiv).append(hpDiv);
			$(hpDiv).attr("id", "defenderHp");
			$("#defenderHp").html(defenderHp);

			//defenderObj = charDiv; // Save to remove when defender is defeated

			isDefenderSlected = true;

		}

	});


	// Nothing happen
	$("#defender").click(function(event) {
		var userAnswer = event.target.id;
		console.log(userAnswer);
		console.log("clicked def");
	});

	// Attack
	$("#attack").click(function(event) {

		if (isDefenderSlected) {

			if (yourHp > 0 && defenderHp > 0) {

				var result;

				console.log(yourAttackPower);

				yourAttackPower += 8;
				console.log(yourAttackPower);

				result = "You attacked " + characterObjects[defenderID].name  + " for " + yourAttackPower + " damage."
				result += "<br>" + characterObjects[defenderID].name  + " attacked you back for " + characterObjects[defenderID].ap + " damage."
				
				//characterObjects[yourID].hp = characterObjects[yourID].hp - characterObjects[defenderID].ap;
				defenderHp = defenderHp - yourAttackPower;

				//characterObjects[defenderID].hp = characterObjects[defenderID].hp - yourAttackPower;
				yourHp = yourHp - characterObjects[defenderID].ap;

				console.log(yourHp);
				console.log(characterObjects[defenderID].ap);

				// Update display of hp
				//var elem = document.getElementById('yourHp');
				//elem.innerText = yourHp; 
				$("#yourHp").html(yourHp)  

				//var elem = document.getElementById('defenderHp');
				//elem.innerText = defenderHp; 
				$("#defenderHp").html(defenderHp)  

				$("#result").html(result);

					console.log($.isEmptyObject($(".empty")));
					console.log($(".empty"));
					console.log($(".enemy").length);
				
				// When Defender's hp is less then 0. Which means you Win!
				if (defenderHp <= 0 && yourHp > defenderHp) {
					
					console.log(yourHp);
					console.log(defenderHp);

					result = "You have defeated " + characterObjects[defenderID].name + ", "
					
					// Remove Defender
					//$(defenderObj).remove();
					$("#defender").empty();
					isDefenderSlected = false;

					// When you defeated all the enemies
					if ($(".enemy").length === 0) {
						console.log("isempty");
						result = "You Won!!!! GAME OVER!!!"

						// Message
	        			$("#result").html(result);

						isGameEnd = true; // not necessary here
					}
					else if (yourHp <= 0) {

						result += "but your Hit Point is less than 0... <br>You have to restart.<br>"

						// Message
		        		$("#result").html(result);

						// Display Restart button
						var charButton = document.createElement("button");
						$("#restart").append(charButton);
						$(charButton).attr("id", "restart");
						$(charButton).html("Restart");

						isGameEnd = true;
					}
					else {
						result += " you can choose to fight anothet enemy.<br>"

						// Message
		        		$("#result").html(result);

					}

				}
				// When your character's hp is less then 0. Which means you been defeated...
				else if (yourHp <= 0) {

					console.log(yourHp);
					console.log(defenderHp);

					result = "You been defeated...GAME OVER!!!<br>"

					// Message
	        		$("#result").html(result);

					// Display Restart button
					var charButton = document.createElement("button");
					$("#restart").append(charButton);
					$(charButton).attr("id", "restart");
					$(charButton).html("Restart");
					//restartButtonObj = charButton;

				}
			}
		}
		else if ($(".enemy").length !== 0){
        	result = "No enemy here";
        	$("#result").html(result);
		}

	});

	// Restart
	$("#restart").click(function(event) {
	//$("#restart").on("click", function(event) {

		// Set all characters back to #characters
		for (var i = 0; i < characterObjects.length; i++) {

			var charDiv = document.createElement("button");
			$("#characters").append(charDiv);

			$(charDiv).attr("class", "character");
			$(charDiv).attr("id", i);
			$(charDiv).attr("value", characterObjects[i].name);
			$(charDiv).append(characterObjects[i].name + '<br>')
			$(charDiv).append('<img src="' + characterObjects[i].photo + '">' + '<br>')
			$(charDiv).append(characterObjects[i].hp)
		}

		reset();

		// Reset hp
		yourHp = characterObjects[yourID].hp;
		defenderHp = characterObjects[defenderID].hp;

	});

});


