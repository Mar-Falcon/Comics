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
//const formSearcher = document.getElementById("formSearcher");
const formSearcher = document.getElementsByClassName("searcherContainer")[0];

const search = (event) => {
    event.preventDefault;
    const formData = event.target;
    const params = new URLSearchParams(window.location.search);

    params.set('type', formData.type.value)
    if(formData.type.value === "comics"){
        console.log("comics")
        params.set('orderBy', `${formData.orderComicsBy.value}`)
    }else{
        console.log("characters")
        params.set('orderBy', `${formData.orderCharactersBy.value}`)
    }
    params.set('searchedTxt', `${formData.searchedTxt.value}`)

    window.location.href = `index.html?${params.toString()}`;
}

formSearcher.addEventListener('submit', search);


let offset = 0;
//FILTERED DATA
const getDataFiltered = async () => {
    let response = [];
    const params = new URLSearchParams(window.location.search);
    let baseParams = `?ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`; //&orderBy=${params.get("orderBy")}

    try{
        if(params.get("searchedTxt") === ""){
            if(params.get("type") === "comics"){
                response= await getDataComics(baseParams);
            }else{
                response = await getDataCharacters(baseParams);
            }    
        }else{
            if(params.get("type") === "comics"){
                baseParams += `&titleStartsWith=${params.get("searchedTxt")}`
                response = await getDataComics(baseParams);
                console.log(response)
            }else{
                baseParams += `&nameStartsWith=${params.get("searchedTxt")}`
                response = await getDataCharacters(baseParams);
            }
        }
        createCards(response, params.get("type"));
    }
    catch(error){
        alert("Error: There's a problem with the server")
        console.log(error);
    }
}
    
getDataFiltered();

