var textColor = "white";
var runningAProgram = false;
var database = ['helloworld.txt', 'Hello world!'];
var loggedin=false;
var wargames=false;
var runningProgram;
var separatedWords = [];

var postCommand = function(postText) {
	
	$("#commandline").before('<tr class="posted command"><td style="color: ' + textColor + ';">'+postText+'</td></tr>');  
	window.scrollTo(0, document.body.scrollHeight);
	$('input[class=commandline]').removeAttr('disabled');
	console.log("---------------------------");	
};

var post = function(postText) {
		console.log("Posting '" + postText + "'");
		$("#commandline").before('<tr class="posted response"><td style="color: ' + textColor + ';"></td></tr>');

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
		window.scrollTo(0, document.body.scrollHeight);
		console.log("---------------------------");	
};

var dictionary = [
	"help", "displays the help for a given command of displays the list of commands. (syntax: 'help [argument]')",
	"clear", "clears everything from the console.",
	"color", "changes the color of the terminal text. (syntax: 'color [hex code/CSS color name]')",
    //"muffin", "Meow Meow Meow Meow Meow Meow Meow Meow Meow Meow",
    "cat", "displays the contents of a file (syntax: 'cat [filename])",
    "dir", "displays the files contained in the database",
    //"write", "writes a file with the specified contents (syntax: 'write [filename] [contents]')",
    //"del", "erases a file from the database (syntax: 'del [filename]')",
    "run", "interprets a stored file as javascript code (syntax: 'run [filename]')",
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
    var fileContents = "";
	var fileExists = (xContainsY(database, fileName));
    if (fileExists === false) {
        return("File '" + separatedWords[1] + "' not found.");
    } else {
        fileContents = (database[fileExists + 1]);
        return(fileContents);
    }
};

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
		default:
			post("User not recognised.");
		break;
	}
	if(loggedin){
		$("#commandline span").html("");
		$(".posted").remove();
		console.clear();
		post(hello);
	}
};

//runs the specified command or returns an error
var executeCommand = function(command) {
	console.log("Attempting to execute command: " + command);
    // var argument = separatedWords[1];
	switch (command) {
		case "clear":
			$(".posted").remove();
			console.clear();
			break;
		case "help":
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
		case "color":
			if (separatedWords.length < 2) {
				post("Error: No color specified. (syntax: 'color [hex code/CSS color name]')");
			} else {
				var colors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
				console.log("Argument for 'color': " + argument);
				console.log("Is the arg a hex code? " + ((argument[0] === "#") && (argument.length === 7)));
				if ((xContainsY(colors, argument)) || ((argument[0] === "#") && (argument.length === 7))) {
					textColor = argument;
					post("Changing color to " + argument);
					$("*").css("color", argument);
				} else {
					post("Color '" + argument + "' not recognized.");
				}
			}
			break;
        case "dir":
            if (database.length < 1) {
                post("The database is empty.");
                break;
            }
            var fileList = database[0];
            for (var i=1;i<database.length;i++) {
                if (i % 2 === 0) {
                    fileList += ", " + database[i];
                }
            }
            post(fileList);
      		break;
        case "cat":
            console.log("Opening file " + argument + "...");
            post(readFromFile(argument));
            //post(argument.fileContents); //failed attempt to use objects
            break;
        case "write":
            var fileName = argument;
            var fileContents = "";
            if (separatedWords.length < 2) {
                post("Error: File name not specified.");
                break;
            } else if (separatedWords.length < 3) {
                post("Error: File contents is empty.");
                break;
            }
            for (i=2;i<separatedWords.length;i++) {
                fileContents += separatedWords[i] + " ";
            }
            post("File '" + fileName + "' created.");
            database.push(fileName);
            database.push(fileContents);
            //this[fileName] = new Book(fileName, fileContents); //failed attempt to use objects
            break;
        case "run":
            post("Executing program '" + argument + "'...");
            eval(readFromFile(argument));
            break;
        case "del":
            if (xContainsY(database, argument) === false) {
                post("File '" + argument + "' not found.");
                break;
            }
            var filePosition = xContainsY(database, argument);
            /* post("File '" + argument + "' is at position " + filePosition);
            fileContentsPosition = xContainsY(database, argument) + 1;
            post("File contents are at position " + fileContentsPosition); */ //debugging
            database.splice(filePosition, 2);
            post("Deleted file '" + argument + "'.");
            break;
        /* case "random":
            for (i = 0; i <= 10; i++) {
                wordsep(write Math.random());
                executeCommand(wordsep(command)[0])
            }
            break; */ //something I tried to write in the program using run but it didn't work
        /* case "edit":
            if (!isNaN(xContainsY(database, argument))) {
                post("Editing '" + argument + "'...");
                setTimeout(function() {$('input[class=commandline]').val(xContainsY(database, argument) + 1)}, 0100);
            } else { post("File '" + argument + "' not found."); }
			break; */
		case "exit":
			$("#commandline span").html("LOGON: ");
			$(".posted").remove();
			$('input[class=commandline]').removeAttr('disabled');
			console.clear();
			loggedin=false;
			break;
		default:
			post("Command '" + command + "' not recognized.");
			break;
	}
};

var alertKeyPressed = false;

//command is checked on enter key press
$(document).keyup(function(event) {
    if (event.keyCode == 13) {
		var command = $('input[class=commandline]').val();
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
				setTimeout(function(){joshua(command.split(' ')[0])},100); 
			}
		}
		else if (command.length > 0) {
			console.log("'" + command + "' is length " + command.length + ".");
			postCommand(command);
			$('input[class=commandline]').val("");
			alertKeyPressed = true;
            if (runningAProgram === false) {
				setTimeout(function(){executeCommand(command.split(' ')[0])},100); 
			}
		} else {
			console.log("'" + command + "is length 0, not posting.");
			$('input[class=commandline]').removeAttr('disabled');
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
	switch (command) {
		case "hello":
			post("how are you feeling today?");
			break;
		case "exit":
			$("#commandline span").html("LOGON: ");
			$(".posted").remove();
			$('input[class=commandline]').removeAttr('disabled');
			console.clear();
			loggedin=false;
			break;
		default:
			post("Command '" + command + "' not recognised.");
			break;
	}
}