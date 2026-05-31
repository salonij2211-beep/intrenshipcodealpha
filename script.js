const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const counter = document.getElementById("counter");

const editorImage = document.getElementById("editorImage");

const searchBox = document.getElementById("searchBox");

const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const grayscale = document.getElementById("grayscale");

let currentIndex = 0;
let cropper;

const categories = [
    "nature",
    "city",
    "animals",
    "travel",
    "technology"
];

let imageData = [];

/* ===========================
   GENERATE 100 IMAGES
=========================== */

for(let i=1;i<=100;i++)
{
    let category =
    categories[Math.floor(
        Math.random() * categories.length
    )];

    imageData.push({
        src:
        `https://picsum.photos/600/400?random=${i}`,
        category
    });
}

renderGallery(imageData);

/* ===========================
   RENDER GALLERY
=========================== */

function renderGallery(images)
{
    gallery.innerHTML = "";

    images.forEach((img,index)=>{

        const box =
        document.createElement("div");

        box.classList.add("image-box");

        box.innerHTML =
        `
        <img
        src="${img.src}"
        onclick="openLightbox(${index})"
        >
        `;

        gallery.appendChild(box);
    });
}

/* ===========================
   FILTER
=========================== */

function filterImages(category)
{
    if(category==="all")
    {
        renderGallery(imageData);
        return;
    }

    let filtered =
    imageData.filter(img =>
    img.category === category);

    renderGallery(filtered);
}

/* ===========================
   SEARCH
=========================== */

searchBox.addEventListener(
"keyup",
function()
{
    let value =
    searchBox.value.toLowerCase();

    let filtered =
    imageData.filter(img =>
    img.category
    .toLowerCase()
    .includes(value)
    );

    renderGallery(filtered);
});

/* ===========================
   LIGHTBOX
=========================== */

function openLightbox(index)
{
    currentIndex = index;

    lightbox.style.display =
    "flex";

    lightboxImg.src =
    imageData[currentIndex].src;

    counter.innerHTML =
    `${currentIndex+1}
    /
    ${imageData.length}`;

    loadEditorImage(
        imageData[currentIndex].src
    );
}

function closeLightbox()
{
    lightbox.style.display =
    "none";
}

function changeImage(step)
{
    currentIndex += step;

    if(currentIndex < 0)
    {
        currentIndex =
        imageData.length - 1;
    }

    if(currentIndex >=
       imageData.length)
    {
        currentIndex = 0;
    }

    lightboxImg.src =
    imageData[currentIndex].src;

    counter.innerHTML =
    `${currentIndex+1}
    /
    ${imageData.length}`;

    loadEditorImage(
        imageData[currentIndex].src
    );
}

/* ===========================
   KEYBOARD CONTROL
=========================== */

document.addEventListener(
"keydown",
function(e)
{
    if(e.key==="ArrowRight")
    {
        changeImage(1);
    }

    if(e.key==="ArrowLeft")
    {
        changeImage(-1);
    }

    if(e.key==="Escape")
    {
        closeLightbox();
    }
});

/* ===========================
   CROPPER
=========================== */

function loadEditorImage(src)
{
    editorImage.src = src;

    if(cropper)
    {
        cropper.destroy();
    }

    editorImage.onload = () =>
    {
        cropper =
        new Cropper(
            editorImage,
            {
                viewMode:1,
                autoCropArea:1
            }
        );
    };
}

/* ===========================
   ROTATE
=========================== */

function rotateLeft()
{
    cropper.rotate(-90);
}

function rotateRight()
{
    cropper.rotate(90);
}

/* ===========================
   ZOOM
=========================== */

function zoomIn()
{
    cropper.zoom(0.1);
}

function zoomOut()
{
    cropper.zoom(-0.1);
}

/* ===========================
   CROP
=========================== */

function cropImage()
{
    const canvas =
    cropper.getCroppedCanvas();

    editorImage.src =
    canvas.toDataURL();
}

/* ===========================
   RESET
=========================== */

function resetImage()
{
    cropper.reset();

    brightness.value = 100;
    contrast.value = 100;
    grayscale.value = 0;

    updateFilters();
}

/* ===========================
   FILTERS
=========================== */

brightness.addEventListener(
"input",
updateFilters
);

contrast.addEventListener(
"input",
updateFilters
);

grayscale.addEventListener(
"input",
updateFilters
);

function updateFilters()
{
    editorImage.style.filter =
    `
    brightness(
    ${brightness.value}%)

    contrast(
    ${contrast.value}%)

    grayscale(
    ${grayscale.value}%)
    `;
}

/* ===========================
   DOWNLOAD
=========================== */

function downloadImage()
{
    const canvas =
    cropper.getCroppedCanvas();

    const link =
    document.createElement("a");

    link.href =
    canvas.toDataURL("image/png");

    link.download =
    "edited-image.png";

    link.click();
}

/* ===========================
   CLOSE LIGHTBOX CLICK
=========================== */

lightbox.addEventListener(
"click",
function(e)
{
    if(e.target === lightbox)
    {
        closeLightbox();
    }
});