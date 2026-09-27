# Game Completion Tracker
*A MyAnimeList-style tracker for logging and organising the games you play, powered by the FreeToGame API.*

## What is this?
A browser based tool to search free to play games, view their details, and
track your own progress through them (Playing, Completed, Backlog, Dropped),
similar to how MyAnimeList works for anime.

## Why I'm building this
This is project 2 in my self-directed JavaScript learning series. Project 1
taught me DOM manipulation and localStorage; this project is about learning
to work with a real external API, fetching data, handling asynchronous
code, and combining API data with my own locally stored data.

## Core features (must-have)
- Fetch the full game list from the FreeToGame API on page load
- Live search: filter games by name as you type
- View a game's full details (description, genre, platform, release date)
- Add a game to a personal tracked list with a status (Playing / Completed / Backlog / Dropped)
- View tracked list
- Remove a game from the tracked list
- Persist the tracked list using localStorage

## Stretch features (if time allows)
- Personal rating and notes once a game is marked Completed
- Filter/sort tracked list by status
- Basic stats view (e.g. "X completed, Y in progress")

## Tech stack
- HTML
- CSS
- Vanilla JavaScript (fetch, async/await)
- FreeToGame API 

## Scope/limitations
- FreeToGame only covers free to play titles, so the trackable catalogue is
  narrower than a full game database would offer

## Layout plan (rough)
- Header with project title
- Search bar (live filter)
- Game results grid/list (thumbnail + title)
- Game detail view
- Tracked list section, grouped or filterable by status

## Status
🟡 Planning
