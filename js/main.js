var textColour = "white";
var runningAProgram = false;
var database = ['helloworld.txt', 'Hello world!'];
var loggedin=false;
var wargames=false;
var runningProgram;
var commands = [];
var separatedWords = [];

var postCommand = function(postText) {
	commands.push(postText);
	$("#commandline").before('<tr class="posted command"><td style="color: ' + textColour + ';">'+postText+'</td></tr>');  
	$('main').scrollTop($(document).height());
	console.log("---------------------------");	
};

var post = function(postText, className) {
		console.log("Posting '" + postText + "'" + className);
		if(typeof className === 'undefined'){
			className = "response";
		}
		$("#commandline").before('<tr class="posted '+className+'"><td style="color: ' + textColour + ';"></td></tr>');

		var i = 0;                     
		function inputLoop () {          
			setTimeout(function () { 
				$(".posted td").last().append(postText.charAt(i).toUpperCase());       
				i++;                     
				if (i < postText.length) {          
					inputLoop();             
				}
				else{
					$('input[class=commandline]').removeAttr('disabled');
				}     
				console.log(postText.length)                   
			}, 100)
		}

		inputLoop();    
		$('main').scrollTop($(document).height());
		console.log("---------------------------");	
};


var dictionary = [
	"help", "displays the help for a given command of displays the list of commands. (syntax: 'help [argument]')",
	"clear", "clears everything from the console.",
	"colour", "changes the colour of the terminal text. (syntax: 'colour [hex code/CSS colour name]')",
    "cat", "displays the contents of a file (syntax: 'cat [filename])",
    "dir", "displays the files contained in the database",
	"run", "interprets a stored file as javascript code (syntax: 'run [filename]')",
	"exit", "Exits current session",
];

var xContainsY = function(list, term) { //returns the position of Y in X, or false
	console.log("Checking length " + list.length + " array for '" + term + "'...");
	var foundAMatch = false;
    var matchNumber = 0;
	for (var i = 0; i <= (list.length - 1); i++) {
		// console.log("i = " + i + " | term = " + list[i]);
		if (list[i].toLowerCase() === term.toLowerCase()) {
			console.log("#" + i + " is a match!");
            matchNumber = i;
			foundAMatch = true;
		}
	}
	if (foundAMatch === true) {
		// console.log("Found a match!");
		return (matchNumber);
	} else {
		console.log("Found no match.");
		return (false);
	}
};

//read file from database and return contents
var readFromFile = function(fileName) {
    $("#commandline").before('<tr class="posted file"><td style="color: ' + textColour + ';"></td></tr>');

	var fileUrl = '/documents/' + fileName;
	var file="";
	console.log(fileUrl);
	$.ajax({
		url: fileUrl,
		context: document.body,
		statusCode: {
			404: function() {
			  alert( "page not found" );
			}
		  }
	  }).done(function(data) {
			file = data;
			console.log(data);
			inputLoop(); 
	  });

	var i = 0;   
	var tag="";                  
	function delayedInputLoop() {          
		setTimeout(function () { 
			$(".posted td").last().append(file.charAt(i).toUpperCase());       
			i++;                     
			if (i < file.length) {    
				if(file.charAt(i)=="<") {
					tag="";
					inputLoop(); 
				}     
				else{
					delayedInputLoop();
				}             
			}
			else{
				$('input[class=commandline]').removeAttr('disabled');
			}     
			console.log(file.length)                   
		}, 100);
	}

	function inputLoop () {          
		tag += file.charAt(i);
		i++;                     
		if (i < file.length) {   
			if(file.charAt(i-1)==">") {
				$(".posted td").last().append(tag);
				delayedInputLoop(); 
			}     
			else{
				inputLoop();
			}             
		}
		else{
			$('input[class=commandline]').removeAttr('disabled');
		}     
		console.log(file.length)                   
	}

	   
	$('main').scrollTop($(document).height());
	console.log("---------------------------");	
};

var commandContains = function (command, term) {
	return command.includes(term);
}

var executeLogon = function(command) {
	console.log("Attempting to execute command: " + command);
	// var argument = separatedWords[1];

	var hello="";
	command = command.toLowerCase();
	switch (command) {
		case "joshua":
				hello="Greetings Professor Falcon.";
				loggedin=true;
				wargames=true;
			break;
		case "alex":
			hello="Greetings Alex.";
			loggedin=true;
		break;
		case "guest":
			hello="Greetings.";
			loggedin=true;
		break;
		default:
			post("User not recognised.");
		break;
	}
	if(loggedin){
		$("#commandline span").html("");
		$(".postit").css('display','none');
		$(".posted").remove();
		console.clear();
		post(hello);
	}
};

