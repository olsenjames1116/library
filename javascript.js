// Global declaration of variables
const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const read = document.querySelector('input#read');
const submitButton = document.querySelector('form>button[type=button]');
const mainContent = document.querySelector('div.mainContent');
const libraryArray = [];

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
    const cardElement = document.createElement('div.card');
    cardElement.setAttribute(
        'style',
        'height: 200px; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; background-color: #fee2e2;'
    );
    const cardTitle = document.createElement('p');
    cardTitle.setAttribute('style', 'margin: 0;');
    cardTitle.textContent = `Title: ${book.title}`;
    cardElement.appendChild(cardTitle);

    // Create and display element for book auhor
    const cardAuthor = document.createElement('p');
    cardAuthor.setAttribute('style', 'margin: 0;');
    cardAuthor.textContent = `Author: ${book.author}`;
    cardElement.appendChild(cardAuthor);

    // Create and display element for number of pages in book
    const cardPages = document.createElement('p');
    cardPages.setAttribute('style', 'margin: 0;');
    cardPages.textContent = `Pages: ${book.pages}`;
    cardElement.appendChild(cardPages);

    // Create and display element for whether or not the user has read the book
    const cardRead = document.createElement('p');
    cardRead.setAttribute(
        'style',
        'margin: 0; display: flex; align-items: center;'
    );
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

submitButton.addEventListener('click', () => {
    read.checked === true ? (read.value = true) : (read.value = false);

    const userBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.value
    );

    libraryArray.push(userBook);
    displayBooks(libraryArray);
});
