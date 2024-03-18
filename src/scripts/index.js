const btnDisplayFavorites = document.getElementById("btn_display_favorites");
const btnDisplayMustWatch = document.getElementById("btn_display_must_watch");

const btnPopular = document.getElementById("popular");
const btnTopRated = document.getElementById("top_rated");
const btnPlaying = document.getElementById("now_playing");
const btnUpcoming = document.getElementById("upcoming");
const btnFavorites = document.getElementById("favorites");
const btnMustWatch = document.getElementById("must_watch");
const btnSearchMovie = document.getElementById("btn_search_movie");

btnFavorites.style.display = "none";
btnMustWatch.style.display = "none";

const movie_list = document.querySelector(".movie_list");
const movie_about__description = document.querySelector(
  ".movie_about__description"
);
const movie_about__title = document.querySelector(".movie_about__title");
const addToFavoritesBtn = document.querySelector("#add_to_favorites");
const removeFromFavoritesBtn = document.querySelector("#remove_from_favorites");
const addToMustWatchBtn = document.querySelector("#add_to_watch");
const removeFromMustWatchBtn = document.querySelector("#remove_from_watch");

const navButtons = [btnPlaying, btnPopular, btnTopRated, btnUpcoming];
const specialButtons = [btnFavorites, btnMustWatch, btnSearchMovie];

let movie_id = null;
let favoritesList = JSON.parse(localStorage.getItem("favoritesList")) ?? [];
let mustWatchList = JSON.parse(localStorage.getItem("mustWatchList")) ?? [];

const loadingScreen = document.querySelector(".loading");
const btnMenuIcon = document.getElementById('menu-icon')
const dropdownMenu = document.getElementById('dropdown__menu')

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDUxNzRkMzcwMGM1YWFiZjIzNWQ2ZDhjZWY1MTQwMyIsInN1YiI6IjY1ODJkMjUyYjM0NDA5NDZlMDFhZWJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3dqemApaRhZuCyX64_RySFq0XePhbyiTtx3RNUVhu08",
  },
};

