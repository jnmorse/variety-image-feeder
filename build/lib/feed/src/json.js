"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (ins) => {
    const { options, items, extensions } = ins;
    let feed = {
        version: "https://jsonfeed.org/version/1",
        title: options.title
    };
    if (options.link) {
        feed.home_page_url = options.link;
    }
    if (options.feedLinks && options.feedLinks.json) {
        feed.feed_url = options.feedLinks.json;
    }
    if (options.description) {
        feed.description = options.description;
    }
    if (options.image) {
        feed.icon = options.image;
    }
    if (options.author) {
        feed.author = {};
        if (options.author.name) {
            feed.author.name = options.author.name;
        }
        if (options.author.link) {
            feed.author.url = options.author.link;
        }
    }
    extensions.map((e) => {
        feed[e.name] = e.objects;
    });
    feed.items = items.map((item) => {
        let feedItem = {
            id: item.id,
            // json_feed distinguishes between html and text content
            // but since we only take a single type, we'll assume HTML
            content_html: item.content
        };
        if (item.link) {
            feedItem.url = item.link;
        }
        if (item.title) {
            feedItem.title = item.title;
        }
        if (item.description) {
            feedItem.summary = item.description;
        }
        if (item.image) {
            feedItem.image = item.image;
        }
        if (item.date) {
            feedItem.date_modified = item.date.toISOString();
        }
        if (item.published) {
            feedItem.date_published = item.published.toISOString();
        }
        if (item.author) {
            let author = item.author;
            if (author instanceof Array) {
                // json feed only supports 1 author per post
                author = author[0];
            }
            feedItem.author = {};
            if (author.name) {
                feedItem.author.name = author.name;
            }
            if (author.link) {
                feedItem.author.url = author.link;
            }
        }
        if (item.extensions) {
            item.extensions.map((e) => {
                feedItem[e.name] = e.objects;
            });
        }
        return feedItem;
    });
    return JSON.stringify(feed, null, 4);
};
