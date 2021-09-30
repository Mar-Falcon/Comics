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
//INPUTS, SELECTORS
var selType = document.getElementById("type");
var inpSearcher = document.getElementById("searcher");
var orderComicsBy = document.getElementById("orderComicsBy");
var orderCharactersBy = document.getElementById('orderCharactersBy');
//CHANGE ORDER OPTIONS 
selType.addEventListener('change', function () {
    if (selType.value === "characters") {
        orderComicsBy.classList.add('d-none');
        orderCharactersBy.classList.remove('d-none');
    }
    else {
        orderComicsBy.classList.remove('d-none');
        orderCharactersBy.classList.add('d-none');
    }
});
//SEARCHER BUTTON
var formSearcher = document.getElementsByClassName("searcherContainer")[0];
var search = function (event) {
    event.preventDefault();
    var formData = event.target;
    var params = new URLSearchParams();
    params.set('type', formData.type.value);
    if (formData.type.value === "comics") {
        params.set('orderBy', "" + formData.orderComicsBy.value);
    }
    else {
        params.set('orderBy', "" + formData.orderCharactersBy.value);
    }
    params.set('searchedTxt', "" + formData.searchedTxt.value);
    params.set('page', '1');
    window.location.href = "index.html?" + params.toString();
};
formSearcher.addEventListener('submit', search);
//FILTERED DATA
var getDataFiltered = function (offset, searchedTxt, type, orderBy) { return __awaiter(_this, void 0, void 0, function () {
    var response, baseParams, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = [];
                baseParams = "?ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset + "&orderBy=" + orderBy;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 11, , 12]);
                if (!(searchedTxt === "" || searchedTxt === null)) return [3 /*break*/, 6];
                if (!(type === "comics")) return [3 /*break*/, 3];
                return [4 /*yield*/, getDataComics(baseParams)];
            case 2:
                response = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, getDataCharacters(baseParams)];
            case 4:
                response = _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 10];
            case 6:
                if (!(type === "comics")) return [3 /*break*/, 8];
                baseParams += "&titleStartsWith=" + searchedTxt;
                return [4 /*yield*/, getDataComics(baseParams)];
            case 7:
                response = _a.sent();
                return [3 /*break*/, 10];
            case 8:
                baseParams += "&nameStartsWith=" + searchedTxt;
                return [4 /*yield*/, getDataCharacters(baseParams)];
            case 9:
                response = _a.sent();
                _a.label = 10;
            case 10:
                createCards(response, type);
                disableButtons(response);
                return [3 /*break*/, 12];
            case 11:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
//LOAD INIT PAGE AND SEARCHED PAGE
var params = new URLSearchParams(window.location.search);
var searchedTxt = params.get("searchedTxt");
var type = params.get("type");
var orderBy = params.get("orderBy");
var offset = params.get("offset");
if (window.location.search === "") { //The only time the url doesn´t have query params it´s at initialization
    location.replace(window.location.pathname + "?type=comics&orderBy=title&searchedTxt=&page=1");
    getDataFiltered(offset || "0", searchedTxt || "", type || "comics", orderBy || "title");
}
else {
    getDataFiltered(offset, searchedTxt, type, orderBy);
}
