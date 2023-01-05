const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const read = document.querySelector('input#read');
const submitButton = document.querySelector('form>button[type=button]');
const libraryArray = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
    console.table(libraryArray);
});
