const baseUrl = "http://gateway.marvel.com/";
const apiKey ="3837d58127c2d8d73d7bda851100d507";
const hash ="1fcfb0ff82123c45591cd5affb7b538f";

//Comics request
const getComics = async (offset) => {
    const response = await fetch(`${baseUrl}v1/public/comics?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`);
    const data = await response.json();
    console.log(data)
    return data;
};
getComics("0");

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


//Calculating the total pages
let offset = 0;
let page = 1;
const previousPage = (<HTMLButtonElement>document.getElementById("previousPage"));
const nextPage = (<HTMLButtonElement>document.getElementById("nextPage"));

const disableButtons = () => {
    console.log(page)
    if(page === 1){ 
        previousPage.disabled=true;
        previousPage.style.backgroundColor = "grey";
    }else{
        previousPage.disabled=false;
        previousPage.style.backgroundColor = "#020202";
    }

}   

const getPages = async () =>{
    const response = await getComics(offset);
    const limit = response.data.limit;
    const total = response.data.total;
    let totalPages = total / limit;
    console.log(totalPages)
    if(totalPages%1 !== 0){
        totalPages = Math.ceil(totalPages);
    }

    return totalPages;
}

const initFirstPage = () =>{
    createCard(offset);
    previousPage.disabled=true;
    previousPage.style.backgroundColor = "grey";
}

//Next page
const goNextPage = ()=>{
    page += 1;
    offset += 20;
    createCard(offset);  
}

nextPage.addEventListener("click", async () =>{
    const totalPages = await getPages();
    if(page <= totalPages){
        goNextPage();
    }else{
        nextPage.disabled=true;
    }
    disableButtons();
});

//Previous page
const goPreviousPage = ()=>{
    page -= 1;
    offset -= 20;
    createCard(offset);  
}

previousPage.addEventListener("click", () =>{
    if(page > 1){
        goPreviousPage();
    }
    disableButtons();
});



initFirstPage();



