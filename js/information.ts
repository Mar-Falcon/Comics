const cardsSectionSubTitle = document.getElementById('cardsSectionSubTitle');
const cardInfo = document.getElementById('cardInfo');

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
    const convertDateFormat = (dates) => {
        let releaseDate = "";
        if (dates.type === 'onsaleDate'){
        releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates.date))};                
        return `  ${releaseDate}`;
    }  
    const dateData = element.dates.map(convertDateFormat).join("");      
    const publishedTxt = document.createTextNode(dateData);    
    published.appendChild(publishedTxt);
    info.appendChild(published);
    //Info Writers 
    const writerTitleTxt = document.createTextNode("Writers:");    
    writerTitle.appendChild(writerTitleTxt);
    info.appendChild(writerTitle);
    const formatName = (items) =>{        
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
}

const getCardData = async (e) => {
    const card = e.target;
    const characterId = card.getAttribute('data-id');
    let queryParams = `ts=1&apikey=${apiKey}&hash=${hash}&offset=${offset}`;
    if(selType.value === "comics"){
        const methodComicId = `/v1/public/comics/${characterId}?`;
        const methodComicIdCharacters = `/v1/public/comics/${characterId}/characters?`;
        const comicResponse = await getData(offset,  methodComicId, queryParams);
        console.log(comicResponse);
        const dataComic = comicResponse.data.results;
        const charactersResponse = await getData(offset,  methodComicIdCharacters, queryParams);
        cardsContainer.innerHTML = "";
        cardsSectionSubTitle.innerHTML = "Characters";
        createComicInfo(dataComic[0])
        createCards(offset, charactersResponse);
    } else {
        const methodCharacterId = `/v1/public/characters/${characterId}?`;
        const methodCharacterIdComics = `/v1/public/characters/${characterId}/comics?`;
        const characterResponse = await getData(offset,  methodCharacterId, queryParams);
        const dataCharacter = characterResponse.data.results;
        const comicsResponse = await getData(offset,  methodCharacterIdComics, queryParams);
        cardsContainer.innerHTML = "";
        cardsSectionSubTitle.innerHTML = "Comics";
        createCharacterInfo(dataCharacter[0])
        createCards(offset, comicsResponse);
    }
}
cardsContainer.addEventListener('click', getCardData, false);
