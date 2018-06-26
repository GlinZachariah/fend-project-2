/*
 * Create a list that holds all of your cards
 */
 const starIcon = "fa-diamond";
 const anchorIcon = "fa-anchor";
 const boltIcon = "fa-bolt";
 const cubeIcon = "fa-cube";
 const leafIcon = "fa-leaf";
 const bicycleIcon = "fa-bicycle";
 const bombIcon = "fa-bomb";
 const planeIcon = "fa-plane";
 
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
const OPEN_CARD = 'open';
const SHOW_CARD = 'show'; 
const MATCH_CARD ='match';
document.addEventListener("DOMContentLoaded",function(event){
	shuffle(myCards);
	insertCard();
	createCardAction();
	createRating();
	const resetBtn = document.getElementById('restart');
	resetBtn.addEventListener("click",reset);
});

function insertCard(event){
	for(let i=0; i< myCards.length; i++){
		let cardElement = document.createElement('i');
		cardElement.classList.add("fa");
		cardElement.classList.add(myCards[i]);
		let cardEle = document.getElementById("card"+i);
		cardEle.appendChild(cardElement);
	}
	
};

// Shuffle function from http://stackoverflow.com/a/2450976
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
 function createCardAction(){
 	for(let i=0; i< myCards.length; i++){
 		let cardClicked = document.getElementById("card"+i);
		cardClicked.addEventListener("click",cardAction);
 	}
 }

const star1 =document.getElementById('star1');
const star2 =document.getElementById('star2');
const star3 =document.getElementById('star3');
const STAR='fa-star';
const NO_STAR='fa-star-o';
let star1List =star1.classList;
let star2List =star2.classList;
let star3List =star3.classList;

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
 function createRating(){
 		removeOldRating();
 	if(gamecounter==0){
 		star1List.toggle(NO_STAR);
 		star2List.toggle(NO_STAR);
 		star3List.toggle(NO_STAR);
 	}else if(gamecounter <=30){
 		star1List.toggle(STAR);
 		star2List.toggle(STAR);
 		star3List.toggle(STAR);
 	}else if(gamecounter <=40){
 		star1List.toggle(STAR);
 		star2List.toggle(STAR);
 		star3List.toggle(NO_STAR);
 	}else{
 		star1List.toggle(STAR);
 		star2List.toggle(NO_STAR);
 		star3List.toggle(NO_STAR);
 	}
 }
 

let isOpen =false;
let openCard =[];
let matchedCards = [];
let solvedCounter=0; 
let gamecounter=0;
let starRating =0;


function showCard(card){
	card.classList.add(OPEN_CARD);
	card.classList.add(SHOW_CARD);
	if(openCard.length>0){
		if(openCard[0].id != card.id){
			openCard.push(card);
			gamecounter+=1;
			isOpen=!isOpen;
		}else{
			hideCard();
		}
	}else{
		openCard.push(card);
		gamecounter+=1;
		isOpen=!isOpen;
	}
	return;	
}

function removeOldCard(){
	for(let i=0;i<myCards.length;i++){
		let oldCardEle = document.getElementById('card'+i);
		oldCardEle.innerHTML="";
	}
	return;
}

function reset(){
	if(matchedCards.length>0){
		for(let matchedCard of matchedCards){
			matchedCard.classList.remove(MATCH_CARD);
		}
	}
	hideCard();
	gamecounter=0;
	createRating();
	isOpen=false;
	starRating=0;
	removeOldCard();
	shuffle(myCards);
	insertCard();
	createCardAction();
	updateOnScreen();
}

function makeMatch(){
	openCard[0].classList.add(MATCH_CARD);
	openCard[1].classList.add(MATCH_CARD);
	matchedCards.push(openCard[0]);
	matchedCards.push(openCard[1]);
	hideCard();
	if(solvedCounter <= myCards.length){
		solvedCounter+=2;
		console.log(solvedCounter);
		if(gamecounter <= 30){

		} 
		if(solvedCounter ==myCards.length){
			createRating();
			setTimeout(alert("Solved"),3000);
		}	
	}
	return;
}

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

function updateOnScreen(){
	const updateMove =document.getElementById("moves");
	updateMove.innerHTML=""+gamecounter;
}

function cardAction(event){
	if(isOpen == false){
		showCard(event.target);
	}else{
		showCard(event.target);
		isOpen= !isOpen;
		//console.log(openCard);
		if(openCard.length>1){
			if(openCard[0].children[0].classList[1] == openCard[1].children[0].classList[1] ){
				if(openCard[0].id != openCard[1].id ){
					setTimeout(makeMatch(),3000);
				}
			}else{
				setTimeout(hideCard(),10000);
			}	
		}
	}
	updateOnScreen();
}