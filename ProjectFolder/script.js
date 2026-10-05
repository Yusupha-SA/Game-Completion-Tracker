let allGames = [];
async function loadGames() {
  const response = await fetch("https://www.freetogame.com/api/games");
  const games = await response.json();
  allGames = games;
  let html = "";

for (let i = 0; i < allGames.length; i++) {
  html += "<li>" + allGames[i].title + "</li>";
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
    filteredHtml += "<li>" + allGames[i].title + "</li>";
  }
}

document.getElementById("game-list").innerHTML = filteredHtml;

});