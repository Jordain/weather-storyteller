# Project Information for Gemini CLI

This document provides essential information for the Gemini CLI agent to effectively interact with and manage this project.

## Project Overview
- **Application Name:** Weather Storyteller
- **Type:** React Web Application
- **Build Tool:** Vite
- **Styling Framework:** Tailwind CSS v4
- **APIs Integrated:**
    - OpenWeatherMap API (for weather data)
    - Gemini API (for generating weather stories)

## Key Files and Directories
- `src/App.jsx`: Main React component containing application logic, UI, and API calls.
- `src/main.jsx`: Entry point for the React application.
- `src/index.css`: Global CSS file, includes Tailwind CSS directives.
- `vite.config.js`: Vite configuration file, includes `@vitejs/plugin-react` and `@tailwindcss/vite` plugins.
- `tailwind.config.js`: Tailwind CSS configuration file.
- `postcss.config.js`: PostCSS configuration file (currently only includes `autoprefixer`).

## Development Commands
- **Start Development Server:** `npm run dev` (run from `weather-storyteller-vite` directory)
- **Build for Production:** `npm run build` (run from `weather-storyteller-vite` directory)

## API Key Information
- API keys for OpenWeatherMap and Gemini are managed through a local `.env` file. To run the application, create a `.env` file in the root of the project and add the following variables:

  ```
  VITE_OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
  VITE_GEMINI_API_KEY=your_gemini_api_key
  ```

- An `.env.example` file is provided as a template. The `.env` file is included in `.gitignore` and should not be committed to version control.

## Project Conventions
- **Component Structure:** Functional components using React Hooks.
- **Styling:** Primarily Tailwind CSS classes applied directly in JSX.
- **Error Handling:** Basic error handling for API calls is implemented.

## Troubleshooting Notes
- If Tailwind CSS styles are not applying, ensure `node_modules` and `package-lock.json` are deleted, and then run `npm install` followed by `npm run dev`.
- Ensure `vite.config.js` correctly uses `tailwindcss()` from `@tailwindcss/vite`.
- Ensure `src/index.css` contains `@import "tailwindcss";`.
