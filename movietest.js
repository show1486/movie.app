const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OGQ0NTJkZDQ2ZTkwYTA0MWEwNGJlMzBiNzdmMmQ3ZSIsInN1YiI6IjY1ZTgxYmQxNDJmMTlmMDE4NzhkNzdkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zW858EaTQE30E8LoiNFa8Z1eqEebWfAllpm9T8pwmus",
  },
};
// let moviess;
fetch(
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    //데이터 변수에 할당
    let movies = response.results;

    // UI 데이터 가공
    renderMovies(movies);

    // 클릭 시 함수호출
    const button = document.getElementById("search_btn");

    button.addEventListener("click", (e) => {
      e.preventDefault();

      // 클릭 시 실행할 함수호출
      search(movies);
    });
  })
  .catch((err) => console.error(err));

// 기본 UI 생성(데이터활용)
function renderMovie(moviedata) {
  const movieDiv = document.createElement("div");
  const movieImg = document.createElement("img");
  const movieTitle = document.createElement("h2");
  const movieText = document.createElement("p");

  movieImg.src = `https://image.tmdb.org/t/p/w500/${moviedata.backdrop_path}`;
  movieTitle.textContent = `${moviedata.title}`;
  movieText.textContent = `${moviedata.overview}`;
  movieDiv.id = `${moviedata.id}`;
  movieDiv.append(movieImg, movieTitle, movieText);

  document.querySelector(".section").append(movieDiv);

  movieDiv.addEventListener("click", () => {
    const Id = moviedata.id;
    alert(Id);
  });
}

// 클릭시 실행할 함수선언
function search(movies) {
  // input의 데이터할당
  const input = document.getElementById("searchinput");
  const inputValue = input.value.toLowerCase();

  // Title 변수에 데이터 가공(title걸러내기)
  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(inputValue);
  });

  renderMovies(filteredMovies);
}

// 해당 영화있을때
function renderMovies(movies) {
  const section = document.querySelector(".section");
  section.innerHTML = "";

  movies.forEach((movie) => {
    renderMovie(movie);
  });
}

// 해당 영화없을때
