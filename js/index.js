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
                        <h5 class="card-title">Features
                        </h5>
                        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                        <h5 class="card-title">${card.name}</h5>
                            <p class="card-text">${card.published_in}</p>
                        </div>
                    </div>
        `;
        CardsContainer.appendChild(cardDiv);
        
    });
}

loadCards();