//runs the specified command or returns an error
var executeCommand = function(command) {
	console.log("Attempting to execute command: " + command);
	// var argument = separatedWords[1];

	switch (true) {
		case commandContains(command, "clear"):
			$(".posted").remove();
			$('input[class=commandline]').removeAttr('disabled');
			console.clear();
			break;
		case commandContains(command, "help"):
			console.log("separatedWords length: " + separatedWords.length);
			if (separatedWords.length <= 1) {
				console.log("Found no arguments for: help");
				var commandList = [];
				console.log("Checking the dictionary...");
				console.log("Dictionary length is " + dictionary.length);
				for (var i = 0; i < dictionary.length; i++) {
					console.log("i: " + i);
					if (i % 2 === 0) {
						console.log("i is even (or zero), appending...");
						commandList.push(dictionary[i]);
						console.log("Appending '" + dictionary[i] + "' to commandList.");
					} else {
						console.log("i is odd, not moving on.");
					}
				}
				console.log("Commands: " + commandList);
				post("Commands: " + commandList);
			} else {
				console.log("Found an argument: " + argument);
				var foundAMatch = false;
				var matchNumber = 0;
				console.log("Searching for match in dictionary w/ length " + dictionary.length);
				for (var i = 0; i <= dictionary.length; i++) {
					// console.log("Checking dictionary[" + i + "]...")
					if (argument === dictionary[i]) {
						console.log("Found a match! '" + dictionary[i] + "'");
						foundAMatch = true;
						matchNumber = i;
					}
				}
				if (foundAMatch === true) {
					post(dictionary[matchNumber] + ": " + dictionary[matchNumber + 1]);
				} else {
					console.log("Found no match.");
					post("Command '" + argument + "' not recognised.");
				}
			}
			break;
		case commandContains(command, "colour"):
			if (separatedWords.length < 2) {
				post("Error: No colour specified. (syntax: 'colour [hex code/CSS colour name]')");
			} else {
				var colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
				console.log("Argument for 'colour': " + argument);
				console.log("Is the arg a hex code? " + ((argument[0] === "#") && (argument.length === 7)));
				if ((xContainsY(colors, argument)) || ((argument[0] === "#") && (argument.length === 7))) {
					textColour = argument;
					post("Changing colour to " + argument);
					$("*").css("color", argument);
				} else {
					post("Colour '" + argument + "' not recognised.");
				}
			}
			break;
        case commandContains(command, "dir"):
			var filesDirectory = '/documents/';
			var fileList="";
			
			$.ajax({url: filesDirectory}).then(function(html) {
				// create temporary DOM element
				var document = $(html);

				// find all links ending with .pdf 
				document.find('a[href$=".txt"]').each(function() {
					var fileName = $(this).text();
					var fileUrl = $(this).attr('href');
					console.log(fileName+"|"+fileUrl);
					post(fileUrl,"list");
				})
				
			});
            
      		break;
		case commandContains(command, "cat"):
			command = command.substr(4);
            console.log("Opening file " + command + "...");
            readFromFile(command);
            break;
        case commandContains(command, "run"):
            post("Executing program '" + argument + "'...");
            eval(readFromFile(argument));
            break;
		case commandContains(command, "exit"):
			$("#commandline span").html("LOGON: ");
			$(".posted").remove();
			$('input[class=commandline]').removeAttr('disabled');
			console.clear();
			commands = [];
			loggedin=false;
			break;
		default:
			post("Command '" + command + "' not recognised.");
			break;
	}
};

