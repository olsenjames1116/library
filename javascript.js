const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const read = document.querySelector('input#read');
const submitButton = document.querySelector('form>button[type=button]');
const removeButton = document.querySelector('body>button');
const mainContent = document.querySelector('div.mainContent');
const libraryArray = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
    cardRead.textContent = book.read;
    cardElement.appendChild(cardRead);

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
    if (read.checked === true) {
        read.value = true;
    } else {
        read.value = false;
    }

    const userBook = new Book(
        title.value,
        author.value,
        pages.value,
        read.value
    );

    libraryArray.push(userBook);
    displayBooks(libraryArray);
});

removeButton.addEventListener('click', () => {
    libraryArray.pop();
    console.table(libraryArray);
});