const getMoviesList = (type = "popular") => {
  handleButtons(type);
  loadingScreen.style.display = "flex";
  fetch(
    `https://api.themoviedb.org/3/movie/${type}?language=pt-BR&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results.slice(0, 12);
      buildElementsOnScreen(movies);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      loadingScreen.style.display = "none";
    });
};

const buildElementsOnScreen = (movies) => {
  removeElementsFromMain();

  // console.log(movies);

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

    const user_action = document.createElement("div");
    user_action.setAttribute("class", "user_action");

    const add_to_favorite_btn = document.createElement("button");
    add_to_favorite_btn.setAttribute("class", "movie_about__btn btn-default");
    add_to_favorite_btn.setAttribute("id", `btn_card_add_fav_${id}`);
    add_to_favorite_btn.setAttribute("title", "Adicionar aos meus favoritos");
    add_to_favorite_btn.innerHTML =
      "<i class='ph ph-heart' style='color: white; font-size: 24px'></i>";
    add_to_favorite_btn.onclick = () => addToFavorites(id);

    const remove_from_favorite_btn = document.createElement("button");
    remove_from_favorite_btn.setAttribute(
      "class",
      "movie_about__btn btn-default"
    );
    remove_from_favorite_btn.setAttribute("id", `btn_card_remove_fav_${id}`);
    remove_from_favorite_btn.setAttribute("title", "Nos meus favoritos");
    remove_from_favorite_btn.innerHTML =
      "<i class='ph-fill ph-heart' style='color: white; font-size: 24px'></i>";
    remove_from_favorite_btn.onclick = () => removeFromFavorites(id);

    const add_to_must_watch_btn = document.createElement("button");
    add_to_must_watch_btn.setAttribute("class", "movie_about__btn btn-default");
    add_to_must_watch_btn.setAttribute("id", `btn_card_add_must_watch_${id}`);
    add_to_must_watch_btn.setAttribute("title", "Adicionar para assistir");
    add_to_must_watch_btn.innerHTML =
      "<i class='ph ph-list-plus' style='color: white; font-size: 24px'></i>";
    add_to_must_watch_btn.onclick = () => addToMustWatch(id);

    const remove_from_must_watch_btn = document.createElement("button");
    remove_from_must_watch_btn.setAttribute(
      "class",
      "movie_about__btn btn-default"
    );
    remove_from_must_watch_btn.setAttribute(
      "id",
      `btn_card_remove_must_watch_${id}`
    );
    remove_from_must_watch_btn.setAttribute("title", "Na lista para assistir");
    remove_from_must_watch_btn.innerHTML =
      "<i class='ph ph-list-checks' style='color: white; font-size: 24px'></i>";
    remove_from_must_watch_btn.onclick = () => removeFromMustWatch(id);

    user_action.append(add_to_favorite_btn);
    user_action.append(remove_from_favorite_btn);
    user_action.append(add_to_must_watch_btn);
    user_action.append(remove_from_must_watch_btn);

    movie.append(user_action);
    movie_list.append(movie);
    toggleButtons(id);
  }
};

const removeElementsFromMain = () => {
  while (movie_list.firstChild) {
    movie_list.removeChild(movie_list.firstChild);
  }
};

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
  const user_action = document.querySelector(".user_action");

  const card_add_fav = document.querySelector(`#btn_card_add_fav_${id}`);
  const card_remove_fav = document.querySelector(`#btn_card_remove_fav_${id}`);
  const card_add_must_watch = document.querySelector(
    `#btn_card_add_must_watch_${id}`
  );
  const card_remove_must_watch = document.querySelector(
    `#btn_card_remove_must_watch_${id}`
  );

  if (favoritesList.includes(id)) {
    addToFavoritesBtn.style.display = "none";
    removeFromFavoritesBtn.style.display = "block";

    if (user_action) {
      card_add_fav.style.display = "none";
      card_remove_fav.style.display = "block";
    }
  } else {
    addToFavoritesBtn.style.display = "block";
    removeFromFavoritesBtn.style.display = "none";

    if (user_action) {
      card_add_fav.style.display = "block";
      card_remove_fav.style.display = "none";
    }
  }

  if (mustWatchList.includes(id)) {
    addToMustWatchBtn.style.display = "none";
    removeFromMustWatchBtn.style.display = "block";
    if (user_action) {
      card_add_must_watch.style.display = "none";
      card_remove_must_watch.style.display = "block";
    }
  } else {
    addToMustWatchBtn.style.display = "block";
    removeFromMustWatchBtn.style.display = "none";
    if (user_action) {
      card_add_must_watch.style.display = "block";
      card_remove_must_watch.style.display = "none";
    }
  }
};

const handleFavoritesOrMustWatchMovies = async (type) => {
  if (!type) return;
  closeMenu()

  loadingScreen.style.display = 'flex'
  handleButtons(type);

  if (type == "favorites") {
    var list = favoritesList;
  } else {
    list = mustWatchList;
  }

  let movieList = [];
  for (let id_movie of list) {
    const movie = await fetch(
      `https://api.themoviedb.org/3/movie/${id_movie}?language=pt-BR`,
      options
    );
    const response = await movie.json();
    movieList.push(response);
  }

  loadingScreen.style.display = 'none'

  if (movieList.length > 0) buildElementsOnScreen(movieList);
};

const restart = () => {
  clearSearchText()
  getMoviesList();
};

const handleSearchMovie = (event) => {
  const search_web = document.getElementById("search_text").value;
  const search_mobile = document.getElementById("search_text_mobile").value

  const search_text = search_web || search_mobile

  if (!(event.keyCode === 13) || !search_text) return;

  closeMenu()

  btnSearchMovie.style.display = "flex";
  const btnSpan = document.querySelector("#btn_search_movie span");
  btnSpan.innerText = search_text;
  handleButtons("btn_search_movie");
  searchMovie(search_text);
};

const searchMovie = async (search_text) => {
  if (!search_text) return;

  loadingScreen.style.display = 'flex'

  const search = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search_text}&include_adult=false&language=pt-BR&page=1`,
    options
  );
  const response = await search.json();

  loadingScreen.style.display = 'none'
  buildElementsOnScreen(response.results);
};

const handleButtons = (selected) => {
  for (let button of navButtons) {
    button.classList.remove("btn-selected");
  }
  for (let button of specialButtons) {
    button.style.display = "none";
  }

  switch (selected) {
    case "popular":
      btnPopular.classList.add("btn-selected");
      clearSearchText();
      break;
    case "top_rated":
      btnTopRated.classList.add("btn-selected");
      clearSearchText();
      break;
    case "now_playing":
      btnPlaying.classList.add("btn-selected");
      clearSearchText();
      break;
    case "upcoming":
      btnUpcoming.classList.add("btn-selected");
      clearSearchText();
      break;
    case "favorites":
      btnFavorites.classList.add("btn-selected");
      btnFavorites.style.display = "flex";
      clearSearchText();
      break;
    case "must_watch":
      btnMustWatch.classList.add("btn-selected");
      btnMustWatch.style.display = "flex";
      clearSearchText();
      break;
    case "btn_search_movie":
      btnSearchMovie.classList.add("btn-selected");
      btnSearchMovie.style.display = "flex";
      break;
    default:
      break;
  }
};

const clearSearchText = () => {
  document.getElementById("search_text").value = null;
  document.getElementById("search_text_mobile").value = null;
};

const openMenu = () => {
  dropdownMenu.classList.remove('d-none')
  dropdownMenu.classList.add('d-flex')
}

const closeMenu = () => {
  dropdownMenu.classList.add('d-none')
  dropdownMenu.classList.remove('d-flex')
}

getMoviesList();

// tratar possíveis retornos vazios das listas de favoritos e quero assistir