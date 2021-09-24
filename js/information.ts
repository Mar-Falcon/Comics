const cardsSectionSubTitle = document.getElementById('cardsSectionSubTitle');
const cardInfo = document.getElementById('cardInfo');
let cardsResponse;

//Converter Date
const convertDateFormat = (date) => {
    return new Intl.DateTimeFormat('es-AR').format(new Date(date));  
}  

//CARD INFORMATION

//Character Information
const createCharacterInfo = (element) => {
    cardInfo.innerHTML = "";
    const img = document.createElement("img");
    const info = document.createElement("div");
    const name = document.createElement("h2");
    const description = document.createElement("p");
    img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
    img.classList.add("cardInfo__img");
    name.classList.add("cardInfo__name");
    const nameTxt = document.createTextNode(element.name);
    const descriptionTxt = document.createTextNode(element.description);
    name.appendChild(nameTxt);
    description.appendChild(descriptionTxt);
    cardInfo.appendChild(img);
    info.appendChild(name);
    info.appendChild(description);
    cardInfo.appendChild(info);
}

//Comic Information
const createComicInfo = (element) => {
    cardInfo.innerHTML = "";
    const img = document.createElement("img");
    const info = document.createElement("div");
    const title = document.createElement("h2");
    const publishedTitle = document.createElement("h3");
    const writerTitle = document.createElement("h3");
    const descriptionTitle = document.createElement("h3");
    const published = document.createElement("p");
    const writer = document.createElement("p");
    const description = document.createElement("p");
    img.setAttribute("src", `${element.thumbnail.path}.${element.thumbnail.extension}`);
    img.classList.add("cardInfo__img");
    publishedTitle.classList.add("cardInfo__title");
    title.classList.add("cardInfo__title");
    writerTitle.classList.add("cardInfo__title");
    descriptionTitle.classList.add("cardInfo__title");
    published.classList.add("cardInfo__p");
    writer.classList.add("cardInfo__p");
    description.classList.add("cardInfo__p");
    const titleTxt = document.createTextNode(element.title);   
    title.appendChild(titleTxt);
    cardInfo.appendChild(img);
    info.appendChild(title);

    //Info Published
    const publishedTitleTxt = document.createTextNode("Published:");    
    publishedTitle.appendChild(publishedTitleTxt);
    info.appendChild(publishedTitle); 
    const dateData = element.dates.map(element => {
        let releaseDate = "";
        if (element.type === 'onsaleDate'){
        return convertDateFormat(element.date);
        }
    }).join('');
    const publishedTxt = document.createTextNode(dateData);    
    published.appendChild(publishedTxt);
    info.appendChild(published);

    //Info Writers 
    const writerTitleTxt = document.createTextNode("Writers:");    
    writerTitle.appendChild(writerTitleTxt);
    info.appendChild(writerTitle);
    const formatName = (items) => {        
        let writer = "";
        if (items.role === 'writer'){            
            writer = items.name;            
        }        
        return writer;
    }
    const writerData = element.creators.items.map(formatName).join("");    
    console.log(element.creators.items[0]);    
    const writerTxt = document.createTextNode(writerData);    
    writer.appendChild(writerTxt);
    info.appendChild(writer);

    //Info Description
    const descriptionTitleTxt = document.createTextNode("Description:");    
    descriptionTitle.appendChild(descriptionTitleTxt);
    info.appendChild(descriptionTitle);
    const descriptionTxt = document.createTextNode(element.description || "");    
    description.appendChild(descriptionTxt);
    info.appendChild(description);

    cardInfo.appendChild(info);
    updateResultsCount(0);
}

const cardsRelated = (response) => {
    if(response.data.total === 0){
        const notResults = document.createElement('h2');
        const txtNotResults = document.createTextNode('No results found');
        notResults.appendChild(txtNotResults);
        cardsContainer.appendChild(notResults);
    }else{
        createCards(offset, response);
    }
}


const callInfoMethods = async(offset) => {
    cardsResponse = "";

    let queryParams = `ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
    if(selType.value === "comics"){
        const methodComicId = `/v1/public/comics/${cardId}?`;
        const methodComicIdCharacters = `/v1/public/comics/${cardId}/characters?`;
        const comicResponse = await getData(offset,  methodComicId, queryParams);
        const dataComic = comicResponse.data.results;
        cardsResponse = await getData(offset,  methodComicIdCharacters, queryParams);
        cardsContainer.innerHTML = "";
        cardsSectionSubTitle.innerHTML = "Characters";
        createComicInfo(dataComic[0])
        
    } else {
        const methodCharacterId = `/v1/public/characters/${cardId}?`;
        const methodCharacterIdComics = `/v1/public/characters/${cardId}/comics?`;
        const characterResponse = await getData(offset,  methodCharacterId, queryParams);
        const dataCharacter = characterResponse.data.results;
        cardsResponse = await getData(offset,  methodCharacterIdComics, queryParams);
        cardsContainer.innerHTML = "";
        cardsSectionSubTitle.innerHTML = "Comics";
        createCharacterInfo(dataCharacter[0])
    }
    cardsRelated(cardsResponse);
}


const getCardData = async (e) => {
    const card = e.target;
    cardId = card.getAttribute('data-id');
    console.log(cardId);
    callInfoMethods(offset);
}
cardsContainer.addEventListener('click', getCardData, false);
