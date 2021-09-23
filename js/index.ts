const cardsContainer = document.getElementById("cardsContainer");
let offset = 0;
let page = 1;
let cardId = "all";

const updateResultsCount = (count) => {     
    const cardsSectionResultados = document.getElementById("cardsSectionResults");
    cardsSectionResultados.innerHTML = `${count} RESULTADOS`;          
}

//Cards
const createCards = async (offset, expectedfunction) => {
    cardsContainer.innerHTML = "";
    let response = await expectedfunction;    
    let total = response.data.total;
    updateResultsCount(total);
    const data = response.data.results;   
    data.forEach(element => {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");        
        img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
        let titleTxt;
        if(selType.value === "comics"){     //<-- Comic title
            titleTxt = document.createTextNode(element.title || element.name);            
        }else{                              //<-- Character name
            titleTxt = document.createTextNode(element.name || element.title);           
        }
        img.classList.add("card__img");
        title.classList.add("card__h3");        
        card.classList.add("card");
        card.dataset.id = element.id;
        img.dataset.id = element.id;
        title.dataset.id = element.id;

        card.appendChild(img);
        title.appendChild(titleTxt);
        
        card.appendChild(title);
        cardsContainer.appendChild(card);        
    });      
}

//Pagination

const previousPage = (<HTMLButtonElement>document.getElementById("previousPage"));
const nextPage = (<HTMLButtonElement>document.getElementById("nextPage"));
const firstPage = (<HTMLButtonElement>document.getElementById("firstPage"));
const lastPage = (<HTMLButtonElement>document.getElementById("lastPage"));

const disableButtons = async (functionExpected) => {
    //Previous and first page buttons
    if(page === 1){
        previousPage.classList.remove('enabledButton');
        previousPage.classList.add('disabledButton');
        previousPage.disabled=true;
        firstPage.classList.remove('enabledButton');
        firstPage.classList.add('disabledButton');
        firstPage.disabled=true;
    }else{
        previousPage.classList.add('enabledButton');
        previousPage.classList.remove('disabledButton');
        previousPage.disabled=false;
        firstPage.classList.add('enabledButton');
        firstPage.classList.remove('disabledButton');
        firstPage.disabled=false;
    }

    //Next and last page buttons
    const totalPages = await getPages(functionExpected);
    if(page === totalPages){
        nextPage.classList.remove('enabledButton');
        nextPage.classList.add('disabledButton');
        nextPage.disabled=true;
        lastPage.classList.remove('enabledButton');
        lastPage.classList.add('disabledButton');
        lastPage.disabled=true;
    }else{
        nextPage.classList.add('enabledButton');
        nextPage.classList.remove('disabledButton');
        nextPage.disabled=false;
        lastPage.classList.add('enabledButton');
        lastPage.classList.remove('disabledButton');
        lastPage.disabled=false;
    }
}

//Calculating the total pages
const getPages = async (functionExpected) =>{
    const response = await functionExpected;
    const limit = response.data.limit;
    const total = response.data.total;
    let totalPages = total / limit;
    if(totalPages%1 !== 0){
        totalPages = Math.ceil(totalPages);
    }
    return totalPages;
}

//Next page
const goNextPage = () =>{
    page += 1;
    offset += 20; 
}

nextPage.addEventListener("click", async () =>{
    if (cardId == "all") {
        const totalPages = await getPages(filters(offset));
        if(page <= totalPages){
            await goNextPage();
            createCards(offset, filters(offset)); 
            disableButtons(filters(offset));
        }
    } else {
        const totalPages = await getPages(cardsResponse);
        if(page <= totalPages){
            await goNextPage();
            createCards(offset, callInfoMethods(offset)); 
            disableButtons(cardsResponse);
        }
    }
});

//Previous page
const goPreviousPage = ()=>{
    page -= 1;
    offset -= 20;  
}

previousPage.addEventListener("click", () =>{
    if(page > 1){
        goPreviousPage();
        if (cardId == "all") {
            createCards(offset, filters(offset));
            disableButtons(filters(offset));
        } else {
            createCards(offset, callInfoMethods(offset));
            disableButtons(cardsResponse);
        }
    }
});

//First page
const goFirstPage = () => {
    page = 1;
    offset = 0; 
}
firstPage.addEventListener("click", () => {
    if(page > 1){
        goFirstPage();
        if (cardId == "all"){
            createCards(offset, filters(offset)); 
            disableButtons(filters(offset));
        } else {
            createCards(offset, callInfoMethods(offset));
            disableButtons(cardsResponse);
        }
    }
});

//Last page
const goLastPage = async () => {
    let totalPages;
    if (cardId == "all") {
        totalPages = await getPages(filters(offset));
    } else {
        totalPages = await getPages(cardsResponse);
    }
    page = totalPages;
    offset = (totalPages-1)*20;
}
lastPage.addEventListener("click", async () => { 
        if (cardId == "all") {
        const totalPages = await getPages(filters(offset));
            if(page <= totalPages){
                await goLastPage();
                createCards(offset, filters(offset));
                disableButtons(filters(offset));
            }
        } else {
            const totalPages = await getPages(cardsResponse);
            if(page <= totalPages){
                await goLastPage();
                createCards(offset, callInfoMethods(offset));
                disableButtons(cardsResponse);
            }
        }
});


//Init
const initFirstPage = () =>{
    createCards(offset, filters(offset));
    disableButtons(filters(offset));
}

initFirstPage();

const searcherButton = document.getElementById("searcherButton");
searcherButton.addEventListener('click', () =>{
    cardId = "all";
    console.log(cardId);
    cardsSectionSubTitle.innerHTML = "Results";
    cardInfo.innerHTML="";
    createCards(offset, filters(offset));
    updateResultsCount(0);
})


