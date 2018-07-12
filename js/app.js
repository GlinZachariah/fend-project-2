/*
 * Create a list that holds all of your cards
 */

 //Card value
 const starIcon = "fa fa-diamond";
 const anchorIcon = "fa fa-anchor";
 const boltIcon = "fa fa-bolt";
 const cubeIcon = "fa fa-cube";
 const leafIcon = "fa fa-leaf";
 const bicycleIcon = "fa fa-bicycle";
 const bombIcon = "fa fa-bomb";
 const planeIcon = "fa fa-plane";
 
 //Card list that holds equal pair of cards
const myCards =[starIcon,starIcon,
				boltIcon,boltIcon,
				anchorIcon,anchorIcon,
				cubeIcon,cubeIcon,
				leafIcon,leafIcon,
				bicycleIcon,bicycleIcon,
				planeIcon,planeIcon,
				bombIcon,bombIcon];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Display cards function
const OPEN_CARD = "open";
const SHOW_CARD = "show"; 
const MATCH_CARD ="match";

//Function performed on Content Loading
document.addEventListener("DOMContentLoaded",function(event){
	console.log("Welcome tp Commentry of game!");
	shuffle(myCards);
	insertCard();
	createCardAction();
	createRating();
	createRestart();
});

//Function to create Restart action on click
function createRestart(){
	console.log("Game Restart Action added");
	const resetBtn = document.getElementById('restart');
	resetBtn.addEventListener("click",reset);
}

//Function to create card Layout and place into the card List
function insertCard(event){
	console.log("Inserted the cards");
	for(let i=0; i< myCards.length; i++){
		//create <i> Element with given order of cards and append rach og them to the list 
		let cardElement = document.createElement('i');
		cardElement.className+=myCards[i];
		let cardEle = document.getElementById("card"+i);
		cardEle.appendChild(cardElement);
	}
	
};

