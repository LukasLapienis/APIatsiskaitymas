const API_KEY = "bf9d5ff8"

const searchContainer = document.createElement("div");
searchContainer.className = "searchContainer";
const cardContainer = document.createElement("div");
cardContainer.className = "cardContainer";
document.body.append(searchContainer, cardContainer);

const input = document.createElement("input");
input.type = "text";
input.placeholder = "enter movie title";

const button = document.createElement("button");
button.textContent = "Search Movie";
searchContainer.append(input, button);

const getMovie = async (event) => {
  event.preventDefault();
  const selectAllCards = document.querySelectorAll(".card");
  if (selectAllCards) {
    selectAllCards.forEach((card) => card.remove());
  }

  const inputValue = input.value.trim();
  input.value = "";
  if (inputValue === "") {
    alert("enter a movie title")
  }
  else {
    const result = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${inputValue}`);
    const data = await result.json();

    if (data.Search) {
      const movies = data.Search
      movies.map((movieData) => {
      const card = document.createElement("div")
      card.className = "card";
      const title = document.createElement("h3")
      title.innerText = movieData.Title
      const poster = document.createElement("img");
      poster.className = "poster"
      poster.src = movieData.Poster;
      poster.alt = "Movie Poster";
      const date = document.createElement("h4")
      date.innerText = movieData.Year

      card.append(title, date, poster)
      cardContainer.append(card);
      });
    }
    else {
      const errorMessage = document.createElement("h2");
      errorMessage.innerText = `movie not found`;
      errorMessage.className = "card";
      cardContainer.append(errorMessage);
    }
  }
};

const addEnterKeypress = (event) => {
  if (event.key === "Enter") {
    getMovie(event);
  }
};

button.addEventListener("click", getMovie);

input.addEventListener("keypress", addEnterKeypress);