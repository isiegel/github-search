# GitHub User Search

A small React + TypeScript app for searching GitHub users from the browser with the public GitHub Search API.

## What It Does

- Searches GitHub users by username or keyword
- Renders matching users in a simple result list
- Links each result directly to the user profile on GitHub
- Shows loading and error states during API requests
- Uses a responsive centered layout with Tailwind CSS 4

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 via `@tailwindcss/vite`
- GitHub REST Search API

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
```

### Start The Dev Server

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

- `dev`: starts the Vite development server
- `build`: runs TypeScript project builds, then creates a production bundle
- `preview`: serves the production build locally
- `lint`: runs ESLint across the project

## How Search Works

Search requests are sent directly from the client to:

```text
https://api.github.com/search/users?q=<query>
```

This project does not currently configure GitHub authentication, so it uses the unauthenticated public API rate limits.

## Project Structure

```text
src/
  components/
  hooks/
  types/
  App.tsx
  main.tsx
```

## Notes

- Search is currently triggered by form submission
- Results show basic user data from the search response
- The repository includes placeholder files for additional components that are not yet wired into the app
