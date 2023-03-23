import './style.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
    getFirestore,
    addDoc,
    collection,
    serverTimestamp,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBw_aR045Q7m3B5swIcEc8ONEXGpxdYHy0',
    authDomain: 'library-2072e.firebaseapp.com',
    projectId: 'library-2072e',
    storageBucket: 'library-2072e.appspot.com',
    messagingSenderId: '719204014590',
    appId: '1:719204014590:web:b3cf553ac3a2a8866b88af',
    measurementId: 'G-0YXLPKM5F4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Global declaration of variables
const form = document.querySelector('form');
const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const read = document.querySelector('input#read');
const submitButton = document.querySelector('div.buttons>button:first-child');
const clearButton = document.querySelector('div.buttons>button:last-child');
const mainContent = document.querySelector('div.mainContent');
const titleError = document.querySelector('input#title+span.error');
const authorError = document.querySelector('input#author+span.error');
let libraryArray = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Allows the checkbox input for each individual book to change the state of the read property
function changeReadStatus(book, event) {
    if (event.target.checked) {
        book.read = true;
    } else {
        book.read = false;
    }
}

// Removes a book at the user's request from the library
function removeBook(book) {
    const bookIndex = libraryArray.indexOf(book);
    libraryArray.splice(bookIndex, 1);
    displayBooks(libraryArray);
}

async function saveBook(book) {
    try {
        const docRef = await addDoc(collection(db, 'books'), {
            title: book.title,
            author: book.author,
            pages: book.pages,
            read: book.read,
            timestamp: serverTimestamp(),
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
    }
}

// Displays card element to represent book object based on user's input
function createCard(book) {
    // Create and display element for book title
    const cardElement = document.createElement('div');
    const cardTitle = document.createElement('p');
    cardTitle.textContent = `Title: ${book.title}`;
    cardElement.appendChild(cardTitle);

    // Create and display element for book auhor
    const cardAuthor = document.createElement('p');
    cardAuthor.textContent = `Author: ${book.author}`;
    cardElement.appendChild(cardAuthor);

    // Create and display element for number of pages in book
    const cardPages = document.createElement('p');
    cardPages.textContent = `Pages: ${book.pages}`;
    cardElement.appendChild(cardPages);

    // Create and display element for whether or not the user has read the book
    const cardRead = document.createElement('p');
    const cardCheckbox = document.createElement('input');
    // Listen for user's check of read checkbox
    cardCheckbox.addEventListener('change', (event) =>
        changeReadStatus(book, event)
    );
    cardCheckbox.setAttribute('type', 'checkbox');
    cardCheckbox.setAttribute('id', 'read');
    cardCheckbox.setAttribute('name', 'read');
    const cardLabel = document.createElement('label');
    cardLabel.textContent = 'Read';
    // If user has checked read box, display a check mark
    cardLabel.setAttribute('for', 'read');
    if (book.read === 'true' || book.read === true) {
        cardCheckbox.setAttribute('checked', '');
    }
    cardRead.appendChild(cardCheckbox);
    cardRead.appendChild(cardLabel);
    cardElement.appendChild(cardRead);

    // Create and display element for the user to remove book object from library
    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute('type', 'button');
    removeBookButton.textContent = 'Remove from Library';
    removeBookButton.addEventListener('click', () => removeBook(book));
    cardElement.appendChild(removeBookButton);
    return cardElement;
}

function displayBooks(libraryArray) {
    mainContent.innerHTML = '';
    libraryArray.forEach((book) => {
        const card = createCard(book);
        mainContent.appendChild(card);
    });
}

function showError() {
    if (title.validity.valueMissing) {
        authorError.textContent = '';
        titleError.textContent = 'You need to enter a title';
        titleError.className = 'error active';
    } else {
        titleError.textContent = '';
        authorError.textContent = 'You need to enter an author';
        authorError.className = 'error active';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (title.validity.valid && author.validity.valid) {
        titleError.textContent = '';
        authorError.textContent = '';

        read.checked === true ? (read.value = true) : (read.value = false);

        const userBook = new Book(
            title.value,
            author.value,
            pages.value,
            read.value
        );

        saveBook(userBook);

        libraryArray.push(userBook);
        displayBooks(libraryArray);
    } else {
        showError();
    }
});

clearButton.addEventListener('click', () => {
    libraryArray = [];
    displayBooks();
});
