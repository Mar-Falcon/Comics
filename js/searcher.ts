//INPUTS, SELECTORS
const selType  = (<HTMLInputElement>document.getElementById("type"));
const inpSearcher  = (<HTMLInputElement>document.getElementById("searcher"));

//URL, METHODS
const baseUrl = "http://gateway.marvel.com/";
const apiKey ="3837d58127c2d8d73d7bda851100d507";
const hash ="1fcfb0ff82123c45591cd5affb7b538f";
const methodAllComics = `v1/public/comics?`;
const methodAllCharacters = `/v1/public/characters?`;
const comicsOrderBy = (<HTMLInputElement>document.getElementById("comicsOrderBy"));
const charactersOrderBy = (<HTMLInputElement>document.getElementById('charactersOrderBy'));

const getOrderParam = () =>{
    let orderParam;
    if(selType.value === "comics"){
        orderParam = `&orderBy=${comicsOrderBy.value}`
    }else{
        orderParam = `&orderBy=${charactersOrderBy.value}`
    }
    return orderParam;
}

const getData = async (offset, method, param) => {
    const response = await fetch(`${baseUrl}${method}${param}`);
    const data = await response.json();
    return data;
};

const filters = async (offset)=>{
    let queryParams = "";
    let response;
    let baseParams = `ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
    if(inpSearcher.value === ""){
        queryParams = `${baseParams}${getOrderParam()}`;
        if(selType.value === "comics"){
            response = await getData(offset, methodAllComics, queryParams);
        }else{
            response = await getData(offset, methodAllCharacters, queryParams);
        }    
    }else{
        if(selType.value === "comics"){
            queryParams = `${baseParams}&titleStartsWith=${inpSearcher.value}${getOrderParam()}`
            response = await getData(offset, methodAllComics, queryParams);
        }else{
            queryParams = `${baseParams}&nameStartsWith=${inpSearcher.value}${getOrderParam()}`
            response = await getData(offset, methodAllCharacters, queryParams);
        }
    }
    return response;
}


//CHANGE ORDER OPTIONS 
selType.addEventListener('change', ()=>{
    offset= 0;
    page = 1;
    initFirstPage();
    if(selType.value === "characters"){
        comicsOrderBy.classList.add('d-none')
        charactersOrderBy.classList.remove('d-none')
    }else{
        comicsOrderBy.classList.remove('d-none')
        charactersOrderBy.classList.add('d-none')
    }
})

