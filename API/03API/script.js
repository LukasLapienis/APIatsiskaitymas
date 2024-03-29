const buttonContainer = document.createElement("div");
buttonContainer.className = "buttonContainer"
const cardsContainer = document.createElement("div");
cardsContainer.className = "cardsContainer";
document.body.append(buttonContainer, cardsContainer);

const input = document.createElement("input");
input.type = "text";
input.placeholder = "enter ArtWorks to search";

const button = document.createElement("button");
button.textContent = "Search ArtWorks";
buttonContainer.append(input, button);

const getArt = async () => {
  const result = await fetch(`https://openaccess-api.clevelandart.org/api/artworks/?q=art&has_image=1&limit=20`);
  const data = await result.json();
  const itemsData = data.data
  console.log(data)
  console.log(itemsData)
  itemsData.map((itemData) => {
    const cardContainer = document.createElement("div")
    cardContainer.className = "cardContainer";
    const imageContainer = document.createElement("div")
    imageContainer.className = "imageContainer";
    const image = document.createElement("img");
    image.className = "image";
    image.src = itemData.images.web.url;
    image.alt = "art photo"

    imageContainer.append(image);
    cardContainer.append(imageContainer)
    cardsContainer.append(cardContainer)
  });
};

const getSearchedArt = async (event) => {
  event.preventDefault();
  const selectCards = document.querySelectorAll(".cardContainer");
  selectCards.forEach((card) => card.remove());

  const inputValue = input.value.trim();
  input.value = "";
  if (inputValue === "") {
    alert("enter artwork to search")
  }
  const result = await fetch(`https://openaccess-api.clevelandart.org/api/artworks/?q=${inputValue}&has_image=1&limit=20`);
  const data = await result.json();
  const itemsData = data.data
  console.log(data)
  console.log(itemsData)
  itemsData.map((itemData) => {
    const cardContainer = document.createElement("div")
    cardContainer.className = "cardContainer";
    const author = document.createElement("h3")
    if (itemData.creators.length === 0) {
      author.innerText = "no author"
    }
    else {
      author.innerText = itemData.creators[0].description
    }
    const title = document.createElement("h3")
    title.innerText = itemData.title
    const date = document.createElement("h4")
    date.innerText = itemData.creation_date
    const imageContainer = document.createElement("div")
    imageContainer.className = "imageContainer";
    const image = document.createElement("img");
    image.className = "image";
    image.src = itemData.images.web.url;
    image.alt = "art photo"

    imageContainer.append(image)
    cardContainer.append(author, title, date, imageContainer);
    cardsContainer.append(cardContainer)
  });
};

const addEnterKeypress = (event) => {
  if (event.key === "Enter") {
    getSearchedArt(event);
  }
};

button.addEventListener("click", getSearchedArt);
input.addEventListener("keypress", addEnterKeypress);

getArt();


