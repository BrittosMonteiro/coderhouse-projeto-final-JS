const movie_list = document.querySelector(".movie_list");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNDUxNzRkMzcwMGM1YWFiZjIzNWQ2ZDhjZWY1MTQwMyIsInN1YiI6IjY1ODJkMjUyYjM0NDA5NDZlMDFhZWJjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3dqemApaRhZuCyX64_RySFq0XePhbyiTtx3RNUVhu08",
  },
};

// fetch(
//   "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
//   options
// )
//   .then((response) => response.json())
//   .then((response) => {
//     const movies = response.results.slice(0, 9);
//     const body = document.body;
//     body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movies[0].backdrop_path})`;

//     const movie_list = document.querySelector(".movie_list");

//     for (let single_movie in movies) {
//       const { backdrop_path, id, overview, poster_path, title } =
//         movies[single_movie];
//       const movie = document.createElement("div");
//       movie.setAttribute("class", "movie");
//       movie.onclick = () =>
//         (body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`);

//       const img = document.createElement("img");
//       img.setAttribute("class", "");

//       movie_list.append(movie);
//     }
//   })
//   .catch((err) => console.error(err));

const changeCoverMovie = (movies, id) => {
  console.log("bateu");
};

const getPopularMovies = () => {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results.slice(0, 12);
      buildElementsOnScreen(movies);
    })
    .catch((err) => console.log(err));
};

const getTopRatedMovies = () => {
  fetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results.slice(0, 12);
      console.log(movies);
      buildElementsOnScreen(movies);
    })
    .catch((err) => console.log(err));
};

const getPlayingNow = () => {
  fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results.slice(0, 12);
      buildElementsOnScreen(movies);
    })
    .catch((err) => console.log(err));
};

const getUpcomingMovies = () => {
  fetch(
    "https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1",
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

  document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${movies[0].backdrop_path})`;

  for (let single_movie in movies) {
    const { backdrop_path, id, overview, poster_path, title } =
      movies[single_movie];

    const movie = document.createElement("div");
    movie.setAttribute("class", "movie");
    movie.onclick = () =>
      (document.body.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backdrop_path})`);

    const movie_img = document.createElement("img");
    movie_img.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${poster_path}`
    );
    movie_img.style.cursor = "pointer";
    movie.append(movie_img);

    const movie_title = document.createElement("h1");
    movie_title.innerHTML = title;
    movie.append(movie_title);

    const movie_overview = document.createElement("span");
    movie_overview.setAttribute("class", "movie_overview");
    movie_overview.innerHTML = overview;
    movie.append(movie_overview);

    const movie_favorite_btn = document.createElement("button");
    movie_favorite_btn.innerText = "Adicionar aos favoritos";
    movie_favorite_btn.setAttribute("class", "btn-default");
    movie.append(movie_favorite_btn);

    movie_list.append(movie);
  }
};

const removeElementsFromMain = () => {
  while (movie_list.firstChild) {
    movie_list.removeChild(movie_list.firstChild);
  }
};

getPopularMovies();
