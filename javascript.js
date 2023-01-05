function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read} yet`;
  }
}

const theHobbit = new Book('The Hobbit', 'J R R Tolkien', 290, 'not read');