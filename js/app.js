/*
 * Create a list that holds all of your cards
 */
 createCards();
//Function to create the cards
function createCards(){
	const cardSelector=document.querySelector('ul.deck');	
	for(let i=0;i<=15;i++){
		const card =document.createElement('li');
		card.classList="card";
		card.id="card"+i;
		cardSelector.appendChild(card);
	}
}
 //List of the card values
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

//Function performed on Content Loading to display the instructions.
document.addEventListener("DOMContentLoaded",function(event){
	const start = document.getElementById('start');
	const firstModal= document.querySelector('.first_modal');
	start.addEventListener('click',function(){
		firstModal.style.display="none";
		startGame();
	});
});


//Function to Start the game
function startGame(){
	shuffle(myCards);
	insertCard();
	createCardAction();
	createRating();
	startTimer(true);
	createRestart();
}
//Function to create Restart action on click
function createRestart(){
	const resetBtn = document.getElementById('restart');
	resetBtn.addEventListener("click",reset);
}

//Function to create card Layout and place into the card List
function insertCard(event){
	for(let i=0; i< myCards.length; i++){
		//create <i> Element with given order of cards and append rach of them to the list 
		let cardElement = document.createElement('i');
		cardElement.className+=myCards[i];
		let cardEle = document.getElementById("card"+i);
		cardEle.appendChild(cardElement);
	}
	
};


// Shuffle function from http://stackoverflow.com/a/2450976
// Function to shuffle the cards
function shuffle(array) {
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
 	for(let i=0; i< myCards.length; i++){
 		let cardClicked = document.getElementById("card"+i);
		cardClicked.addEventListener("click",cardAction);
 	}
 }

//Game default values
let isOpen =false;
let isModalOpen=false;
let openCard =[];
let matchedCards = [];
let matchedCardIds =[];
let solvedCounter=0; 
let gamecounter=0;
let starRating =0;
let gametimer=0;


//Fucntion to add card Action
function cardAction(event){
	if(openCard.length<2){
		if(isOpen == false){
			displayCard(event.target);
		}else{
			if(compareCard(event.target)){
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

// Function to show the card on click
function displayCard(card){
	card.classList.add(OPEN_CARD);
	card.classList.add(SHOW_CARD);
	openCard.push(card);
	gamecounter+=1;
	createRating();
	isOpen=!isOpen;
	return;
}

//Function to compare the cards
function compareCard(card){
	if(card.classList.contains("fa")){
		card =card.parentElement;
	}
	if(openCard[0].id != card.id){
		displayCard(card);
	}else{
		return false;
	}
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
	for(let i=0;i<myCards.length;i++){
		let oldCardEle = document.getElementById('card'+i);
		oldCardEle.innerHTML="";
	}
	return;
}

//Function to remove matched cards
function removeMatch(){
	if(matchedCards.length>0){
		for(let matchedCard of matchedCards){
			matchedCard.classList.remove(MATCH_CARD);
		}
		matchedCards=[];
	}
}


//Function to reset the game.
function reset(){
	if(isModalOpen){
		isModalOpen=false;
		toggleModal();
	}
	removeMatch();
	hideCard();	
	gamecounter=0;
	isOpen=false;
	starRating=0;
	gametimer=0;
	solvedCounter=0;
	createRating();
	removeOldCard();
	shuffle(myCards);
	insertCard();
	createCardAction();
	updateOnScreen();
}

//Function to store matched cards
function makeMatch(){
	openCard[0].classList.add(MATCH_CARD);
	openCard[1].classList.add(MATCH_CARD);
	openCard[0].removeEventListener("click",cardAction);
	openCard[1].removeEventListener("click",cardAction);
	matchedCards.push(openCard[0]);
	matchedCards.push(openCard[1]);
	hideCard();
	solvedCounter+=2;
	if(solvedCounter == myCards.length){
		isModalOpen=true;		
		setTimeout(function(){toggleModal();},500);			
	}
	return;
}

//Function to hide cards
function hideCard(){
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
	const updateMove =document.getElementById("moves");
	if(gamecounter<10){
		var counterText=" Move";
	}else{
		var counterText=" Moves";
	}
	updateMove.innerHTML=gamecounter+counterText;
}

//Function to update the game Timer
function updateTimer(time){
	const timer= document.getElementById("gametime");
	var timerText="";
	if(time>=60){
			gameMin =parseInt(time/60);
			time =time%60;
			if(gameMin<10){
				var timerText=gameMin+" Minute ";
			}else{
				var timerText=gameMin+" Minutes ";
			}
	}
	if(time<10){
		var timerText=timerText+time+" Second";
	}else{
		var timerText=timerText+time+" Seconds";
	}
	timer.innerText=""+ timerText;
	return;
	
}

//Function to start the game Timer
function startTimer(startTime){
	if(startTime){
		setTimeout(function(){
			if(solvedCounter < myCards.length){
				gametimer+=1;
				updateTimer(gametimer);				
			}	
			startTimer(true);
		},1000);
	}
}

//Function to toggle the modal
function toggleModal(){
	document.querySelector('.score-panel').classList.toggle('modal_center');
	document.querySelector('.modal_outer').classList.toggle('display_modal');
	document.querySelector('#game_deck').classList.toggle('game_deck');
}