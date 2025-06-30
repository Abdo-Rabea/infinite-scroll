// selecting elements
const imgContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// functions
// unsplash apid
let canLoad = false;
let imgsCount = 0;
let firstTime = true;

function showLoader() {
  if (firstTime) {
    loader.hidden = false;
    firstTime = false;
  }
}

function hideLoader() {
  loader.hidden = true;
}
function imageLoaded(totalCount) {
  imgsCount++;
  console.log("image loaded", imgsCount);
  if (imgsCount === totalCount) {
    canLoad = true;
    imgsCount = 0;
  }
}
function appendPhotosToContainer(photos) {
  for (const ph of photos) {
    const img = document.createElement("img");
    img.src = ph?.urls.regular;
    img.alt = ph?.alt_description;
    img.title = ph?.alt_description;
    img.addEventListener("click", () => {
      window.open(ph?.links.html);
    });
    img.addEventListener("load", () => {
      imageLoaded(photos.length);
    });
    imgContainer.appendChild(img);
  }
}

async function fetchPhotos() {
  try {
    // fetching photos
    showLoader();
    const count = 30;
    const accessKey = "F_bDPYAPrrVnEyvB2xvDlL5o-2k_iVjm7iH2woXcOMA";
    const response = await fetch(
      `https://api.unsplash.com/photos/random?count=${count}&query=nature&client_id=${accessKey}`
    );
    const data = await response.json();
    hideLoader();
    appendPhotosToContainer(data);
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
      document.documentElement.scrollHeight - 1000 &&
    canLoad
  ) {
    canLoad = false;
    fetchPhotos();
  }
});
``;

// on load
fetchPhotos();
