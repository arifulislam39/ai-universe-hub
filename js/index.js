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
    cardsContainer.innerHTML = "";
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


                 <button type="button" class="btn btn-danger"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onClick="arrowButton('${card.id}')"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
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
        .then(data => displayCardDetailsModal(data)
        );
};




// modal section 

const displayCardDetailsModal = (detail) => {


     console.log(detail.data.pricing)

    document.getElementById('modal-description').innerText = detail.data.description;


    // pricing section 
    
    document.getElementById('box-one').innerHTML=`${detail.data.pricing['0'].price} ${detail.data.pricing['0'].plan}`;
    document.getElementById('box-two').innerHTML=`${detail.data.pricing['1'].price} ${detail.data.pricing['1'].plan}`;
    document.getElementById('box-three').innerHTML=`${detail.data.pricing['2'].price} ${detail.data.pricing['2'].plan}`;




    

// features Section

    const convertObj = Object.values(detail.data.features);

    const featuresSection = document.getElementById('Feature-section');
    featuresSection.innerHTML = "";

    convertObj.forEach(feature => {

        const featuresElement = document.createElement('li');
        featuresElement.innerHTML = `
       ${feature.feature_name}
        `;
        featuresSection.appendChild(featuresElement);
    })


    // integrations Section

    const getIntegrations = detail.data.integrations;
    const integrationsSection = document.getElementById('Integration-section');
    integrationsSection.innerHTML = "";
    getIntegrations.forEach(integration => {
        

        const integrationsElement = document.createElement('li');
        integrationsElement.innerHTML = `
         ${integration?integration:'No data found'}
     `;
        integrationsSection.appendChild(integrationsElement)
    })


    // modal image 
    document.getElementById('modal-img').src = detail.data.image_link['0']

    // input & output section 
    document.getElementById('input-section').
    innerText = detail.data.input_output_examples['0'].input;

    document.getElementById('output-section').
    innerText = detail.data.input_output_examples['1'].output;
    //console.log(detail.data.input_output_examples)
 
    

}

//${detail.data.features[2].feature_name? detail.data.features[2].feature_name: 'no data found'}



// sorting by date 

// document.getElementById('sort-by-date').addEventListener('click', function(){
//     console.log('hello')
// })


// let myArray =[];
// function byDate (a, b){
//     const serialDate = new Date(a.arr).valueOf()-new Date (b.arr).valueOf();
//     return serialDate;
// }





loadCards();
arrowButton();
//seeMore();

