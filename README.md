# Pokédex

A Pokédex web app built with React, Vite and TypeScript. It runs entirely in the browser, with no backend, and uses live data from [PokéAPI](https://pokeapi.co/). You can browse and search Pokémon, see each one's types, abilities and stats, star your favorites, and compare two Pokémon side by side.

## Pages

| URL | What's on it |
| --- | --- |
| `/` | A list of 60 Pokémon with image and name, and a search by name. |
| `/items/:id` | One Pokémon's artwork, types, abilities and stats. |
| `/favorites` | The Pokémon you starred. They're saved in your browser, so they're still there after a refresh. |
| `/compare` | Pick two Pokémon and see their stats side by side. |
| any other URL | A "Page not found" page with a link back to the list. |

## Getting started

You need [Node.js](https://nodejs.org/) 20.19+ or 22.12+.

```bash
git clone https://github.com/talhta/fronted-project.git
cd fronted-project
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Tests

```bash
npm test          # run all tests once in the terminal
npm run test:ui   # open the Vitest UI in the browser
```

The tests use [Vitest](https://vitest.dev/). They cover the API helpers, the search filter and the favorites logic. `fetch` and `localStorage` are replaced with fakes, so the tests don't need the network.

## Build

```bash
npm run build     # type check, then build the production app into dist/
npm run preview   # serve the built app locally to try it
npm run lint      # check the code with ESLint
```

## API

The app uses [PokéAPI](https://pokeapi.co/), which is free and doesn't need an API key.

| Endpoint | Used by |
| --- | --- |
| `https://pokeapi.co/api/v2/pokemon?limit=60` | The list page and the dropdowns on the compare page. It returns each Pokémon's name and url, and the id is the number at the end of the url. |
| `https://pokeapi.co/api/v2/pokemon/{id}` | The details page, the favorites page and the compare columns. It returns the types, abilities, stats and images. |

The list images are built from the id with PokéAPI's sprite URLs, so the list page needs only one request. Favorites are stored in the browser's `localStorage`, not on a server.

## Project docs

- [PRD.md](PRD.md): who the app is for, its pages, acceptance criteria and API details.
- [tasks.md](tasks.md): the build plan, task by task, each with a "Done when" check.
