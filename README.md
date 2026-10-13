# Game Completion Tracker

A MyAnimeList style tracker for free to play games. Search a live library of games, open a detail popup, and build a personal list with a status, a rating and notes for each game. Your list is saved in your browser, so it is still there when you come back.

This is project 2 of my self directed JavaScript portfolio series, where I build three projects to move from games development into software development.

## Features

- Fetches live game data from the FreeToGame API when the page loads
- Live search that filters the game list as you type
- Click any game to open a popup with its cover image, genre, platform, release date and description
- Add a game to your personal list with a status: Playing, Completed, Backlog or Dropped
- Adding a game that is already on your list updates its status instead of creating a duplicate
- Filter your list by status with one click
- Add a personal rating (out of 10) and notes to any game, whatever its status
- Remove games from your list
- Everything is saved in the browser with localStorage, so your list persists between visits

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript (no frameworks or libraries)
- [FreeToGame API](https://www.freetogame.com/api-doc)
- localStorage for saving data

## Clips
![Completed Project(not styled)](screenshots/CompleteNoStyle.mp4)


## How It Works

1. On page load, the full game list is fetched once and stored in an array called `allGames`
2. The game list is built by looping through `allGames` and generating one `<li>` per game, each carrying a `data-index` so a click can be traced back to the right game
3. The search box filters `allGames` by title as you type, case insensitive, without fetching again
4. One click listener on the game list uses event delegation to work out which game was clicked and fills in the popup
5. Your tracked games are stored in a `trackedGames` array, saved to localStorage as JSON, and loaded back when the page opens
6. A single `renderTrackedList()` function redraws My List, and it is called whenever a game is added, removed or filtered

## Running It Locally

1. Clone the repository
2. Open `index.html` in your browser

There is nothing to install and no API key is needed.

## Limitations

- FreeToGame only covers free-to-play titles, so paid games are not in the library
- Your list is stored in your own browser, so it does not sync between devices or browsers
- The rating box suggests 1 to 10 but does not strictly stop other numbers being typed

## What I Learned

- **Fetching data from an API**: using `async`/`await` and `fetch` to load JSON, and reading the console to understand the shape of the data
- **Variable scope**: why data fetched inside a function has to be assigned to a top-level variable before other functions can use it, and the difference between declaring a variable and assigning to one
- **Building HTML dynamically**: looping through arrays to generate list items, template literals for cleaner strings, and `innerHTML` to put the result on the page
- **Script placement in the DOM**: a script has to load after the elements it targets, otherwise `getElementById` returns `null`
- **Event delegation**: using one listener on a parent element and `event.target` to handle clicks on items that are created dynamically
- **Data attributes**: using `data-*` attributes and `.dataset` to connect an element on the page to an item in an array
- **Truthy and falsy checks**: guarding against clicks that land on the wrong element, and against empty localStorage on a first visit
- **Data persistence**: saving and loading arrays of objects with `localStorage`, `JSON.stringify` and `JSON.parse`, and remembering that every change has to be saved as well as made in memory
- **Avoiding duplicates**: searching an array with a loop and a flag variable to decide between updating an entry and adding a new one
- **Keeping indexes correct when filtering**: the filter only changes what is drawn, not an item's real position in the array, so removing a game always removes the right one
- **When not to redraw**: updating saved values in the background while someone types, instead of rebuilding the list and losing their cursor
- **Debugging from error messages**: tracing `null` and `not defined` errors back to nesting and placement mistakes in the code

## Future Improvements

- A styling pass with a more polished layout
- A dark overlay behind the popup
- A short confirmation message when a game is added
- Basic stats, such as how many games are in each status
- Sorting the tracked list
- Stricter validation on the rating box

## Credits

Game data provided by [FreeToGame](https://www.freetogame.com/).

## License

MIT