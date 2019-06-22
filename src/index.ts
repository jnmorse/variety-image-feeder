import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import morgan from 'morgan';

import { Feed } from './lib/feed/src/feed';
import { FetchImages } from './lib/FetchImages';

dotenv.config();

const PORT: number = 5050;
const BaseURL = `http://localhost:${PORT}/`;
const apiKey = process.env.WALLHAVEN_API_KEY || '';

const app = express();

const feed = new Feed({
  title: 'Image Feed',
  description: 'Feed of images',
  copyright: '2019',
  updated: new Date(),
  link: `http://localhost:${PORT}/`,
  generator: 'awesome',
  id: `http://localhost:${PORT}/`,
  feedLinks: {
    json: `${BaseURL}/feed/json`,
    rss: `${BaseURL}/feed/rss`
  }
});

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

const fetchImages = new FetchImages({
  apiKey,
  categories: [0, 1, 0],
  purity: [0, 1, 1],
  sorting: 0,
  resolution: '1920x1080'
});

app.get('/feed/rss', (req, res) => {
  fetchImages.fetchCurrent().then(() => {
    const currentPage = fetchImages.results.meta.current_page;
    fetchImages.results.data.forEach((entry, index) => {
      feed.addItem({
        title: `Image-${currentPage}-${index}`,
        link: entry.short_url,
        date: new Date(entry.created_at),
        extensions: [
          {
            name: 'media:content',
            objects: {
              _attributes: {
                url: entry.path,
                fileSize: entry.file_size,
                type: entry.file_type,
                medium: 'image',
                width: entry.resolution.split('x')[0],
                height: entry.resolution.split('x')[1]
              }
            }
          }
        ]
      });
    });

    const rss = feed.rss2();
    res.type('application/xml');
    res.send(rss);
  });
});

app.get('/', (req, res) => {
  res.send('updated Jun 22, 2019 9:30am');
});

http.createServer(app).listen(PORT, 'localhost', () => {
  console.log(`Listening at: http://localhost:${PORT}/`);
});
