
const images = [
  "https://i.pinimg.com/736x/e1/6d/56/e16d56779665fdc3b962665a31abaa42.jpg",
  "https://fehaute.com/image/catalog/product/2024-04/10/4e06904a60e46045354d23fb703895f8.png",
  "https://fehaute.com/image/catalog/product/2024-05/22/be946d44dcecfb7038e4b50840f7b9ce.jpg"
];

let currentImageIndex = 0;

function updateImage() {
  const imageElement = document.getElementById("productImage");
  imageElement.src = images[currentImageIndex];
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImage();
}

function addToCart() {
  alert("Item added to your basket.");
}

function toggleFavorite(button) {
  if (button.textContent.includes("♡")) {
    button.textContent = "♥ Favorited";
  } else {
    button.textContent = "♡ Favorite";
  }
}
