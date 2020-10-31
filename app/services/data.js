import Service from '@ember/service';
import ENV from 'ember-book-club2/config/environment';
import { A } from '@ember/array'
import { set } from '@ember/object';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('books' , A());
  },

  async getBooks() {
    let response = await fetch(`${ENV.backendURL}/books`);
    let books = await response.json();
    this.get('books').clear();
    this.get('books').pushObjects(books);
    return this.get('books');
  },

  getBook(id) {
    //return fetch(`${ENV.backendURL}/books/${id}`).then((response) => response.json());
    return this.get('books').find((book) => book.id === parseInt(id));
  },

  deleteBook(book) {
    this.get('books').removeObject(book);
    return fetch(`${ENV.backendURL}/books/${book.id}`, { method: 'DELETE' })
  },
  
  createBook(book) {
    this.get('books').pushObject(book);
    return fetch(`${ENV.backendURL}/books`, 
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(book)
    })
  },
  
  updateBook(book) {
    set(this.get('books').find((bookCycle)=> bookCycle.id === book.id), 'title', book.title);
    return fetch(`${ENV.backendURL}/books/${book.id}`, 
    {
      method: 'PATCH',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(book)
    })
  },

  getSpeakers() {
    return fetch(`${ENV.backendURL}/speakers`).then((response) => response.json());
  },
  getSpeaker(id) {
    return fetch(`${ENV.backendURL}/speakers/${id}`).then((response) => response.json());
  },
  deleteSpeaker(speaker) {
    return fetch(`${ENV.backendURL}/speakers/${speaker.id}`, { method: 'DELETE' });
  },
});
