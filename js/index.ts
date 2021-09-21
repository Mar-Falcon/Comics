const cardsContainer = document.getElementById("cardsContainer");
let offset = 0;

//Cards
const createCards = async (offset, expectedfunction) => {
    cardsContainer.innerHTML = "";
    let response = await expectedfunction;
    const data = response.data.results;

    data.forEach(element => {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
        let titleTxt;
        if(selType.value === "comics"){     //<-- Comic title
            titleTxt = document.createTextNode(element.title);
        }else{                              //<-- Character name
            titleTxt = document.createTextNode(element.name);
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

//Calculating the total pages

let page = 1;
const previousPage = (<HTMLButtonElement>document.getElementById("previousPage"));
const nextPage = (<HTMLButtonElement>document.getElementById("nextPage"));
const firstPage = (<HTMLButtonElement>document.getElementById("firstPage"));
const lastPage = (<HTMLButtonElement>document.getElementById("lastPage"));

const disableButtons = async () => {
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
    const totalPages = await getPages();
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

const getPages = async () =>{
    const response = await filters(offset);
    const limit = response.data.limit;
    const total = response.data.total;
    let totalPages = total / limit;
    if(totalPages%1 !== 0){
        totalPages = Math.ceil(totalPages);
    }
    return totalPages;
}

//Init
const initFirstPage = () =>{
    createCards(offset, filters(offset));
    disableButtons();
}

//Next page
const goNextPage = () =>{
    page += 1;
    offset += 20;
    createCards(offset, filters(offset));  
}

nextPage.addEventListener("click", async () =>{
    const totalPages = await getPages();
    if(page <= totalPages){
        await goNextPage();
        disableButtons();
    }
});

//Previous page
const goPreviousPage = ()=>{
    page -= 1;
    offset -= 20;
    createCards(offset, filters(offset));  
}

previousPage.addEventListener("click", () =>{
    if(page > 1){
        goPreviousPage();
        disableButtons();
    }
});

//First page
const goFirstPage = () => {
    page = 1;
    offset = 0;
    createCards(offset, filters(offset));  
}
firstPage.addEventListener("click", () => {
    if(page > 1){
        goFirstPage();
        disableButtons();
    }
});

//Last page
const goLastPage = async () => {
    const totalPages = await getPages();
    page = totalPages;
    offset = (totalPages-1)*20;
    createCards(offset, filters(offset));  
}
lastPage.addEventListener("click", async () => {
    const totalPages = await getPages();
    if(page <= totalPages){
        await goLastPage();
        disableButtons();
    }
});

initFirstPage();

const searcherButton = document.getElementById("searcherButton");
searcherButton.addEventListener('click', () =>{
    cardsSectionSubTitle.innerHTML = "Results";
    cardInfo.innerHTML="";
    createCards(offset, filters(offset));
})
