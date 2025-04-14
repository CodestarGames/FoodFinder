# Food Finder!

A resturaunt locator application written in Typescript using TanstackStart! This application finds restuarants in a certain radius using the FourSquare Places Api. It shows a mapview of nearby places and details including: photos, information, reviews, etc.


## Requirements
- node js
- pnpm
- Foursquare Places API key

## Setup
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Add your Foursquare API key to `.env`


### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
pnpm start
```

### Docker
```bash
docker compose up
```


## Directory structure 

- `components/`: Contains installed ShadCn components

- `features/`: contains the components made specific to features of food finder.

- `hooks/`: contains hooks installed by ShadCn components

- `lib/`: contains utilities installed by ShadCn components

- `server/`: contains the tanstack server api functions 

- `schema/`: contains types used by food finder

- `routes/`: contains tanstack router route definitions

- `styles/`: contains tailwind global styles

- `test/`: contains vitest componenent tests

- `utils/`: contains shared utilities and constants


### Tech & trade offs


- **Tanstack Start** https://tanstack.com/start/latest
  - Great development ecosystem
  - Easy route generation and type safety
  - SSR
  - Type safe Server functions 
  - Intuitive data/state management
  - Shareable links to specific resturaunts thanks to router

- **ShadCn** https://ui.shadcn.com/
  - Al-acarte ui components
  - Easy installation and customization 

- **React-Leaflet** https://react-leaflet.js.org/
  - Most popular react library to work with leaflet.js

- **Tailwind** https://tailwindcss.com/
  - Intuitive CSS system
  - Ability to merge styles
  - Default for ShadCn

- **Trade offs**
    - Tanstack start is still in beta
    - Tailwind classes can clutter codebase, an alternative approach would be using something more Typescript friendly like Vanilla Extract or Panda
    - leaflet.js is an old mapping library that's difficult to work with in React
    - ShadCn components can add bloat to a project, an alternative would be to roll an in house design system.


### Possible Future Improvements
  - Allow expanding the search area to a larger portion of the map.
  - Easy food category filtering
  - Price filtering
  - Decoupling the frontend/backend if there's an architectural reason for splitting the two.
  - Adding more component tests
  - Adding backend/e2e tests
  - Adding redis or some other better caching solution
  - Adding better css transitions for ui interactions
  - using a more modern mapping solution like Mapbox

