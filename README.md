### About this project

This project displays a list of Chess.com Grandmasters and provides a detail page for each player using the public Chess.com API.

### How to run it

```
yarn install
yarn dev
```

### Tech Stack

- Project set up with `Vite`
- Linting and formatting with `ESlint` and `prettier`
- `React` with `TypeScript`
- State shared via `Context`
- Routing with `react-router-dom`
- SCSS modules with `sass-embedded`
- `classnames` utility

### Trade offs

This project uses the Chess.com API for grandmasters:

```
https://api.chess.com/pub/titled/GM
```

The response is a list of usernames: `string[]`.

```
{
    "players": [
        "0blivi0usspy",
        "123lt",
        "124chess",
        "1977ivan",
        "1stsecond",
        ... // 1700 more
    ]
}
```

The API does not support sorting, therefore the list is alphabetical.

Ideally, the `HomePage` would show richer data (_Name_, _Avatar_, _Rank_), but the API returns only usernames and does not support sorting.

Fetching details for each of ~1700 Grandmasters would require ~1700 separate requests, which is excessive and likely to hit API rate limits (sequential requests are allowed, but parallel requests are not).

For this project I opted to keep things simple and just show the users list, linking each to a details view that requests further information from the API:

```
https://api.chess.com/pub/player/${username}
```

### Persistence

The list of Grandmasters received by the API or individual Player API is stored (per session) via `React Context`. Thus on navigation to another route and back, no new request is performed.

### Note

Despite being a small project, it includes a few nice touches:

- A `utils/Status` utility to model async request states cleanly:

  ```ts
  type Status<Data> = Idle | Loading | Success<Data> | Failure
  ```

- A simple skeleton UI (`components/Skeleton`) shown while requests are in flight.

### Possible improvements

There are endless improvements possible, here are a few:

- Invalidate data after 12h (matching the API's refresh cycle).
- For `HomePage`, fetch each username sequentially for each item seen. Detect the item entered in view with `react-intersection-observer`.
- Show a limited version of `UserCard` in the `HomePage` once we have data.
- For better UX, add filtering options to the `HomePage`, e.g. allowing filtering by _Name_ or _Username_.
- Add data fetching and/or state management libraries, e.g `TanStack Query` or `Redux Toolkit`, for better error handling (with incremental backoff retry) and consistent state management.
- Unit test, and integration test
