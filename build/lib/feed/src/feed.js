"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom1_1 = __importDefault(require("./atom1"));
const json_1 = __importDefault(require("./json"));
const rss2_1 = __importDefault(require("./rss2"));
class Feed {
    constructor(options) {
        this.items = [];
        this.categories = [];
        this.contributors = [];
        this.extensions = [];
        this.addItem = (item) => this.items.push(item);
        this.addCategory = (category) => this.categories.push(category);
        this.addContributor = (contributor) => this.contributors.push(contributor);
        this.addExtension = (extension) => this.extensions.push(extension);
        /**
         * Returns a Atom 1.0 feed
         */
        this.atom1 = () => atom1_1.default(this);
        /**
         * Returns a RSS 2.0 feed
         */
        this.rss2 = () => rss2_1.default(this);
        /**
         * Returns a JSON1 feed
         */
        this.json1 = () => json_1.default(this);
        this.options = options;
    }
}
exports.Feed = Feed;
