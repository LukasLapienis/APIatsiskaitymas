const buttonContainer = document.createElement("div");
buttonContainer.className = "buttonContainer"
const imageContainer = document.createElement("div");
imageContainer.className = "imageContainer";
document.body.append(buttonContainer, imageContainer);

const button = document.createElement("button");
button.textContent = "New Dog";
buttonContainer.append(button);

const getPhoto = async () => {
  const selectImage = document.querySelector(".image")
  if (selectImage) {
    selectImage.remove()
  }
  const result = await fetch(
    `https://dog.ceo/api/breeds/image/random`
  );
  const data = await result.json();
  const image = document.createElement("img");
  image.className = "image";
  image.src = data.message;
  image.alt = "Dog Image";
  imageContainer.append(image);
};

button.addEventListener("click", getPhoto);

getPhoto();

