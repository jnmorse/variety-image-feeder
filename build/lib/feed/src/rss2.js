"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const convert = __importStar(require("xml-js"));
const config_1 = require("./config");
exports.default = (ins) => {
    const { options } = ins;
    let isAtom = false;
    let isContent = false;
    const base = {
        _declaration: { _attributes: { version: '1.0', encoding: 'utf-8' } },
        rss: {
            _attributes: {
                version: '2.0',
                'xmlns:media': 'http://search.yahoo.com/mrss/'
            },
            channel: {
                title: { _text: options.title },
                link: { _text: options.link },
                description: { _text: options.description },
                lastBuildDate: {
                    _text: options.updated
                        ? options.updated.toUTCString()
                        : new Date().toUTCString()
                },
                docs: { _text: 'http://blogs.law.harvard.edu/tech/rss' },
                generator: { _text: options.generator || config_1.generator }
            }
        }
    };
    /**
     * Channel language
     * https://validator.w3.org/feed/docs/rss2.html#ltimagegtSubelementOfLtchannelgt
     */
    if (options.language) {
        base.rss.channel.language = { _text: options.language };
    }
    /**
     * Channel Image
     * http://cyber.law.harvard.edu/rss/rss.html#ltimagegtSubelementOfLtchannelgt
     */
    if (options.image) {
        base.rss.channel.image = {
            title: { _text: options.title },
            url: { _text: options.image },
            link: { _text: options.link }
        };
    }
    /**
     * Channel Copyright
     * http://cyber.law.harvard.edu/rss/rss.html#optionalChannelElements
     */
    if (options.copyright) {
        base.rss.channel.copyright = { _text: options.copyright };
    }
    /**
     * Channel Categories
     * http://cyber.law.harvard.edu/rss/rss.html#comments
     */
    ins.categories.map(category => {
        if (!base.rss.channel.category) {
            base.rss.channel.category = [];
        }
        base.rss.channel.category.push({ _text: category });
    });
    /**
     * Feed URL
     * http://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html
     */
    const atomLink = options.feed || (options.feedLinks && options.feedLinks.atom);
    if (atomLink) {
        isAtom = true;
        base.rss.channel['atom:link'] = [
            {
                _attributes: {
                    href: atomLink,
                    rel: 'self',
                    type: 'application/rss+xml'
                }
            }
        ];
    }
    /**
     * Hub for PubSubHubbub
     * https://code.google.com/p/pubsubhubbub/
     */
    if (options.hub) {
        isAtom = true;
        if (!base.rss.channel['atom:link']) {
            base.rss.channel['atom:link'] = [];
        }
        base.rss.channel['atom:link'] = {
            _attributes: {
                href: options.hub,
                rel: 'hub'
            }
        };
    }
    /**
     * Channel Categories
     * http://cyber.law.harvard.edu/rss/rss.html#hrelementsOfLtitemgt
     */
    base.rss.channel.item = [];
    ins.items.map((entry) => {
        let item = {};
        if (entry.title) {
            item.title = { _cdata: entry.title };
        }
        if (entry.link) {
            item.link = { _text: entry.link };
        }
        if (entry.guid) {
            item.guid = { _text: entry.guid };
        }
        else if (entry.link) {
            item.guid = { _text: entry.link };
        }
        if (entry.date) {
            item.pubDate = { _text: entry.date.toUTCString() };
        }
        if (entry.description) {
            item.description = { _cdata: entry.description };
        }
        if (entry.content) {
            isContent = true;
            item['content:encoded'] = { _cdata: entry.content };
        }
        /**
         * Item Author
         * http://cyber.law.harvard.edu/rss/rss.html#ltauthorgtSubelementOfLtitemgt
         */
        if (Array.isArray(entry.author)) {
            item.author = [];
            entry.author.map((author) => {
                if (author.email && author.name) {
                    item.author.push({ _text: author.email + ' (' + author.name + ')' });
                }
            });
        }
        if (entry.image) {
            item.enclosure = { _attributes: { url: entry.image } };
        }
        if (entry.extensions && entry.extensions.length) {
            entry.extensions.map(extension => {
                item[extension.name] = extension.objects;
            });
        }
        base.rss.channel.item.push(item);
    });
    if (isContent) {
        base.rss._attributes['xmlns:content'] =
            'http://purl.org/rss/1.0/modules/content/';
    }
    if (isAtom) {
        base.rss._attributes['xmlns:atom'] = 'http://www.w3.org/2005/Atom';
    }
    return convert.js2xml(base, {
        compact: true,
        ignoreComment: true,
        spaces: 4
    });
};
