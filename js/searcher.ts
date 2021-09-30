//INPUTS, SELECTORS
const selType  = (<HTMLInputElement>document.getElementById("type"));
const inpSearcher  = (<HTMLInputElement>document.getElementById("searcher"));
const orderComicsBy = (<HTMLInputElement>document.getElementById("orderComicsBy"));
const orderCharactersBy = (<HTMLInputElement>document.getElementById('orderCharactersBy'));

//CHANGE ORDER OPTIONS 
selType.addEventListener('change', () => {
    if(selType.value === "characters"){
        orderComicsBy.classList.add('d-none')
        orderCharactersBy.classList.remove('d-none')
    }else{
        orderComicsBy.classList.remove('d-none')
        orderCharactersBy.classList.add('d-none')
    }
})

//SEARCHER BUTTON
const formSearcher = document.getElementsByClassName("searcherContainer")[0];

const search = (event) => {
    event.preventDefault();
    const formData = event.target;
    const params = new URLSearchParams();
    params.set('type', formData.type.value)
    if(formData.type.value === "comics"){
        params.set('orderBy', `${formData.orderComicsBy.value}`)
    }else{
        params.set('orderBy', `${formData.orderCharactersBy.value}`)
    }
    params.set('searchedTxt', `${formData.searchedTxt.value}`);
    params.set('page', '1');
    window.location.href = `index.html?${params.toString()}`;  
}

formSearcher.addEventListener('submit', search);

//FILTERED DATA
const getDataFiltered = async (offset, searchedTxt, type, orderBy) => {
    let response = [];
    let baseParams = `?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}&orderBy=${orderBy}`;
    try{
        if(searchedTxt === "" || searchedTxt === null){
            if(type === "comics"){
                response= await getDataComics(baseParams);
            }else{
                response = await getDataCharacters(baseParams);
            }    
        }else{
            if(type === "comics"){
                baseParams += `&titleStartsWith=${searchedTxt}`
                response = await getDataComics(baseParams);
            }else{
                baseParams += `&nameStartsWith=${searchedTxt}`
                response = await getDataCharacters(baseParams);
            }
        }
        createCards(response, type);
        disableButtons(response);
    }
    catch(error){
        console.log(error);
    }
}


//LOAD INIT PAGE AND SEARCHED PAGE
const params = new URLSearchParams(window.location.search);
    let searchedTxt = params.get("searchedTxt");
    let type = params.get("type");
    let orderBy = params.get("orderBy");
    let offset = params.get("offset");
if(window.location.search === ""){ //The only time the url doesn´t have query params it´s at initialization
    location.replace(`${window.location.pathname}?type=comics&orderBy=title&searchedTxt=&page=1`);
    getDataFiltered(offset || "0", searchedTxt || "", type || "comics", orderBy || "title");
} else {
    getDataFiltered(offset, searchedTxt, type, orderBy);
}

