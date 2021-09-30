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
var cardsSectionSubTitle = document.getElementById('cardsSectionSubTitle');
var cardInfo = document.getElementById('cardInfo');
var pagination = document.getElementById('pagination');
//Converter Date
var convertDateFormat = function (date) {
    return new Intl.DateTimeFormat('es-AR').format(new Date(date));
};
//CARD INFORMATION
//Character Information
var createCharacterInfo = function (element) {
    cardInfo.innerHTML = "";
    var img = document.createElement("img");
    var info = document.createElement("div");
    var name = document.createElement("h2");
    var description = document.createElement("p");
    img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
    img.classList.add("cardInfo__img");
    name.classList.add("cardInfo__name");
    var nameTxt = document.createTextNode(element.name);
    var descriptionTxt = document.createTextNode(element.description);
    name.appendChild(nameTxt);
    description.appendChild(descriptionTxt);
    cardInfo.appendChild(img);
    info.appendChild(name);
    info.appendChild(description);
    cardInfo.appendChild(info);
};
//Comic Information
var createComicInfo = function (element) {
    cardInfo.innerHTML = "";
    var img = document.createElement("img");
    var info = document.createElement("div");
    var title = document.createElement("h2");
    var publishedTitle = document.createElement("h3");
    var writerTitle = document.createElement("h3");
    var descriptionTitle = document.createElement("h3");
    var published = document.createElement("p");
    var writer = document.createElement("p");
    var description = document.createElement("p");
    img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
    img.classList.add("cardInfo__img");
    publishedTitle.classList.add("cardInfo__title");
    title.classList.add("cardInfo__title");
    writerTitle.classList.add("cardInfo__title");
    descriptionTitle.classList.add("cardInfo__title");
    published.classList.add("cardInfo__p");
    writer.classList.add("cardInfo__p");
    description.classList.add("cardInfo__p");
    var titleTxt = document.createTextNode(element.title);
    title.appendChild(titleTxt);
    cardInfo.appendChild(img);
    info.appendChild(title);
    //Info Published
    var publishedTitleTxt = document.createTextNode("Published:");
    publishedTitle.appendChild(publishedTitleTxt);
    info.appendChild(publishedTitle);
    var dateData = element.dates.map(function (element) {
        var releaseDate = "";
        if (element.type === 'onsaleDate') {
            return convertDateFormat(element.date);
        }
    }).join('');
    var publishedTxt = document.createTextNode(dateData);
    published.appendChild(publishedTxt);
    info.appendChild(published);
    //Info Writers 
    var writerTitleTxt = document.createTextNode("Writers:");
    writerTitle.appendChild(writerTitleTxt);
    info.appendChild(writerTitle);
    var formatName = function (items) {
        var writer = "";
        if (items.role === 'writer') {
            writer = items.name;
        }
        return writer;
    };
    var writerData = element.creators.items.map(formatName).join("");
    var writerTxt = document.createTextNode(writerData);
    writer.appendChild(writerTxt);
    info.appendChild(writer);
    //Info Description
    var descriptionTitleTxt = document.createTextNode("Description:");
    descriptionTitle.appendChild(descriptionTitleTxt);
    info.appendChild(descriptionTitle);
    var descriptionTxt = document.createTextNode(element.description || "");
    description.appendChild(descriptionTxt);
    info.appendChild(description);
    cardInfo.appendChild(info);
    updateResultsCount(0);
};
var cardsRelated = function (response, type) {
    cardsContainer.innerHTML = "";
    if (response.data.total === 0) {
        var notResults = document.createElement('h2');
        var txtNotResults = document.createTextNode('No results found');
        notResults.appendChild(txtNotResults);
        cardsContainer.appendChild(notResults);
        pagination.classList.add('d-none');
    }
    else {
        pagination.classList.remove('d-none');
        if (type === "comics") {
            createCards(response, "characters");
        }
        else {
            createCards(response, "comics");
        }
    }
};
//Generate Card Information Page
var getCardInfo = function () { return __awaiter(_this, void 0, void 0, function () {
    var cardsResponse, params, offset, baseParams, methodComicId, methodComicIdCharacters, comicResponse, dataComic, methodCharacterId, methodCharacterIdComics, characterResponse, dataCharacter, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardsResponse = [];
                params = new URLSearchParams(window.location.search);
                offset = params.get("offset");
                baseParams = "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                if (!(params.get("type") === "comics")) return [3 /*break*/, 4];
                methodComicId = "/" + params.get("id") + baseParams;
                methodComicIdCharacters = "/" + params.get("id") + "/characters" + baseParams;
                return [4 /*yield*/, getDataComics(methodComicId)];
            case 2:
                comicResponse = _a.sent();
                dataComic = comicResponse.data.results;
                return [4 /*yield*/, getDataComics(methodComicIdCharacters)];
            case 3:
                cardsResponse = _a.sent();
                cardsSectionSubTitle.innerHTML = "Characters";
                createComicInfo(dataComic[0]);
                return [3 /*break*/, 7];
            case 4:
                methodCharacterId = "/" + params.get("id") + baseParams;
                methodCharacterIdComics = "/" + params.get("id") + "/comics" + baseParams;
                return [4 /*yield*/, getDataCharacters(methodCharacterId)];
            case 5:
                characterResponse = _a.sent();
                dataCharacter = characterResponse.data.results;
                return [4 /*yield*/, getDataCharacters(methodCharacterIdComics)];
            case 6:
                cardsResponse = _a.sent();
                cardsSectionSubTitle.innerHTML = "Comics";
                createCharacterInfo(dataCharacter[0]);
                _a.label = 7;
            case 7:
                cardsRelated(cardsResponse, params.get("type"));
                disableButtons(cardsResponse);
                return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
getCardInfo();
