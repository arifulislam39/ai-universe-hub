
// load all cards 

const loadCards = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools/`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools.slice(0, 6));
}

// display all cards 
const displayCards = (cards) => {


    CardsContainer = document.getElementById('cards-container');
    CardsContainer.innerHTML = "";
    cards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('div');
        cardDiv.innerHTML = `
        <div class="card h-100">
            <img src="${card.image}" class="card-img-top p-4 rounded-5" alt="...">
                <div class="card-body">
                        <h5 class="card-title">Features
                        </h5>
                        <ol>
                        <li>${card.features[0]}</li>
                        <li>${card.features[1]}</li>
                        <li>${card.features[2]}</li>
                        </ol>
                        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                        <h5 class="card-title">${card.name}</h5>

                        <div class="d-flex justify-content-between">
                         <div class="d-flex">

                          <div><i class="fa-regular fa-calendar-days"></i></div>

                          <div><p class="card-text">${card.published_in}</p></div>

                         </div>
                         <div>
                         <i class="fa-solid fa-arrow-right text-danger text-left"></i>
                         </div>
                        </div>
                </div>
         </div>
        `;
        CardsContainer.appendChild(cardDiv);

    });
}

const seeMore = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools/`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools);
}

loadCards();