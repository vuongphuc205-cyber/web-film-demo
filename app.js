const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
  const itemNumber = movieLists[i].querySelectorAll("img").length;
  let clickCounter = 0;
  arrow.addEventListener("click", () => {
    const ratio = Math.floor(window.innerWidth / 270);
    clickCounter++;
    if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0) {
      movieLists[i].style.transform = `translateX(${
        movieLists[i].computedStyleMap().get("transform")[0].x.value - 300
      }px)`;
    } else {
      movieLists[i].style.transform = "translateX(0)";
      clickCounter = 0;
    }
  });

  console.log(Math.floor(window.innerWidth / 270));
});

//TOGGLE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);

ball.addEventListener("click", () => {
  items.forEach((item) => {
    item.classList.toggle("active");
  });
  ball.classList.toggle("active");
});
//video autoplay
  document.addEventListener('click', function () {
    const video = document.getElementById('myVideo');
    video.volume = 1.0; // đảm bảo có âm thanh
    video.play();
  }, { once: true }); // chỉ chạy 1 lần sau click đầu tiên
// Mở popup tìm kiếm
document.querySelector(".fa-search").addEventListener("click", () => {
  document.querySelector(".search-popup").classList.toggle("active");
});

// Bookmark click
let bookmarkCount = 0;
document.querySelector(".fa-bookmark").addEventListener("click", (e) => {
  bookmarkCount++;
  document.querySelector(".bookmark-badge").innerText = bookmarkCount;
  e.target.classList.toggle("active");
});

// Scroll to top khi click Home
document.querySelector(".fa-home").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth', transition: 'all 0.3s ease' });
});
//Hàm lưu ls
function saveHistory(movie) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  const index = history.findIndex(item => item.id === movie.id);

  if (index >= 0) {
    history[index] = movie; // cập nhật
  } else {
    history.unshift(movie); // thêm mới
  }

  if (history.length > 10) history.pop();
  localStorage.setItem("history", JSON.stringify(history));
}
//Hàm render ls
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  const container = document.getElementById("history-list");
  if (!container) return;

  container.innerHTML = "";
  history.forEach(movie => {
    const item = document.createElement("div");
    item.className = "history-item";
    item.innerHTML = `
      <img class="history-thumb" src="${movie.thumbnail}" alt="${movie.title}">
      <div class="history-info">
        <h3>${movie.title}</h3>
        <div class="progress-bar">
          <div class="progress" style="width: ${movie.progress}%;"></div>
        </div>
        <small>Đã xem ${movie.progress}%</small>
      </div>
    `;
    container.appendChild(item);
  });
}
//load trang
document.addEventListener("DOMContentLoaded", () => {
  renderHistory();
});
//xem tiep
// Ví dụ: khi người dùng xem được 40% phim ID=2
saveHistory({
  id: 2,
  title: "Doctor Strange",
  thumbnail: "https://example.com/doctor-strange.jpg",
  progress: 40
});
