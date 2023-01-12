// Global declaration of variables
const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const read = document.querySelector('input#read');
const submitButton = document.querySelector('div.buttons>button:first-child');
const clearButton = document.querySelector('div.buttons>button:last-child');
const mainContent = document.querySelector('div.mainContent');

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    set title(value) {
        this._title = value
    }

    get title() {
        return this._title;
    }

    set author(value) {
        this._author = value;
    }

    get author() {
        return this._author;
    }

    set pages(value) {
        this._pages = value;
    }

    get pages() {
        return this._pages;
    }

    set read(value) {
        this._read = value;
    }

    get read() {
        return this._read;
    }

    // Allows the checkbox input for each individual book to change the state of the read property
    changeReadStatus(book, event) {
        if (event.target.checked) {
            book.read = true;
        } else {
            book.read = false;
        }
    }
}

class Library {
    constructor(array) {
        this.array = array;
    }

    get array() {
        return this._array;
    }

    set array(value) {
        this._array = value;
    }

    pushValue(value){
        this._array.push(value);
    }

    displayArray(){
        mainContent.innerHTML = '';
        this.array.forEach((book) => {
        const card = createCard(book);
        mainContent.appendChild(card);
        });
    }

    // Removes a book at the user's request from the library
    removeBook(book) {
        const bookIndex = this.array.indexOf(book);
        this.array.splice(bookIndex, 1);
        this.displayArray(this.array);
    }
}

let library = new Library([]);

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
        book.changeReadStatus(book, event)
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
    removeBookButton.addEventListener('click', () => library.removeBook(book));
    cardElement.appendChild(removeBookButton);
    return cardElement;
}

submitButton.addEventListener('click', () => {
    read.checked === true ? (read.value = true) : (read.value = false);

    const userBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.value
    );

    library.pushValue(userBook);
    library.displayArray();
});

clearButton.addEventListener('click', () => {
    library.array = [];
    library.displayArray();
});
