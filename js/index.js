const loadCards = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools);
}

const displayCards = cards => {
    console.log(cards)
}

loadCards();