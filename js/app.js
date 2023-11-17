function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js", { scope: '/' }).then(
          (registration) => {
            console.log("Service worker registration succeeded:", registration);
          },
          (error) => {
            console.error(`Service worker registration failed: ${error}`);
          },
        );
    }
    else {
        console.error("Service workers are not supported.");
    }
}

registerServiceWorker()


function getPhoto(resolve) {
    return fetch('https://picsum.photos/500/300')
}

let postList = document.querySelector("#post-list");
//console.log('post list: ', postList)


function initView() {
    // getPhoto()
    // .then(res => {
    //     console.log('photo: ', res)
    //     createPost(res)
    //     return getPhoto()
    // })
    createPost({})
}

initView()

function createPost(photoSrc) {
    let elementString = 
        `<div class="post">
            <img src="${'/images/166-500x300.jpg'}" alt="" class="post-image">
            <div class="post-content">
                <h1 class="title">This is a post</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>`

    let newPost = createElementFromHTML(elementString)

    postList.appendChild(newPost)
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}

let number = 0;
let button = document.querySelector("#create-button")

button.addEventListener('click', handleCreateNewPost)

function handleCreateNewPost() {
    getPhoto()
    .then(res => {
        createNewPost(res)
        return getPhoto()
    })
}

function createNewPost(photoSrc) {
    number++;
    let elementString = 
        `<div class="post">
            <img src="${photoSrc.url}" alt="" class="post-image">
            <div class="post-content">
                <h1 class="title">New post ${number}</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>`

    let newPost = createElementFromHTML(elementString)

    postList.insertBefore(newPost, postList.firstChild)
}
