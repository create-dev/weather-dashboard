# Weather Dashboard - coding challenge

## Overview

Develop a simple weather dashboard application using React and TypeScript that fetches weather data from a public API and displays it to the user. The application should have the following features:

1. **City Weather Search**: Allow users to search for a city and display the current weather details. Use autocomplete as user types to show available options.
2. **Weather Information**: Show temperature, humidity, and general weather conditions (sunny, cloudy, etc.).
3. **Recent Searches**: Keep a list of recently searched cities and their weather conditions.

---

## Non-Functional Requirements

1. **Code Quality**: Code should be clean, easy to digest, and follow best practices.
2. **Testing**: Provide unit tests for key components and functionality.
3. **Performance**: The application should be optimized for performance, especially during rendering and API calls.

---

## Implementation Guidelines

1. **Weather API**: Use publicly available weather API to get current data for the relevant city.
2. **Component Decomposition**: Break down the UI into reusable components.
3. **Error Handling**: Implement robust error handling for network requests and user inputs.
4. **State Management**: Efficiently manage the state of the application.

---

## Deliverables

Please note that this coding challenge is **not limited on time** and you can work on it over multiple sessions.

A single compressed file or commits to git repository containing the following:

1. A fully functional React / Typescript application.
2. Jest unit tests covering critical paths of the application.
3. Readme file explaining approach and critical parts of the code.

---

## API Suggestions

- [Weather API](https://www.weatherapi.com/) - https://www.weatherapi.com/

#

#

# Weather Dashboard - Functional and Tech details

## Overview

Weather Dashboard app allows users to see the current weather of cities around the world. A search input with autocomplete is available for users to find cities using the first few letters of the city's name.

Application automatically stores last few searches and allow users to select them anytime. Recent searches shows the most latest searches at the top.

## Technical

Application is divided into 3 parts.

### 1. City Search

Allows users to search cities

### 2. City Current weather & condition

Shows city's current weather and condition

### 3. Recent Searches

Last few recent searches of the user

## How to run the app

### 1. yarn install

Install needed packages and libraries

### 2. yarn start

Starts the application

## Run tests

### yarn test

Runs tests on the application
