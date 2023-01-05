const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const read = document.querySelector('input#read');
const submitButton = document.querySelector('form>button[type=button]');

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

    console.table(userBook);
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${read} yet`;
    };
}

const leviathanWakes = new Book(
    'Leviathan Wakes',
    'James S. A. Corey',
    577,
    true
);

console.table(leviathanWakes);

const libraryArray = [leviathanWakes];

console.table(libraryArray);
