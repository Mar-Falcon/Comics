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
//URL, METHODS
var baseUrl = "http://gateway.marvel.com/";
var apiKey = "3837d58127c2d8d73d7bda851100d507";
var hash = "1fcfb0ff82123c45591cd5affb7b538f";
var methodAllComics = "v1/public/comics?";
var methodAllCharacters = "/v1/public/characters?";
var comicsOrderBy = document.getElementById("comicsOrderBy");
var charactersOrderBy = document.getElementById('charactersOrderBy');
var getOrderParam = function () {
    var orderParam;
    if (selType.value === "comics") {
        orderParam = "&orderBy=" + comicsOrderBy.value;
    }
    else {
        orderParam = "&orderBy=" + charactersOrderBy.value;
    }
    return orderParam;
};
var getData = function (offset, method, param) { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("" + baseUrl + method + param)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data];
        }
    });
}); };
var filters = function (offset) { return __awaiter(_this, void 0, void 0, function () {
    var queryParams, response, baseParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queryParams = "";
                baseParams = "ts=1&apikey=" + apiKey + "&hash=" + hash + "&offset=" + offset;
                if (!(inpSearcher.value === "")) return [3 /*break*/, 5];
                queryParams = "" + baseParams + getOrderParam();
                if (!(selType.value === "comics")) return [3 /*break*/, 2];
                return [4 /*yield*/, getData(offset, methodAllComics, queryParams)];
            case 1:
                response = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, getData(offset, methodAllCharacters, queryParams)];
            case 3:
                response = _a.sent();
                _a.label = 4;
            case 4: return [3 /*break*/, 9];
            case 5:
                if (!(selType.value === "comics")) return [3 /*break*/, 7];
                queryParams = baseParams + "&titleStartsWith=" + inpSearcher.value + getOrderParam();
                return [4 /*yield*/, getData(offset, methodAllComics, queryParams)];
            case 6:
                response = _a.sent();
                return [3 /*break*/, 9];
            case 7:
                queryParams = baseParams + "&nameStartsWith=" + inpSearcher.value + getOrderParam();
                return [4 /*yield*/, getData(offset, methodAllCharacters, queryParams)];
            case 8:
                response = _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/, response];
        }
    });
}); };
//CHANGE ORDER OPTIONS 
selType.addEventListener('change', function () {
    offset = 0;
    page = 1;
    initFirstPage();
    if (selType.value === "characters") {
        comicsOrderBy.classList.add('d-none');
        charactersOrderBy.classList.remove('d-none');
    }
    else {
        comicsOrderBy.classList.remove('d-none');
        charactersOrderBy.classList.add('d-none');
    }
});
