const baseUrl = "http://gateway.marvel.com/";
const apiKey ="3837d58127c2d8d73d7bda851100d507";
const hash ="1fcfb0ff82123c45591cd5affb7b538f";

//Comics request
const getComics = async (offset) => {
    const response = await fetch(`${baseUrl}v1/public/comics?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`);
    const data = await response.json();
    return data;
};

//Create cards
const cardsContainer = document.getElementById("cardsContainer");
const createCard = async (offset) => {
    cardsContainer.innerHTML = "";
    const response = await getComics(offset);
    const data = response.data.results;
    data.forEach(element => {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const title = document.createElement("h3");
        img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
        const titleTxt = document.createTextNode(element.title);
        img.classList.add("card__img");
        title.classList.add("card__h3");
        card.classList.add("card");

        card.appendChild(img);
        title.appendChild(titleTxt);
        card.appendChild(title);
        cardsContainer.appendChild(card);
    });
}

//PAGINATION
let offset = 0;
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

//Calculating the total pages
const getPages = async () =>{
    const response = await getComics(offset);
    const limit = response.data.limit;
    const total = response.data.total;
    let totalPages = total / limit;
    if(totalPages%1 !== 0){
        totalPages = Math.ceil(totalPages);
    }

    return totalPages;
}

//Loading first page
const initFirstPage = () =>{
    createCard(offset);
    disableButtons();
}

//Previous page
const goPreviousPage = ()=>{
    page -= 1;
    offset -= 20;
    createCard(offset);  
}
previousPage.addEventListener("click", () => {
    if(page > 1){
        goPreviousPage();
        disableButtons();
    }
});

//Next page
const goNextPage = ()=>{
    page += 1;
    offset += 20;
    createCard(offset);  
}
nextPage.addEventListener("click", async () => {
    const totalPages = await getPages();
    if(page <= totalPages){
        await goNextPage();
        disableButtons();
    }
});

//First page
const goFirstPage = () => {
    page = 1;
    offset = 0;
    createCard(offset);  
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
    createCard(offset);  
}
lastPage.addEventListener("click", async () => {
    const totalPages = await getPages();
    if(page <= totalPages){
        await goLastPage();
        disableButtons();
    }
});

initFirstPage();



