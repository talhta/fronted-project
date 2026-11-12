# Pokédex App — Product Requirements Document

## Who it's for and why

This app is for Pokémon fans, players, and curious newcomers who want a fast, simple way to browse and look up Pokémon. It runs entirely in the browser on live data from PokéAPI, so users can search for any Pokémon and see its types, stats, and abilities in a clean interface without installing anything or signing up.

## Pages

| Page | URL | What's on it |
| --- | --- | --- |
| Pokémon list | `/` | A list of Pokémon, each with its image and name, plus a search by name. |
| Pokémon details | `/items/:id` | One Pokémon's types, abilities and stats. |
| Favorites | `/favorites` | The Pokémon you starred, saved in localStorage so they're still there next time. |
| Compare | `/compare` | Pick two Pokémon and see their stats side by side. |

## Acceptance criteria

- When I open `/`, I see a loading indicator and then a list of Pokémon, each with its image and name.
- When I type part of a name (for example "pika") in the search box, I see only Pokémon whose names contain that text, and a "no results" message if nothing matches.
- When I click a Pokémon in the list, I go to `/items/:id` and see that Pokémon's image, types, abilities and stats.
- When I click the star on a Pokémon and then open `/favorites`, I see it there, and it's still there after I refresh the page.
- When I pick two Pokémon on `/compare`, I see their stats in two columns side by side.

## API

We use [PokéAPI](https://pokeapi.co/). It's free and doesn't need an API key.

| Endpoint | URL | Returns |
| --- | --- | --- |
| List | `https://pokeapi.co/api/v2/pokemon?limit=60` | `name` and `url` for each Pokémon. The id is the number at the end of the `url` (e.g. `.../pokemon/25/` → `25`). |
| Details | `https://pokeapi.co/api/v2/pokemon/{id}` | Types, abilities, stats and images for one Pokémon. |

Which page uses which endpoint:

- **List (`/`)**: List endpoint for names and ids. The search filters these results in the browser. The list endpoint doesn't return images, so each card's image is a sprite URL built from the id (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`). That keeps the list page to one request.
- **Details (`/items/:id`)**: Details endpoint, with the `id` taken from the URL.
- **Favorites (`/favorites`)**: The starred ids are read from localStorage, then the Details endpoint is called for each one.
- **Compare (`/compare`)**: List endpoint to choose the two Pokémon, then the Details endpoint for each of them to get their stats.
