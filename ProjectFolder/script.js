// ===== VARIABLES =====
// these live at the top so every function in the file can use them
let allGames = [];          // every game fetched from the API (never changes after loading)
let selectedGame = null;    // the game whose popup is open right now
let trackedGames = [];      // the games on my list, with status, rating and notes
let currentFilter = "All";  // which status filter is active on My List

// ===== LOAD SAVED LIST =====
// if there's a saved list in localStorage, load it back in as a real array
// the if check is there because on a first visit nothing is saved yet (it would be null)
let saved = localStorage.getItem("trackedGames");
if (saved) {
  trackedGames = JSON.parse(saved);
}

// ===== SHOW MY LIST =====
// redraws the whole tracked list on the page
// only shows games that match the current filter
// note: i is the game's real position in trackedGames, so remove always deletes the right one even when filtered
function renderTrackedList() {
  let html = "";
  for (let i = 0; i < trackedGames.length; i++) {
    let game = trackedGames[i];
    if (currentFilter === "All" || game.status === currentFilter) {
      // title, status and a remove button (data-remove holds the position)
      html += `<li>${game.title} - ${game.status} <button data-remove="${i}">Remove</button>`;
      // rating and notes boxes (data-field says which box, data-index says which game)
      // "|| ''" means show a blank box if nothing has been saved yet
      html += ` <input type="number" min="1" max="10" placeholder="Rating /10" data-field="rating" data-index="${i}" value="${game.rating || ""}">`;
      html += ` <input type="text" placeholder="Notes" data-field="notes" data-index="${i}" value="${game.notes || ""}">`;
      html += `</li>`;
    }
  }
  document.getElementById("tracked-list").innerHTML = html;
}

// show the saved list as soon as the page opens
renderTrackedList();

// ===== LOAD GAMES FROM THE API =====
// gets every game from FreeToGame once, then shows them on the page
async function loadGames() {
  const response = await fetch("https://www.freetogame.com/api/games");
  const games = await response.json();
  allGames = games; // no "let" here so it updates the top level variable instead of making a new one

  // build one <li> per game, data-index is the game's position in allGames
  let html = "";
  for (let i = 0; i < allGames.length; i++) {
    html += `<li data-index="${i}">${allGames[i].title}</li>`;
  }
  document.getElementById("game-list").innerHTML = html;
  console.log(allGames); // handy for checking the data in the console
}

loadGames();

// ===== SEARCH =====
// runs every time the search box changes
// loops through allGames and only keeps the ones with the typed text in the title
// both sides are lowercased so capital letters don't matter
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

// ===== OPEN THE GAME POPUP =====
// one listener on the whole list instead of one per game (event delegation)
// event.target is the exact thing that got clicked
document.getElementById("game-list").addEventListener("click", function(event) {
  // only carry on if the click was on a game (clicking the bullet gives undefined)
  if (event.target.dataset.index) {
    let index = Number(event.target.dataset.index); // dataset gives a string so turn it into a number
    selectedGame = allGames[index];                 // find the full game using its position

    // fill the popup with that game's details
    document.getElementById("modal-title").innerHTML = selectedGame.title;
    document.getElementById("modal-genre").innerHTML = selectedGame.genre;
    document.getElementById("modal-platform").innerHTML = selectedGame.platform;
    document.getElementById("modal-release").innerHTML = selectedGame.release_date;
    document.getElementById("modal-thumbnail").src = selectedGame.thumbnail; // images use .src not innerHTML
    document.getElementById("modal-description").innerHTML = selectedGame.short_description;
    document.getElementById("modal").style.display = "block"; // show the popup
  }
});

// ===== CLOSE THE POPUP =====
document.getElementById("modal-close").addEventListener("click", function() {
  document.getElementById("modal").style.display = "none";
});

// ===== ADD A GAME TO MY LIST =====
// if the game is already on my list it updates the status, if not it adds it as new
document.getElementById("add-button").addEventListener("click", function() {
  let status = document.getElementById("status-select").value; // the status picked in the dropdown
  let found = false; // flips to true if the game is already on the list

  // look through my list for this game, compared by id because it's unique
  for (let i = 0; i < trackedGames.length; i++) {
    if (trackedGames[i].id === selectedGame.id) {
      trackedGames[i].status = status;
      found = true;
    }
  }

  // not on the list yet so add it
  if (found === false) {
    trackedGames.push({
      id: selectedGame.id,
      title: selectedGame.title,
      status: status
    });
  }

  // save to localStorage (it only stores text so stringify first) then redraw
  localStorage.setItem("trackedGames", JSON.stringify(trackedGames));
  renderTrackedList();
});

// ===== REMOVE A GAME =====
// listens on the whole tracked list and only reacts to the remove buttons
document.getElementById("tracked-list").addEventListener("click", function(event) {
  if (event.target.dataset.remove) {
    let index = Number(event.target.dataset.remove);
    trackedGames.splice(index, 1); // splice removes 1 item at that position
    localStorage.setItem("trackedGames", JSON.stringify(trackedGames)); // save the change or it comes back on refresh
    renderTrackedList();
  }
});

// ===== FILTER BUTTONS =====
// changes which status is showing, then redraws the list
document.getElementById("filter-buttons").addEventListener("click", function(event) {
  if (event.target.dataset.status) {
    currentFilter = event.target.dataset.status;
    renderTrackedList();
  }
});

// ===== RATINGS AND NOTES =====
// saves whatever is typed in a rating or notes box
// no renderTrackedList() here on purpose, redrawing while typing would kick the cursor out of the box
document.getElementById("tracked-list").addEventListener("input", function(event) {
  if (event.target.dataset.field) {
    let index = Number(event.target.dataset.index);  // which game
    let field = event.target.dataset.field;          // "rating" or "notes"
    trackedGames[index][field] = event.target.value; // square brackets let a variable be the property name
    localStorage.setItem("trackedGames", JSON.stringify(trackedGames));
  }
});