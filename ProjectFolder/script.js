let allGames = [];
let selectedGame = null;
let trackedGames = [];

let saved = localStorage.getItem("trackedGames");
if (saved) {
  trackedGames = JSON.parse(saved);
}

function renderTrackedList() {
  let html = "";
  for (let i = 0; i < trackedGames.length; i++) {
    html += `<li>${trackedGames[i].title} - ${trackedGames[i].status}</li>`;
  }
  document.getElementById("tracked-list").innerHTML = html;
}

renderTrackedList();

async function loadGames() {
  const response = await fetch("https://www.freetogame.com/api/games");
  const games = await response.json();
  allGames = games;

  let html = "";
  for (let i = 0; i < allGames.length; i++) {
    html += `<li data-index="${i}">${allGames[i].title}</li>`;
  }
  document.getElementById("game-list").innerHTML = html;
  console.log(allGames);
}

loadGames();

document.getElementById("search-box").addEventListener("input", function() {
  let searchTerm = document.getElementById("search-box").value;
  let filteredHtml = "";

  for (let i = 0; i < allGames.length; i++) {
    if (allGames[i].title.toLowerCase().includes(searchTerm.toLowerCase())) {
      filteredHtml += `<li data-index="${i}">${allGames[i].title}</li>`;
    }
  }
  document.getElementById("game-list").innerHTML = filteredHtml;
});

document.getElementById("game-list").addEventListener("click", function(event) {
  if (event.target.dataset.index) {
    let index = Number(event.target.dataset.index);
    selectedGame = allGames[index];
    document.getElementById("modal-title").innerHTML = selectedGame.title;
    document.getElementById("modal-genre").innerHTML = selectedGame.genre;
    document.getElementById("modal-platform").innerHTML = selectedGame.platform;
    document.getElementById("modal-release").innerHTML = selectedGame.release_date;
    document.getElementById("modal-thumbnail").src = selectedGame.thumbnail;
    document.getElementById("modal-description").innerHTML = selectedGame.short_description;
    document.getElementById("modal").style.display = "block";
  }
});

document.getElementById("modal-close").addEventListener("click", function() {
  document.getElementById("modal").style.display = "none";
});

document.getElementById("add-button").addEventListener("click", function() {
  let status = document.getElementById("status-select").value;
  let found = false;

  for (let i = 0; i < trackedGames.length; i++) {
    if (trackedGames[i].id === selectedGame.id) {
      trackedGames[i].status = status;
      found = true;
    }
  }

  if (found === false) {
    trackedGames.push({
      id: selectedGame.id,
      title: selectedGame.title,
      status: status
    });
  }

  localStorage.setItem("trackedGames", JSON.stringify(trackedGames));
  renderTrackedList();
});