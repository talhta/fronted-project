# Tasks

Build order for the Pokédex app. See `PRD.md` for pages, acceptance criteria and API details.

## 1. Pokémon list from local JSON

Add a TypeScript `Pokemon` type and a local JSON file with a few sample Pokémon (id, name, image). Render them on the home page as a list with image and name. No API calls yet.

**Done when:** `npm run dev` shows the sample Pokémon with their images and names, and `npx tsc -b` finishes with no type errors.

## 2. Routing and navigation

Add React Router with the list page at `/`, a details page at `/items/:id`, and placeholder pages for `/favorites` and `/compare`. Add a navigation menu that links to the list, favorites and compare pages.

**Done when:** Clicking each menu link changes the URL and shows the right page, clicking a Pokémon in the list opens `/items/:id` for that Pokémon, and refreshing on any of these URLs still shows the same page.

## 3. Fetch from PokéAPI

Replace the local JSON with a real `fetch` from the PokéAPI list endpoint inside `useEffect`. Show a loading state while it loads and an error message if the request fails.

**Done when:** Opening `/` shows a loading indicator and then 60 Pokémon from PokéAPI, and turning on "Offline" in the browser's DevTools Network tab and reloading shows the error message.

## 4. First unit tests with Vitest

Set up Vitest and write unit tests for the logic we have so far (for example, getting the id from a PokéAPI `url`). Add Vitest UI with an `npm run test:ui` script.

**Done when:** `npm test` runs and all tests pass in the terminal, and `npm run test:ui` opens the Vitest UI in the browser with the tests shown as passing.

## 5. Details page from PokéAPI

The details page at `/items/:id` fetches one Pokémon from `https://pokeapi.co/api/v2/pokemon/{id}` and shows its image, types, abilities and stats. It has the same loading and error states as the list.

**Done when:** Clicking Pikachu in the list opens `/items/25` and shows its image, the type "electric", its abilities and its stats, and `/items/99999` shows the error message.

## 6. Search by name

Add a search box on the list page that filters Pokémon by name as you type, with a "no results" message when nothing matches. Put the filter logic in its own function and add Vitest tests for it.

**Done when:** Typing "pika" shows only Pokémon whose names contain "pika", typing "zzz" shows "no results", clearing the box brings back the full list, and `npm test` passes, including the new filter tests.

## 7. Favorites

Add a star button on each Pokémon that adds it to favorites or removes it. Save the favorite ids in localStorage and show the starred Pokémon on `/favorites`.

**Done when:** Starring two Pokémon shows them on `/favorites`, they're still there after a page refresh, and unstarring one removes it from the page.

## 8. Compare page

On `/compare`, let the user pick two Pokémon, fetch both from the details endpoint, and show their stats side by side.

**Done when:** Picking Bulbasaur and Charmander on `/compare` shows their stats (HP, attack, defense and so on) in two columns next to each other, and changing one of them updates its column.

## 9. Styling and mobile layout

Style the app with our own CSS: list cards, details, favorites, compare and the nav menu. The layout has to work on narrow screens.

**Done when:** All pages look clean on a desktop width, and in DevTools device mode at 375px wide nothing overflows sideways, the list wraps into fewer columns, and the nav menu stays usable.

## 10. 404 page

Add a "not found" page for any URL that doesn't match a route, with a link back to the list.

**Done when:** Opening `/something-random` shows the 404 page, and clicking its link goes back to `/`.

## 11. README

Update `README.md` to say what the app does, how to install and run it, how to run the tests (`npm test` and `npm run test:ui`), and that it uses PokéAPI.

**Done when:** Following the README's steps on a fresh clone (`npm install`, `npm run dev`, `npm test`) starts the app and runs the tests with no extra steps needed.
