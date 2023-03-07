// 6 cards load 
const loadCards = async () => {
    const URL = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(URL);
    const data = await res.json();
    displayCards(data.data.tools.slice(0, 6));
    seeMoreBtn(true);
    toggleSpinner(false)
    sortByDate(data.data.tools.slice(0, 6))

}


// cards information 

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
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;" onClick="detailsBtn('${card.id}')"
                data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
                </button>
                </div>
            </div>
        </div>
        `;

        cardsContainer.appendChild(div);

    })

    sortByDate(cards)

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

// details button section 

const detailsBtn = id => {

    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCardDetailsModal(data)
        );
};




// modal section 

const displayCardDetailsModal = (detail) => {


    console.log(detail.data)

    document.getElementById('modal-description').innerText = detail.data.description;


    // pricing section 
    // box 1
    document.getElementById('box-one').innerHTML = `${detail.data.pricing !== null ? detail.data.pricing['0'].price : 'Free of Cost'} ${detail.data.pricing !== null ? detail.data.pricing['0'].plan : '/Basic'}`;
    // box 2
    document.getElementById('box-two').innerHTML = `${detail.data.pricing !== null ? detail.data.pricing['1'].price : 'Free of Cost'} ${detail.data.pricing !== null ? detail.data.pricing['1'].plan : '/Pro'}`;
    // box 3
    document.getElementById('box-three').innerHTML = `${detail.data.pricing !== null ? detail.data.pricing['2'].price : 'Free of Cost'} ${detail.data.pricing !== null ? detail.data.pricing['2'].plan : '/Enterprise'}`;
    console.log(detail.data.pricing)


    //Modal features Section

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


    //Modal integrations Section

    const getIntegrations = detail.data.integrations;
    // console.log(detail.data.integrations)
    if (getIntegrations === null) {

        const integrationsSection = document.getElementById('Integration-section');
        integrationsSection.innerHTML = "";
        const integrationsElement = document.createElement('li');
        integrationsElement.innerHTML = `<li>No data found`;
        integrationsSection.appendChild(integrationsElement);

        // console.log('nothing show')
    }
    else {

        const integrationsSection = document.getElementById('Integration-section');
        integrationsSection.innerHTML = "";
        getIntegrations.forEach(integration => {
            //console.log(integration)


            const integrationsElement = document.createElement('li');
            integrationsElement.innerHTML = `
         ${integration}
     `;
            integrationsSection.appendChild(integrationsElement)
        })
    }


    // modal image 
    document.getElementById('modal-img').src = `${detail.data.
        image_link['0']}`;

    // btn-accuracy section
    const btnAccuracy = document.getElementById('btn-accuracy');
    btnAccuracy.innerHTML = "";
    const btnAccuracyDiv = document.createElement('div');
    btnAccuracyDiv.innerHTML = `<button style="position: absolute;
    margin: 0;
    top: 2%;
    left: 70%;
    background-color: #fb5353;
    color: white;
    font-size: 16px;
    padding: 12px 24px;
    border: none;
    border-radius: 5px;
    text-align: center;" class="  ${detail.data.accuracy.score ? 'd-block' : 'd-none'} ">${detail.data.accuracy.score === null ? 'no' : detail.data.accuracy.score * 100}%accuracy</button>
        
        `;
    btnAccuracy.appendChild(btnAccuracyDiv)




    // input & output section 
    document.getElementById('input-section').
        innerHTML = `${detail.data.input_output_examples === null ? 'Can you give any example?' : detail.data.input_output_examples['0'].input}`;

    document.getElementById('output-section').
        innerHTML = `${detail.data.input_output_examples === null ? 'No! Not yet!! Take a break!!!' : detail.data.input_output_examples['1'].output}`;
    //console.log(detail.data.input_output_examples)



}


//sorting by date 

const sortByDate = (data) => {
    document.getElementById('sort-by-date').addEventListener('click', () => {
        const sortArrayData = data.sort(
            (x, y) =>
                new Date(x.published_in).getTime() - new Date(y.published_in).getTime()
        );
        displayCards(sortArrayData);
    });
};





loadCards();
detailsBtn();

