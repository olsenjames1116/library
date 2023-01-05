function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
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
