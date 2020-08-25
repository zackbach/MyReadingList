let myLibrary = []

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

const modal = document.getElementById("bookModal");
const newBook = document.getElementById("newBook");
newBook.onclick = function() {
    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("bookForm").reset();
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  }

function formSubmit() {
    tbAddedBook = new Book(document.getElementById("formTitle").value, document.getElementById("formPages").value + " pages", document.getElementById("formAuthor").value, document.getElementById("formRead").value);
    myLibrary.push(tbAddedBook);
    closeModal();
    render();
}

const renderDiv = document.getElementById("renderDiv");

function render() {
    let index = 0
    renderDiv.innerHTML = "";
    document.getElementById("introText").textContent = "";

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.setAttribute('data-index', index);
        bookDiv.classList.add("book-div");
        index++

        const ul = document.createElement("ul");
        const values = Object.values(book);
        values.forEach((value) => {
            const li = document.createElement("li");
            li.textContent = value;
            ul.appendChild(li);
        })
        bookDiv.appendChild(ul);
        
        const delButton = document.createElement("button");
        delButton.innerHTML = '&times;'; 
        delButton.onclick = function(e) {
            tempIndex = e.target.parentNode.dataset.index;
            myLibrary.splice(tempIndex, 1);
            render()
        }
        delButton.classList.add("x-button");
        delButton.classList.add("button");
        bookDiv.appendChild(delButton);

        const readButton = document.createElement("button");
        readButton.textContent = "T";
        readButton.onclick = function(e) {
            tempIndex = e.target.parentNode.dataset.index;
            readStatus = myLibrary[tempIndex].isRead;
            if (readStatus == "Not yet read") {
                myLibrary[tempIndex].isRead = "Has been read";
            } else {
                myLibrary[tempIndex].isRead = "Not yet read";
            }
            render()
        }
        readButton.classList.add("read-button");
        readButton.classList.add("button");
        bookDiv.appendChild(readButton);

        renderDiv.appendChild(bookDiv);
    })
}