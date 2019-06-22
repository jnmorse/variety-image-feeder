"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
var Sorting;
(function (Sorting) {
    Sorting[Sorting["Random"] = 0] = "Random";
})(Sorting = exports.Sorting || (exports.Sorting = {}));
class FetchImages {
    constructor(options) {
        this.options = options;
        this.url = new URL('https://wallhaven.cc/api/v1/search');
        this.results = {
            data: [],
            meta: {
                current_page: 1,
                last_page: 0,
                per_page: 0,
                total: 0
            }
        };
        this.url.searchParams.set('apikey', options.apiKey);
        if (options.purity) {
            const [SFW, Sketchy, NSFW] = options.purity;
            this.url.searchParams.set('purity', `${SFW}${Sketchy}${NSFW}`);
        }
        if (options.categories) {
            const [General, Anime, People] = options.categories;
            this.url.searchParams.set('categories', `${General}${Anime}${People}`);
        }
        if (options.resolution) {
            this.url.searchParams.set('resolution', options.resolution);
        }
    }
    fetchCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield node_fetch_1.default(this.url.toString());
            const results = yield request.json();
            this.results = results;
        });
    }
}
exports.FetchImages = FetchImages;
