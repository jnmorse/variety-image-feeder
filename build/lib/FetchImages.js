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
class FetchImages {
    constructor(url) {
        this.url = url;
        this.results = {
            data: [],
            meta: {
                current_page: 1,
                last_page: 0,
                per_page: 0,
                total: 0
            }
        };
    }
    fetchCurrent() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield node_fetch_1.default(this.url);
            const results = yield request.json();
            this.results = results;
        });
    }
}
exports.FetchImages = FetchImages;
