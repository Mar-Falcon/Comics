const cardsContainer = document.getElementById("cardsContainer");


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
        data.forEach(element => {
            const a = document.createElement("a");
            const card = document.createElement("div");
            const img = document.createElement("img");
            const title = document.createElement("h3");  
            a.setAttribute("href", `details.html?id=${element.id}&type=${type}`);       
            img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
            let titleTxt = document.createTextNode(element.title || element.name);

            img.classList.add("card__img");
            title.classList.add("card__h3");        
            card.classList.add("card");
            a.classList.add("anchor")

            a.appendChild(img);
            title.appendChild(titleTxt);
            a.appendChild(title);
            card.appendChild(a);
            cardsContainer.appendChild(card);        
        });      
}

//URL, METHODS
const baseUrl = "http://gateway.marvel.com/";
const apiKey ="3837d58127c2d8d73d7bda851100d507";
const hash ="1fcfb0ff82123c45591cd5affb7b538f";


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
        alert("Error: There's a problem with the server")
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
        alert("Error: There's a problem with the server")
        console.log(error);
        return data;
    }
};

//CARDS INITIALIZATION
const initFirstPage = async () => {
    offset = 0;
    let baseParams = `?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}&orderBy=title`;
    const response = await getDataComics(baseParams);
    createCards(response, "comics");
}

const params = new URLSearchParams(window.location.search);

if(window.location.href === "http://127.0.0.1:5500/index.html"){
    initFirstPage();
}


// TO CHECK
// //PAGINATION

// const previousPage = (<HTMLButtonElement>document.getElementById("previousPage"));
// const nextPage = (<HTMLButtonElement>document.getElementById("nextPage"));
// const firstPage = (<HTMLButtonElement>document.getElementById("firstPage"));
// const lastPage = (<HTMLButtonElement>document.getElementById("lastPage"));

// //Disabling buttons
// const disableButtons = async (functionExpected) => {
//     try{
//         //Previous and first page buttons
//         if(page === 1){
//             previousPage.classList.remove('enabledButton');
//             previousPage.classList.add('disabledButton');
//             previousPage.disabled=true;
//             firstPage.classList.remove('enabledButton');
//             firstPage.classList.add('disabledButton');
//             firstPage.disabled=true;
//         }else{
//             previousPage.classList.add('enabledButton');
//             previousPage.classList.remove('disabledButton');
//             previousPage.disabled=false;
//             firstPage.classList.add('enabledButton');
//             firstPage.classList.remove('disabledButton');
//             firstPage.disabled=false;
//         }

//         //Next and last page buttons
//         const totalPages = await getPages(functionExpected);
//         if(page === totalPages){
//             nextPage.classList.remove('enabledButton');
//             nextPage.classList.add('disabledButton');
//             nextPage.disabled=true;
//             lastPage.classList.remove('enabledButton');
//             lastPage.classList.add('disabledButton');
//             lastPage.disabled=true;
//         }else{
//             nextPage.classList.add('enabledButton');
//             nextPage.classList.remove('disabledButton');
//             nextPage.disabled=false;
//             lastPage.classList.add('enabledButton');
//             lastPage.classList.remove('disabledButton');
//             lastPage.disabled=false;
//         }
//     }
//     catch(error){
//         alert("Error: There's a problem with the server")
//         console.log(error);
//     }
// }

// //Calculating the Total Pages
// const getPages = async (functionExpected) => {
//     let totalPages = 0;
//     try{
//         const response = await functionExpected;
//         const limit = response.data.limit;
//         const total = response.data.total;
//         totalPages = total / limit;
//         if(totalPages%1 !== 0){
//             totalPages = Math.ceil(totalPages);
//         }
//         return totalPages;
//     }
//     catch(error){
//         alert("Error: There's a problem with the server")
//         console.log(error);
//         return totalPages;
//     }
// }

// //Next Page
// const goNextPage = () => {
//     page += 1;
//     offset += 20; 
// }

// nextPage.addEventListener("click", async () => {
//     try{
//         if (cardId == "all") {
//             const totalPages = await getPages(filters(offset));
//             if(page <= totalPages){
//                 await goNextPage();
//                 createCards(offset, filters(offset)); 
//                 disableButtons(filters(offset));
//             }
//         } else {
//             const totalPages = await getPages(cardsResponse);
//             if(page <= totalPages){
//                 await goNextPage();
//                 createCards(offset, callInfoMethods(offset)); 
//                 disableButtons(cardsResponse);
//             }
//         }
//     }
//     catch(error){
//         alert("Error: There's a problem with the server")
//         console.log(error);
//     }
// });

// //Previous Page
// const goPreviousPage = () => {
//     page -= 1;
//     offset -= 20;  
// }

// previousPage.addEventListener("click", () => {
//     if(page > 1){
//         goPreviousPage();
//         if (cardId == "all") {
//             createCards(offset, filters(offset));
//             disableButtons(filters(offset));
//         } else {
//             createCards(offset, callInfoMethods(offset));
//             disableButtons(cardsResponse);
//         }
//     }
// });

// //First Page
// const goFirstPage = () => {
//     page = 1;
//     offset = 0; 
// }

// firstPage.addEventListener("click", () => {
//     if(page > 1){
//         goFirstPage();
//         if (cardId == "all"){
//             createCards(offset, filters(offset)); 
//             disableButtons(filters(offset));
//         } else {
//             createCards(offset, callInfoMethods(offset));
//             disableButtons(cardsResponse);
//         }
//     }
// });

// //Last Page
// const goLastPage = async () => {
//     try{
//         let totalPages;
//         if (cardId == "all") {
//             totalPages = await getPages(filters(offset));
//         } else {
//             totalPages = await getPages(cardsResponse);
//         }
//         page = totalPages;
//         offset = (totalPages-1)*20;
//     }
//     catch(error){
//         alert("Error: There's a problem with the server")
//         console.log(error);
//     }
// }
    
// lastPage.addEventListener("click", async () => { 
//     try{
//         if (cardId == "all") {
//         const totalPages = await getPages(filters(offset));
//             if(page <= totalPages){
//                 await goLastPage();
//                 createCards(offset, filters(offset));
//                 disableButtons(filters(offset));
//             }
//         } else {
//             const totalPages = await getPages(cardsResponse);
//             if(page <= totalPages){
//                 await goLastPage();
//                 createCards(offset, callInfoMethods(offset));
//                 disableButtons(cardsResponse);
//             }
//         }
//     }
//     catch(error){
//         alert("Error: There's a problem with the server")
//         console.log(error);
//     }
// });

