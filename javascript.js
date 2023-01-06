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

function changeReadStatus(book, event) {
    if (event.target.checked) {
        book.read = true;
    } else {
        book.read = false;
    }
}

function removeBook(book) {
    const bookIndex = libraryArray.indexOf(book);
    libraryArray.splice(bookIndex, 1);
    displayBooks(libraryArray);
}

function createCard(book) {
    const cardElement = document.createElement('div.card');
    const cardTitle = document.createElement('p');
    cardTitle.textContent = book.title;
    cardElement.appendChild(cardTitle);

    const cardAuthor = document.createElement('p');
    cardAuthor.textContent = book.author;
    cardElement.appendChild(cardAuthor);

    const cardPages = document.createElement('p');
    cardPages.textContent = book.pages;
    cardElement.appendChild(cardPages);

    const cardRead = document.createElement('p');
    const cardCheckbox = document.createElement('input');
    cardCheckbox.addEventListener('change', (event) =>
        changeReadStatus(book, event)
    );
    cardCheckbox.setAttribute('type', 'checkbox');
    cardCheckbox.setAttribute('id', 'read');
    cardCheckbox.setAttribute('name', 'read');
    const cardLabel = document.createElement('label');
    cardLabel.setAttribute('for', 'read');
    if (book.read === 'true' || book.read === true) {
        cardCheckbox.setAttribute('checked', '');
    }
    cardRead.appendChild(cardCheckbox);
    cardRead.appendChild(cardLabel);
    cardElement.appendChild(cardRead);

    const removeBookButton = document.createElement('button');
    removeBookButton.setAttribute('type', 'button');
    removeBookButton.textContent = 'Remove Book';
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
    console.table(libraryArray);
    displayBooks(libraryArray);
});
