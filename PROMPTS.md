# יומן פרומפטים

## 2026-11-12

**11:41 · claude**

> <ide_opened_file>The user opened the file /Users/talshmeul/Desktop/fronted-project/CLAUDE.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> hi please expalin me a little bit about this project
**12:32 · copilot**

> git add

**13:22 · claude**

> <ide_opened_file>The user opened the file /Users/talshmeul/Desktop/fronted-project/PROMPTS.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> בדיקה

**13:30 · claude**

> I'm building a Pokédex app with React + Vite + TypeScript, front-end only, using data from PokéAPI.
> Create a PRD.md file in the project root. For now, write only a title and a short section (2-3 sentences): who the app is for and why it's useful. No code yet.

**13:32 · claude**

> <ide_opened_file>The user opened the file /Users/talshmeul/Desktop/fronted-project/PRD.md in the IDE. This may or may not be related to the current task.</ide_opened_file>
> 
> 
> <pasted_content id="3df2">
> Now add a "Pages" section to PRD.md. List each page with its URL and one line describing what's on it:
> 1. Pokémon list with image and name, plus a search by name — /
> 2. Details page for each Pokémon: types, abilities, stats — /items/:id
> 3. Favorites: mark Pokémon with a star and see them here, saved in localStorage — /favorites
> 4. Compare: pick two Pokémon and see their stats side by side — /compare
> Only update PRD.md, no code.
> </pasted_content id="3df2">

**13:34 · claude**

> Now add an "Acceptance criteria" section to PRD.md with 4-5 lines in the format "When I..., I see...". Each line should be something I can check with my eyes in the browser. Cover: the list loading, the search, clicking a Pokémon, adding a favorite, and comparing two Pokémon. Only update PRD.md, no code.

**13:37 · claude**

> <pasted_content id="3df2">
> Now add an "API" section to PRD.md. We use PokéAPI (free, no key):
> - List: https://pokeapi.co/api/v2/pokemon?limit=60 (returns name and url for each Pokémon; the id is the number at the end of the url)
> - Details: https://pokeapi.co/api/v2/pokemon/{id} (types, abilities, stats, images)
> Briefly explain which page uses which endpoint. Only update PRD.md, no code.
> </pasted_content id="3df2">
