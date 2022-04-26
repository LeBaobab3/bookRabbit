const images = [
    "https://cdn.pixabay.com/photo/2020/03/15/13/49/temple-4933682_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/07/21/13/04/landscape-4352732_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/10/11/17/36/gothic-3740388_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/04/06/06/44/astronaut-4106766_960_720.jpg",
    "https://cdn.pixabay.com/photo/2019/05/16/18/56/people-4207884_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/05/06/19/30/girl-5138908_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/10/30/20/46/universe-1784292_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/10/31/02/26/fantasy-2904092_960_720.jpg",
    "https://cdn.pixabay.com/photo/2020/03/15/13/49/temple-4933682_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/02/09/12/28/moon-5998379_960_720.jpg"
];
let books = [];
const select = document.getElementById("books-select");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const author = document.getElementById("author");
const description = document.getElementById("description");

fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((resPost) => resPost.json())
            .then((posts) => {
                books = users.map((user, index) => {
                    let book = {
                        id: user.id,
                        authorName: user.name
                    };
                    const post = posts.find((post) => post.userId === user.id);
                    if (post) {
                        book = {
                            ...book,
                            title: post.title,
                            description: post.body,
                            cover: images[index]
                        };
                    }
                    return book;
                });
                setBook(books[0]);
                books.forEach((book) => {
                    const option = document.createElement("option");
                    option.value = book.id;
                    option.textContent = book.authorName;
                    select.appendChild(option);
                });
                select.addEventListener("change", (event) => {
                    const id = parseInt(event.target.value, 10);
                    const book = books.find((b) => b.id === id);
                    setBook(book);
                });
            });
    })
    .catch((err) => {
        console.log(err);
    });

function setBook(book) {
    title.textContent = book.title;
    author.textContent = book.authorName;
    description.textContent = book.description;
    cover.src = book.cover;
}