const baseUrl = "http://gateway.marvel.com/";
const apiKey ="3837d58127c2d8d73d7bda851100d507";
const hash ="1fcfb0ff82123c45591cd5affb7b538f";

//Comics request
 
const getComics = async () => {
    const response = await fetch(`${baseUrl}v1/public/comics?ts=1&apikey=${apiKey}&hash=${hash}`);
    const data = await response.json();
    return data;
};
getComics();

const cardsContainer = document.getElementById("cardsContainer");

const createCard = async () => {
    const response = await getComics();
    const data = response.data.results;
    console.log(data.thumbnail)
    data.forEach(element => {
        console.log(element)
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

createCard();