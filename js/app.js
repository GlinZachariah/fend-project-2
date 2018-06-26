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
 for(let i=0; i< myCards.length; i++){
 	let cardClicked = document.getElementById("card"+i);
	cardClicked.addEventListener("click",cardAction);
 }

let isOpen =false;
let openCard ='';
let matchedCards = []; 

function showCard(){
	event.target.classList.add(OPEN_CARD);
	event.target.classList.add(SHOW_CARD);
}

function makeMatch(){
	openCard.classList.add(MATCH_CARD);
	event.target.classList.add(MATCH_CARD);
}

function hideCard(){
	openCard.classList.remove(OPEN_CARD);
	openCard.classList.remove(SHOW_CARD);
	event.target.classList.remove(OPEN_CARD);
	event.target.classList.remove(SHOW_CARD);
	console.log(event.target);
}

function cardAction(event){
	showCard();
	if(isOpen == false){
		openCard =event.target;
		isOpen= !isOpen;
	}else{
		if(openCard.children[0].classList[1] == event.target.children[0].classList[1] && openCard.id != event.target.id ){
			setTimeout(makeMatch(this.event),3000);
		}else{
			isOpen= !isOpen;
			setTimeout(hideCard(this.event),5000);
		}	
	}
}