// Shuffle function from http://stackoverflow.com/a/2450976
// Function to shuffle the cards
function shuffle(array) {
	console.log("Shuffled the cards");
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Function to create Event Listener for card on-click
 function createCardAction(){
 	console.log("Created card actions!");
 	for(let i=0; i< myCards.length; i++){
 		let cardClicked = document.getElementById("card"+i);
		cardClicked.addEventListener("click",cardAction);
 	}
 }

//Game default values
let isOpen =false;
let openCard =[];
let matchedCards = [];
let matchedCardIds =[];
let solvedCounter=0; 
let gamecounter=0;
let starRating =0;

//Fucntion to add card Action
function cardAction(event){
	console.log("Card Clicked!");
	if(openCard.length<2){
		if(isOpen == false){
			displayCard(event.target);
		}else{
			if(compareCard(event.target)){
				console.log("card click different");
				if(openCard.length>1){
					if(openCard[0].children[0].classList[1] == openCard[1].children[0].classList[1] && openCard[0].id != openCard[1].id){
							setTimeout(function(){makeMatch()},500);
					}else{
						    setTimeout(function(){hideCard()},500);
					}	
				}
			}
		}
		updateOnScreen();
	}
}

// function to show the card on click
function displayCard(card){
	console.log("Card displayed!");
	card.classList.add(OPEN_CARD);
	card.classList.add(SHOW_CARD);
	openCard.push(card);
	gamecounter+=1;
	createRating();
	isOpen=!isOpen;
	return;
}

//function to compare the cards
function compareCard(card){
	if(card.classList.contains("fa")){
		card =card.parentElement;
	}
	if(openCard[0].id != card.id){
		displayCard(card);
	}else{
		console.log("same card!");
		return false;
	}
	console.log("not same card!");
	return true;
}

//Star Rating Elements
const star1 =document.getElementById('star1');
const star2 =document.getElementById('star2');
const star3 =document.getElementById('star3');
const STAR='fa-star';
const NO_STAR='fa-star-o';

//Class List of each star
let star1List =star1.classList;
let star2List =star2.classList;
let star3List =star3.classList;

//Function to remove old Rating (if exists)
function removeOldRating(){
	console.log("Removed Old Rating!");
	if(star1List.contains(STAR)){
	 		star1List.toggle(STAR);
 		}else if(star1List.contains(NO_STAR)){
 			star1List.toggle(NO_STAR);
 		}
 		if(star2List.contains(STAR)){
 			star2List.toggle(STAR);
 		}else if(star2List.contains(NO_STAR)){
 			star2List.toggle(NO_STAR);
 		}
 		if(star3List.contains(STAR)){
 			star3List.toggle(STAR);
 		}else if(star3List.contains(NO_STAR)){
 			star3List.toggle(NO_STAR);
 		}
}

//Function to create Rating
function createRating(){
	console.log("Created Rating!");
 	removeOldRating();
 	if(gamecounter <=30 ){
 		// 3 star when gamecounter <= 30
 		star1List.toggle(STAR);
 		star2List.toggle(STAR);
 		star3List.toggle(STAR);
 	}else if(gamecounter <=40 ){
 		// 2 star when gamecounter <= 40
 		star1List.toggle(STAR);
 		star2List.toggle(STAR);
 		star3List.toggle(NO_STAR);
 	}else if(gamecounter<=50){
 		// 1 star when gamecounter <= 50
 		star1List.toggle(STAR);
 		star2List.toggle(NO_STAR);
 		star3List.toggle(NO_STAR);
 	}else{
 		// 0 star when gamecounter > 50
 		star1List.toggle(NO_STAR);
 		star2List.toggle(NO_STAR);
 		star3List.toggle(NO_STAR);
 	}
 }

//Function to remove Old card Elements
function removeOldCard(){
	console.log("Removed old cards");
	for(let i=0;i<myCards.length;i++){
		let oldCardEle = document.getElementById('card'+i);
		oldCardEle.innerHTML="";
	}
	return;
}

//Function to remove matched cards
function removeMatch(){
	console.log("Removed matched cards");
	if(matchedCards.length>0){
		for(let matchedCard of matchedCards){
			matchedCard.classList.remove(MATCH_CARD);
		}
		console.log(matchedCards.length);
		matchedCards=[];
	}
}

//Function to reset the game.
function reset(){
	console.log("RESET CLICKED!");
	removeMatch();
	hideCard();	
	gamecounter=0;
	isOpen=false;
	starRating=0;
	createRating();
	removeOldCard();
	//shuffle(myCards);
	insertCard();
	createCardAction();
	updateOnScreen();
}

//Function to store matched cards
function makeMatch(){
	console.log("Match found!");
	openCard[0].classList.add(MATCH_CARD);
	openCard[1].classList.add(MATCH_CARD);
	//console.log("OpenCard: "+openCard[0].id)
	//console.log("OpenCard: "+openCard[1].id)
	openCard[0].removeEventListener("click",cardAction);
	openCard[1].removeEventListener("click",cardAction);
	matchedCards.push(openCard[0]);
	matchedCards.push(openCard[1]);
	hideCard();
	//console.log("solvedCounter: "+solvedCounter);
	solvedCounter+=2;
	if(solvedCounter == myCards.length){
		
		setTimeout(alert("Congratulations! You won!"),3000);			
	}
	return;
}

//Function to hide cards
function hideCard(){
	console.log("Hide Cards!");
	if(openCard.length>0){
		openCard[0].classList.remove(OPEN_CARD);
		openCard[0].classList.remove(SHOW_CARD);
		if(openCard.length == 2){
			openCard[1].classList.remove(OPEN_CARD);
			openCard[1].classList.remove(SHOW_CARD);
			openCard.pop();
		}
		openCard.pop();
	}
	return;
}

//Function to update the game moves
function updateOnScreen(){
	console.log("Update Moves!");
	const updateMove =document.getElementById("moves");
	updateMove.innerHTML=""+gamecounter;
}

