const movie_list = document.querySelector(".movie_list");
const movie_about__description = document.querySelector(
  ".movie_about__description"
);
const movie_about__title = document.querySelector(".movie_about__title");
const addToFavoritesBtn = document.querySelector("#add_to_favorites");
const removeFromFavoritesBtn = document.querySelector("#remove_from_favorites");
const addToMustWatchBtn = document.querySelector("#add_to_watch");
const removeFromMustWatchBtn = document.querySelector("#remove_from_watch");
let movie_id = null;
let favoritesList = JSON.parse(localStorage.getItem("favoritesList")) ?? [];
let mustWatchList = JSON.parse(localStorage.getItem("mustWatchList")) ?? [];

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDUxNzRkMzcwMGM1YWFiZjIzNWQ2ZDhjZWY1MTQwMyIsInN1YiI6IjY1ODJkMjUyYjM0NDA5NDZlMDFhZWJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3dqemApaRhZuCyX64_RySFq0XePhbyiTtx3RNUVhu08",
  },
};

const getMoviesList = (listType = "popular") => {
  fetch(
    `https://api.themoviedb.org/3/movie/${listType}?language=pt-BR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results.slice(0, 12);
      buildElementsOnScreen(movies);
    })
    .catch((err) => console.log(err));
};

const buildElementsOnScreen = (movies) => {
  removeElementsFromMain();

  selectedMovie(
    movies[0].id,
    movies[0].backdrop_path,
    movies[0].title,
    movies[0].overview
  );

  for (let single_movie in movies) {
    const { backdrop_path, id, overview, poster_path, title } =
      movies[single_movie];

    const movie = document.createElement("div");
    movie.setAttribute("class", "movie");
    movie.onclick = () => {
      selectedMovie(id, backdrop_path, title, overview);
    };

    const movie_img = document.createElement("img");
    movie_img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${poster_path}`
    );
    movie_img.style.cursor = "pointer";
    movie.append(movie_img);

    const movie_title = document.createElement("h1");
    movie_title.setAttribute("class", "movie_title");
    movie_title.innerHTML = title;
    movie.append(movie_title);

    const movie_overview = document.createElement("span");
    movie_overview.setAttribute("class", "movie_overview");
    movie_overview.innerHTML = overview;
    movie.append(movie_overview);

    const movie_favorite_btn = document.createElement("button");
    movie_favorite_btn.innerText = "Adicionar aos favoritos";
    movie_favorite_btn.setAttribute("class", "btn-default add-to-favorites");
    movie.append(movie_favorite_btn);

    movie_list.append(movie);
  }
};

const removeElementsFromMain = () => {
  while (movie_list.firstChild) {
    movie_list.removeChild(movie_list.firstChild);
  }
};

getMoviesList();

const selectedMovie = (id, backdrop, title, overview) => {
  document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop})`;
  movie_about__title.innerHTML = title;
  movie_about__description.innerText = overview;
  movie_id = id;

  toggleButtons(id);
};

const addToFavorites = (id = movie_id) => {
  favoritesList.push(id);
  localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  toggleButtons(id);
};

const removeFromFavorites = (id = movie_id) => {
  const pos = favoritesList.indexOf(id);
  if (pos == -1) return;

  favoritesList = favoritesList.splice(1, pos);
  localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  toggleButtons(id);
};

const addToMustWatch = (id = movie_id) => {
  mustWatchList.push(id);
  localStorage.setItem("mustWatchList", JSON.stringify(mustWatchList));
  toggleButtons(id);
};

const removeFromMustWatch = (id = movie_id) => {
  const pos = mustWatchList.indexOf(id);
  if (pos == -1) return;

  mustWatchList = mustWatchList.splice(1, pos);
  localStorage.setItem("mustWatchList", JSON.stringify(mustWatchList));
  toggleButtons(id);
};

const toggleButtons = (id) => {
  if (favoritesList.includes(id)) {
    addToFavoritesBtn.style.display = "none";
    removeFromFavoritesBtn.style.display = "block";
  } else {
    addToFavoritesBtn.style.display = "block";
    removeFromFavoritesBtn.style.display = "none";
  }

  if (mustWatchList.includes(id)) {
    addToMustWatchBtn.style.display = "none";
    removeFromMustWatchBtn.style.display = "block";
  } else {
    addToMustWatchBtn.style.display = "block";
    removeFromMustWatchBtn.style.display = "none";
  }
};
