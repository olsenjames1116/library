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

        libraryArray.push(userBook);
        displayBooks(libraryArray);
    } else {
        showError();
        event.preventDefault();
    }
});

clearButton.addEventListener('click', () => {
    libraryArray = [];
    displayBooks();
});
