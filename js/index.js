var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var cardsContainer = document.getElementById("cardsContainer");
//Number of Cards - Results
var updateResultsCount = function (count) {
    var cardsSectionResultados = document.getElementById("cardsSectionResults");
    cardsSectionResultados.innerHTML = count + " RESULTS";
};
//Creating Cards
var createCards = function (response, type) {
    cardsContainer.innerHTML = "";
    var total = response.data.total;
    updateResultsCount(total);
    var data = response.data.results;
    data.forEach(function (element) {
        var a = document.createElement("a");
        var card = document.createElement("div");
        var img = document.createElement("img");
        var title = document.createElement("h3");
        a.setAttribute("href", "details.html?id=" + element.id + "&type=" + type);
        img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
        var titleTxt = document.createTextNode(element.title || element.name);
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
};
//URL, METHODS
var baseUrl = "http://gateway.marvel.com/";
var apiKey = "3837d58127c2d8d73d7bda851100d507";
var hash = "1fcfb0ff82123c45591cd5affb7b538f";
//GET DATA
//Get Data Comics
var getDataComics = function (param) { return __awaiter(_this, void 0, void 0, function () {
    var data, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(baseUrl + "v1/public/comics" + param)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                return [2 /*return*/, data];
            case 4:
                error_1 = _a.sent();
                alert("Error: There's a problem with the server");
                console.log(error_1);
                return [2 /*return*/, data];
            case 5: return [2 /*return*/];
        }
    });
}); };
//Get Data Characters
var getDataCharacters = function (param) { return __awaiter(_this, void 0, void 0, function () {
    var data, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(baseUrl + "/v1/public/characters" + param)];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 3:
                data = _a.sent();
                return [2 /*return*/, data];
            case 4:
                error_2 = _a.sent();
                alert("Error: There's a problem with the server");
                console.log(error_2);
                return [2 /*return*/, data];
            case 5: return [2 /*return*/];
        }
    });
}); };
//CARDS INITIALIZATION
var initFirstPage = function () { return __awaiter(_this, void 0, void 0, function () {
    var baseParams, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                offset = 0;
                baseParams = "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset + "&orderBy=title";
                return [4 /*yield*/, getDataComics(baseParams)];
            case 1:
                response = _a.sent();
                createCards(response, "comics");
                return [2 /*return*/];
        }
    });
}); };
var params = new URLSearchParams(window.location.search);
if (window.location.href === "http://127.0.0.1:5500/index.html") {
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
