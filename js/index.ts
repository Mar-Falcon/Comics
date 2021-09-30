const cardsContainer = document.getElementById("cardsContainer");
let totalPages;

//Number of Cards - Results
const updateResultsCount = (count) => {     
    const cardsSectionResultados = document.getElementById("cardsSectionResults");
    cardsSectionResultados.innerHTML = `${count} RESULTS`;          
}

//Creating Cards
const createCards = (response, type) => {
        cardsContainer.innerHTML = "";
        let total = response.data.total;
        updateResultsCount(total);
        const data = response.data.results; 
        console.log(response)  
        data.forEach(element => {
            const a = document.createElement("a");
            const card = document.createElement("div");
            const img = document.createElement("img");
            const title = document.createElement("h3");  
            a.setAttribute("href", `details.html?id=${element.id}&type=${type}&page=1`); 
            if (element.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"){
                img.setAttribute("src", `noImage.jpg`);
            } else {
                img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
            }
            let titleTxt = document.createTextNode(element.title || element.name);

            img.classList.add("card__img");
            title.classList.add("card__h3");        
            card.classList.add("card");
            a.classList.add("anchor");

            a.appendChild(img);
            title.appendChild(titleTxt);
            a.appendChild(title);
            card.appendChild(a);
            cardsContainer.appendChild(card);        
        });      
}

//URL, METHODS
const baseUrl = "https://gateway.marvel.com/";
const apiKey = "72e83d5581cbf2c4cd969d22f6886887";
const hash = "e9c7617587293503cdcaa15162cc303b";


//GET DATA

//Get Data Comics
const getDataComics = async (param): Promise<Comic[]> => {
    let data = [];
    try{
        const response = await fetch(`${baseUrl}v1/public/comics${param}`);
        data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
        return data;
    }
};

//Get Data Characters
const getDataCharacters= async (param): Promise<Character[]> => {
    let data = [];
    try{
        const response = await fetch(`${baseUrl}/v1/public/characters${param}`);
        data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
        return data;
    }
};

//Calculating the Total Pages
const getPages = async (functionExpected) => {
    let totalPages = 0;
    try{
        const response = await functionExpected;
        const limit = response.data.limit;
        const total = response.data.total;
        totalPages = total / limit;
        if(totalPages%1 !== 0){
            totalPages = Math.ceil(totalPages);
        }
        return totalPages;
    }
    catch(error){
        console.log(error);
        return totalPages;
    }
}

//Disabling buttons
const disableButtons = async (functionExpected) => {
    const params = new URLSearchParams(window.location.search);
    try{
        //Previous and first page buttons
        if(parseInt(params.get("page")) === 1){
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
        totalPages = await getPages(functionExpected);
        if(parseInt(params.get("page")) === totalPages){
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
    catch(error){
        console.log(error);
    }
}

// //PAGINATION
const previousPage = (<HTMLButtonElement>document.getElementById("previousPage"));
const nextPage = (<HTMLButtonElement>document.getElementById("nextPage"));
const firstPage = (<HTMLButtonElement>document.getElementById("firstPage"));
const lastPage = (<HTMLButtonElement>document.getElementById("lastPage"));

nextPage.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get("page")) + 1;
    let offset = (page-1)*20;
    params.set("offset", offset.toString());
    params.set("page", page.toString())
    window.location.href = `${window.location.pathname}?${params.toString()}`;
});

//Previous Page
previousPage.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get("page")) - 1;
    let offset = (page-1)*20;
    params.set("offset", offset.toString());
    params.set("page", page.toString())
    window.location.href = `${window.location.pathname}?${params.toString()}`;
});

//First Page
firstPage.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    params.set("offset", "0");
    params.set("page", "1")
    window.location.href = `${window.location.pathname}?${params.toString()}`;
});

//Last Page
lastPage.addEventListener("click", async () => { 
    const params = new URLSearchParams(window.location.search);
    let page = totalPages;
    let offset = (page-1)*20;
    params.set("offset", offset.toString());
    params.set("page", page.toString())
    window.location.href = `${window.location.pathname}?${params.toString()}`;
});

