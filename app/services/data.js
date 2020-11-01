import Service from '@ember/service';
import ENV from 'ember-book-club2/config/environment';
import { A } from '@ember/array'
import { set } from '@ember/object';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('books' , A());
    this.set('speakers' , A());
  },

  async getBooks(search) {
    let queryParams = '';
    if (search) {
      queryParams = `?q=${search}`;
    }
    let response = await fetch(`${ENV.backendURL}/books${queryParams}`);
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
  
  async createBook(book) {
    await fetch(`${ENV.backendURL}/books`, 
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(book)
    });
    let response = await fetch(`${ENV.backendURL}/books`);
    let books = await response.json();
    set(book, 'id', books[books.length-1].id)
    this.get('books').pushObject(book);
    },
  
  updateBook(book) {
    let bookOld = this.get('books').find((bookCycle)=> bookCycle.id === book.id);
    set(bookOld, 'imgUrl', book.imgUrl);
    set(bookOld, 'descUrl', book.descUrl);
    set(bookOld, 'countPages', book.countPages);
    set(bookOld, 'author', book.author);
    set(bookOld, 'title', book.title);
    return fetch(`${ENV.backendURL}/books/${book.id}`, 
    {
      method: 'PATCH',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(book)
    });
  },

  async getSpeakers(search) {
    let queryParams = '';
    if (search) {
      queryParams = `?q=${search}`;
    }
    let response = await fetch(`${ENV.backendURL}/speakers${queryParams}`);
    let speakers = await response.json();
    this.get('speakers').clear();
    this.get('speakers').pushObjects(speakers);
    return this.get('speakers');
  },

  getSpeaker(id) {
     return this.get('speakers').find((speaker) => speaker.id === parseInt(id));
  },

  deleteSpeaker(speaker) {
    this.get('speakers').removeObject(speaker);
    return fetch(`${ENV.backendURL}/speakers/${speaker.id}`, { method: 'DELETE' })
  },
  
  async createSpeaker(speaker) {
    await fetch(`${ENV.backendURL}/speakers`, 
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(speaker)
    });
    let response = await fetch(`${ENV.backendURL}/speakers`);
    let speakers = await response.json();
    set(speaker, 'id', speakers[speakers.length-1].id)
    this.get('speakers').pushObject(speaker);
    },
  
  updateSpeaker(speaker) {
    let speakerOld = this.get('speakers').find((speakerCycle)=> speakerCycle.id === speaker.id);
    set(speakerOld, 'lastName', speaker.lastName);
    set(speakerOld, 'firstName', speaker.firstName);
    return fetch(`${ENV.backendURL}/speakers/${speaker.id}`, 
    {
      method: 'PATCH',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(speaker)
    });
  },
});
