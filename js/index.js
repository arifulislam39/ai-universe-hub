const loadCards = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools.slice(0, 6));
    seeMoreBtn(true);
    toggleSpinner(true);
    
}



const displayCards = cards => {
    
    //console.log(cards)

    cardsContainer = document.getElementById('cards-container');
    cards.forEach(card => {
        //console.log(card.features)
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card">
            <img src="${card.image}" class="card-img-top rounded-5 p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                <li>${card.features[0] ? card.features[0] : "No found data"}</li>
                <li>${card.features[1] ? card.features[1] : "No found data"}</li>
                <li>${card.features[2] ? card.features[2] : "No found data"}</li>
                </ol>
                <hr style="height:2px;border-width:0;color:gray;background-color:gray">
                <h5 class="card-title">${card.name}</h5>
                <div class="d-flex justify-content-between">
                <div class="d-flex align-items-center">
                <i class="fa-regular fa-calendar-days me-2"></i>
                <p class="card-text">${card.published_in}</p>
                </div>

                <i class="fa-solid fa-arrow-right text-danger bg-danger-subtle rounded-circle"></i>

                 <button type="button" class="btn btn-danger"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onClick="arrowButton('${card.id}')"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                Custom button
                </button>
                </div>
            </div>
        </div>
        `;

        cardsContainer.appendChild(div);
    })
}

// see more btn section 

const seeMoreBtn = isShowing => {
    const showMoreBtnSection = document.getElementById('see-more');
    if (isShowing) {
        showMoreBtnSection.classList.remove('d-none');
    }
    else {
        showMoreBtnSection.classList.add('d-none')
    }
}


const seeMore = async () => {
    toggleSpinner(false);
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools);
    seeMoreBtn(false)


}





// spinner or loader section 
// spinner section 

const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none')
    }
};

// arrow button section 

const arrowButton = id => {

    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCardDetails(data)
        );
};




// modal section 

const displayCardDetails = (detail) => {

    console.log(detail.data.features[1].feature_name)
    //console.log(detail.data.integrations[0])

    //console.log(detail);
    const container = document.getElementById('exampleModal');
    container.innerHTML = "";
    const div = document.createElement('div');
    div.classList.add("modal-dialog");
    div.innerHTML = `
    
                <div class="modal-content">
                        <div class="modal-header ">
                            <img src="" alt="" srcset="">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body d-flex justify-content-center gap-5">

                        
                        <div class="card" style="width: 50%;">
                        <div class="card-body">
                        <p class="card-text">${detail.data.features[1].feature_name? detail.data.features[1].feature_name: 'no data found'}</p>
                        <p class="card-text">${detail.data.features[2].feature_name? detail.data.features[2].feature_name: 'no data found'}</p>
                        <p class="card-text">${detail.data.features[3].feature_name? detail.data.features[3].feature_name: 'no data found'}</p>
                        <p>${detail.data.integrations[0]}</p>
                        <p>${detail.data.integrations[1]}</p>
                        <p>${detail.data.integrations[2]}</p>
                        </div>
                        </div>

                    
                        <div class="card" style="width: 50%;">
                        <img src="${detail.data.image_link?detail.data.image_link:'no img found'}"
                         class="card-img-top" alt="...">
                        <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        </div>

                        

                        </div>
                 </div>
    `;
    container.appendChild(div);

}




loadCards();
arrowButton();
//seeMore();

