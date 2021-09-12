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
var baseUrl = "http://gateway.marvel.com/";
var apiKey = "3837d58127c2d8d73d7bda851100d507";
var hash = "1fcfb0ff82123c45591cd5affb7b538f";
//Comics request
var getComics = function (offset) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(baseUrl + "v1/public/comics?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                console.log(data);
                return [2 /*return*/, data];
        }
    });
}); };
getComics("0");
var cardsContainer = document.getElementById("cardsContainer");
var createCard = function (offset) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cardsContainer.innerHTML = "";
                return [4 /*yield*/, getComics(offset)];
            case 1:
                response = _a.sent();
                data = response.data.results;
                data.forEach(function (element) {
                    var card = document.createElement("div");
                    var img = document.createElement("img");
                    var title = document.createElement("h3");
                    img.setAttribute("src", element.thumbnail.path + "." + element.thumbnail.extension);
                    var titleTxt = document.createTextNode(element.title);
                    img.classList.add("card__img");
                    title.classList.add("card__h3");
                    card.classList.add("card");
                    card.appendChild(img);
                    title.appendChild(titleTxt);
                    card.appendChild(title);
                    cardsContainer.appendChild(card);
                });
                return [2 /*return*/];
        }
    });
}); };
//Calculating the total pages
var offset = 0;
var page = 1;
var previousPage = document.getElementById("previousPage");
var nextPage = document.getElementById("nextPage");
var disableButtons = function () {
    console.log(page);
    if (page === 1) {
        previousPage.disabled = true;
        previousPage.style.backgroundColor = "grey";
    }
    else {
        previousPage.disabled = false;
        previousPage.style.backgroundColor = "#020202";
    }
};
var getPages = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, limit, total, totalPages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getComics(offset)];
            case 1:
                response = _a.sent();
                limit = response.data.limit;
                total = response.data.total;
                totalPages = total / limit;
                console.log(totalPages);
                if (totalPages % 1 !== 0) {
                    totalPages = Math.ceil(totalPages);
                }
                return [2 /*return*/, totalPages];
        }
    });
}); };
var initFirstPage = function () {
    createCard(offset);
    previousPage.disabled = true;
    previousPage.style.backgroundColor = "grey";
};
//Next page
var goNextPage = function () {
    page += 1;
    offset += 20;
    createCard(offset);
};
nextPage.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var totalPages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getPages()];
            case 1:
                totalPages = _a.sent();
                if (page <= totalPages) {
                    goNextPage();
                }
                else {
                    nextPage.disabled = true;
                }
                disableButtons();
                return [2 /*return*/];
        }
    });
}); });
//Previous page
var goPreviousPage = function () {
    page -= 1;
    offset -= 20;
    createCard(offset);
};
previousPage.addEventListener("click", function () {
    if (page > 1) {
        goPreviousPage();
    }
    disableButtons();
});
initFirstPage();
