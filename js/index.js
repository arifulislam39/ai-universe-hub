const loadCards = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools);
}

const displayCards = cards => {
    CardsContainer = document.getElementById('cards-container');
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('div');
        cardDiv.innerHTML = `
        <div class="card h-100">
                        <img src="${card.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                    </div>
        `;
        CardsContainer.appendChild(cardDiv);
        
    });
}

loadCards();