import { js2xml } from 'xml-js';

const data = {
  _declaration: {
    _attributes: {
      version: '1.0',
      encoding: 'utf-8'
    }
  },
  note: {
    _attributes: {
      importance: 'high',
      logged: 'true'
    },
    title: {
      _text: 'Happy'
    },
    todo: [
      {
        _text: 'Work'
      },
      {
        _text: 'Play'
      }
    ]
  }
};

console.log('data', js2xml(data, { compact: true, spaces: 4 }));
