$(function () {

    async function first() {
        let data = await $.getJSON("https://deckofcardsapi.com/api/deck/new/draw/");
        let { suit, value } = data.cards[0];
        console.log(`${value} of ${suit.toLowerCase()}`);
    }

    async function second() {
        let firstCardData = await $.getJSON("https://deckofcardsapi.com/api/deck/new/draw/");
        let deckId = firstCardData.deck_id;
        let secondCardData = await $.getJSON(`https://deckofcardsapi.com/api/deck/${deckId}/draw/`);
        [firstCardData, secondCardData].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value} of ${suit.toLowerCase()}`);
        });
    }

    async function setup() {
        let $btn = $('button');
        let $cards = $('#cards');

        let deckData = await $.getJSON("https://deckofcardsapi.com/api/deck/new/shuffle/");
        $btn.show().on('click', async function () {
            let cardData = await $.getJSON(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/`);
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let x = Math.random() * 40 - 20;
            let y = Math.random() * 40 - 20;
            $cards.append(
                $('<img>', {
                    src: cardSrc,
                    css: {
                        transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`
                    }
                })
            );
            if (cardData.remaining === 0) $btn.remove();
        });
    }
    setup();

});