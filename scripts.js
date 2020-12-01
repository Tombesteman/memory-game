const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle ('flip');
    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
    }   else {
        // Second click
        hasFlippedCard = false;
        secondCard = this;

        checkForMatch();
    }
}


function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; 

    isMatch ? disableCards() : unFlipCards()

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unFlipCards() {
lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoarc] = [false, false]
    [firstCard, secondCard] = [null, null]
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
