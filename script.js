// selecting elements
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// functions
// unsplash apid
let isLoading = false;
function startLoadingPhotos() {
  loader.hidden = false;
  isLoading = true;
}

function finishLoadingPhotos() {
  loader.hidden = true;
  isLoading = false;
}

function appendPhotosToContainer(photos) {
  for (const ph of photos) {
    const img = document.createElement("img");
    img.src = ph?.urls.full;
    img.alt = ph?.alt_description;
    img.title = ph?.alt_description;
    img.addEventListener("click", () => {
      window.open(ph?.links.html);
    });
    imgContainer.appendChild(img);
  }
}

async function fetchPhotos() {
  try {
    startLoadingPhotos();

    // fetching photos
    const count = 5;
    const accessKey = "jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek";
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}&query=nature&client_id=${accessKey}`
    );
    const data = await response.json();

    // todo: remove me
    for (const img of data) {
      console.log(img?.urls.regular);
      console.log(img?.alt_description);
      console.log(img?.links?.html);
    }
    appendPhotosToContainer(data);
    finishLoadingPhotos();
  } catch (error) {
    console.log(error);
  }
}

let test = true;
// event listener to check if the user reached neer the bottom of the page
window.addEventListener("scroll", () => {
  // *scrollY how much user scrolled from top of the page to the top of the viewport
  // *innerHeight: the visible height of the window with sid bars, not including upper bar or others chrome stuff
  // *scrollHeight: all height that you can scroll: means the height of visible and non-visible
  // * all length are in px
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 50
  ) {
    console.log("hello scroller");
  }
});
``;

// on load
fetchPhotos();
