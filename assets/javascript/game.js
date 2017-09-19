var characterObjects = [
  {
    name: "Qui-Gon Jinn",
    photo: "assets/images/qui.jpg",
    hp: 120,
    ap: 25
  },
  {
    name: "Anakin Skywalker",
    photo: "assets/images/anakin.jpg",
    hp: 100,
    ap: 20
  },
  {
    name: "Count Dooku",
    photo: "assets/images/dooku.jpg",
    hp: 150,
    ap: 25
  },
  {
    name: "General Grievous",
    photo: "assets/images/grievous.jpg",
    hp: 180,
    ap: 25
  }
];


$(document).ready(function() {

	var yourCharacterID;
	var defenderID;
	var yourDamage;
	var defDamage;
	var yourAttackPower = 0; // remember incresing
	var isDefenderSlected;
	var isEnemiesAvailable;
	var defenderObj;

	isDefenderSlected = false;
	isEnemiesAvailable = false;


	// Display characters
	for (var i = 0; i < characterObjects.length; i++) {

		console.log("for loop");

		var charDiv = document.createElement("button");
		$("#characters").append(charDiv);

		$(charDiv).attr("class", "character");
		$(charDiv).attr("id", i);
		$(charDiv).attr("value", characterObjects[i].name);
		$(charDiv).append(characterObjects[i].name + '<br>')
		$(charDiv).append('<img src="' + characterObjects[i].photo + '">' + '<br>')
		$(charDiv).append(characterObjects[i].hp)

	}

	// Add selected character to #yourCharacters. Add other characters to #enemies.
	//moveCharacter(quiObj, "#characters");
	//moveCharacter(anakinObj, "#characters");

	// Select your character
	//$(".character").on("click", function() {
	$("#characters").on("click", function(event) {

		console.log("clicked");
		console.log(event.target.id);
		yourCharacterID = event.target.id;
		console.log(yourCharacter);

		// Move selected character to your character
		var charDiv = document.createElement("button");
		$("#yourCharacter").append(charDiv);

		$(charDiv).attr("class", "character");
		$(charDiv).attr("id", event.target.id);
		$(charDiv).attr("value", characterObjects[event.target.id].name);
		$(charDiv).append(characterObjects[event.target.id].name + '<br>')
		$(charDiv).append('<img src="' + characterObjects[event.target.id].photo + '">' + '<br>')
		$(charDiv).append('<span id="yourHp">' + characterObjects[event.target.id].hp + '</span>')

		// Move the other characters to enemies
		for (var i = 0; i < characterObjects.length; i++) {

			console.log(event.target.id);

			if (i != event.target.id) {
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
		$("#characters").remove();

	});

	// Select defender
	//$(".enemy").click(function(event) {
	$("#enemies").on("click", function(event) {

		defenderID = event.target.id;
		console.log(defenderID);
		console.log(isDefenderSlected)

		if (isDefenderSlected) {
			return;
		}
		else{

			// Remove from ememies available to attack
			console.log(event.target);
			$(event.target).remove();

			// Move selected item to Defender
			var charDiv = document.createElement("button");
			$("#defender").append(charDiv);

			$(charDiv).attr("class", "defender");
			$(charDiv).attr("id", event.target.id);
			$(charDiv).attr("value", characterObjects[event.target.id].name);
			$(charDiv).append(characterObjects[event.target.id].name + '<br>')
			$(charDiv).append('<img src="' + characterObjects[event.target.id].photo + '">' + '<br>')
			$(charDiv).append('<span id="defenderHp">' + characterObjects[event.target.id].hp + '</span>')

			defenderObj = charDiv; // Save to remove when defender is defeated

			isDefenderSlected = true;
		}

	});


	// Nothing
	$("#defender").click(function(event) {
		var userAnswer = event.target.id;
		console.log(userAnswer);
		console.log("clicked def");
		console.log(this.value);
		console.log($(this).value);

	});


	// Attack
	$("#attack").click(function(event) {
		console.log("attacked");

		if (isDefenderSlected) {
			var result;
			
			console.log(defenderID);

			yourAttackPower += 8;

			result = "You attacked " + characterObjects[defenderID].name  + " for " + parseInt(yourAttackPower) + " damage."
			result += "<br>" + characterObjects[defenderID].name  + " attacked you back for " + characterObjects[defenderID].ap + " damage."
			
			characterObjects[defenderID].hp = characterObjects[defenderID].hp - yourAttackPower;
			console.log(characterObjects[defenderID].hp);

			characterObjects[yourCharacterID].hp = characterObjects[yourCharacterID].hp - characterObjects[defenderID].ap;
			console.log(characterObjects[yourCharacterID].hp);

			// Update display of hp
			var elem = document.getElementById('yourHp');
			elem.innerText = characterObjects[yourCharacterID].hp;   

			var elem = document.getElementById('defenderHp');
			elem.innerText = characterObjects[defenderID].hp; 

			var elem = document.getElementById(defenderID);
			console.log(defenderID);
			console.log(elem);
			console.log(this);
			console.log($(this));
			console.log(defenderObj);

			//var cEle = $().[0];
			//ßconsole.log($(defenderID).get(0));

			console.log(characterObjects[defenderID]);

			if (characterObjects[defenderID].hp <= 0) {
				
				result = "You have defeated " + characterObjects[defenderID].name + ", you can choose to fight anothet enemy."
			
				// Remove Defender
				$(defenderObj).remove();
				isDefenderSlected = false;

				//$(characterObjects[defenderID]).remove();

			}

			if (characterObjects[yourCharacterID].hp <= 0) {

				result = "You been defeated...GAME OVER!!!"

				// Display Restart button
			}

		}
		else {
        	result = "Slect defender";
		}

        $("#result").html(result);


	});


});