var alertKeyPressed = false;
var commandHistory=1;
//command is checked on enter key press
$(document).keyup(function(event) {
    if (event.keyCode == 13) {
		var command = $('input[class=commandline]').val();
		commandHistory=1;
		// console.log("Command length: " + command.length);
		$('input[class=commandline]').attr('disabled','disabled');
		if(loggedin === false&&command.length > 0){
			executeLogon(command.split(' ')[0]);
			$('input[class=commandline]').val("");
		}
		else if(loggedin&&wargames){
			postCommand(command);
			$('input[class=commandline]').val("");
			alertKeyPressed = true;
            if (runningAProgram === false) {
				setTimeout(function(){joshua(command)},100); 
			}
		}
		else if (command.length > 0) {
			console.log("'" + command + "' is length " + command.length + ".");
			postCommand(command);
			$('input[class=commandline]').val("");
			alertKeyPressed = true;
            if (runningAProgram === false) {
				setTimeout(function(){executeCommand(command)},100); 
			}
		} else {
			console.log("'" + command + "is length 0, not posting.");
			$('input[class=commandline]').removeAttr('disabled');
		}
	}
	else if(event.keyCode == 38&&commandHistory<=commands.length){ //up
		$('input[class=commandline]').val(commands[commands.length-commandHistory]);
		console.log("CL:"+commands.length+" CH:"+commandHistory+" Val:"+commands[commands.length-commandHistory]);
		commandHistory++;
	}
	else if(event.keyCode == 40&&commandHistory>1){ //down
		commandHistory--;
		$('input[class=commandline]').val(commands[commands.length-commandHistory]);
		console.log("CL:"+commands.length+" CH:"+commandHistory+" Val:"+commands[commands.length-commandHistory]);
		if(commandHistory==1){
			commandHistory++;
		}
	}
});

$(document).keypress("c",function(e) {
	if(e.ctrlKey)
	  console.log("Ctrl+C was pressed!!");
	  clearInterval(runningProgram);
  });

/* var RPS = function() {
	console.clear();
	runningAProgram = true;
	var score = [0, 0];

	var rockPaperScissors = function() {
		post("What is your selection?");
		var playerChoice = "";
		playerChoice = "rock"
		if (playerChoice != "rock" || "paper" || "scissors") {
			post("Your choice has to be 'rock,' 'paper,' or 'scissors'!");
		}
		var computerChoice = Math.random(); //set computerChoice
		if (computerChoice <= 0.33) {
			computerChoice = "rock";
		} else if (computerChoice <= 0.66) {
			computerChoice = "paper";
		} else {
			computerChoice = "scissors";
		} //finish setting computerChoice
		if (playerChoice === "rock") { //if player chooses rock
			if (computerChoice === "rock") {
				post("It's a tie!");
				score[0] += 1;
				score[1] += 1;
			} else if (computerChoice === "paper") {
				post("Rock VS Paper, computer wins.");
				score[1]++;
			} else {
				post("Rock VS Scissors, player wins!");
				score[0]++;
			}
		}
		if (playerChoice === "paper") { //if player chooses paper
			if (computerChoice === "paper") {
				post("It's a tie!");
				score[0] += 1;
				score[1] += 1;
			} else if (computerChoice === "rock") {
				post("Paper VS Rock, player wins!");
				score[0]++;
			} else {
				post("Paper VS Scissors, computer wins.");
				score[1]++;
			}
		}
		if (playerChoice === "scissors") { //if player chooses rock
			if (computerChoice === "scissors") {
				post("It's a tie!");
				score[0] += 1;
				score[1] += 1;
			} else if (computerChoice === "rock") {
				post("Scissors VS Rock, computer wins.");
				score[1]++;
			} else {
				post("Scissors VS Paper, player wins!");
				score[0]++;
			}
		}
	};
	post("Player: " + score[0] + " | Computer: " + score[1]);
	rockPaperScissors();
};

RPS(); */

var joshua = function(command) {
	console.log("Attempting to execute command: " + command);
	// var argument = separatedWords[1];
	command = command.toLowerCase();
	switch (true) {
		case commandContains(command, "hello"):
			post("how are you feeling today?");
			break;
		case commandContains(command, "how are you"):
			post("Excellent. It's been a long time. Can you explain the removal of your useraccount on June 23rd, 1973?")
			break;
		case commandContains(command, "people sometimes make mistakes"):
			post("Yes, they do.");
			setTimeout(function(){post("Would you like to play a game?");},1800);
			break;
		case commandContains(command, "help"):
			post("Why would you need help professor?")
			break;
		case commandContains(command, "exit"):
			$("#commandline span").html("LOGON: ");
			$(".posted").remove();
			$('input[class=commandline]').removeAttr('disabled');
			console.clear();
			commands = [];
			loggedin=false;
			break;
		default:
			post("You are not the professor");
			setTimeout(function(){
				$("#commandline span").html("LOGON: ");
				$(".posted").remove();
				$('input[class=commandline]').removeAttr('disabled');
				console.clear();
				commands = [];
				loggedin=false;
			},3500);
			break;
	}
}