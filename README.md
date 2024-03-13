# Order vs. Transaction Matching System

## Overview

This project implements a matching system designed to align orders with transactions efficiently. Built with modern technologies including Node.js, Vite, Vitest, TypeScript, and linted with ESLint alongside formatting with Prettier, it ensures high performance and developer-friendly coding standards.

## Technology Stack

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Vite**: A modern frontend build tool that provides a faster and leaner development experience.
- **Vitest**: A Vite-native unit testing framework that offers a delightful testing experience.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript code.
- **Prettier**: An opinionated code formatter that enforces a consistent style by parsing your code and reprinting it with its own rules.
- **Storybook**: An open source tool for developing UI components in isolation for React, Vue, and Angular.

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (version 12.x or higher)
- Yarn package manager

## Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:lucaslk10/fintary-part3-frontend.git
cd fintary-part3-frontend
yarn install
```

## Running the Application

To start the frontend development server:

```bash
yarn dev
```

The server will start on port `3001`. Ensure that the backend is running on port `3000` for the system to function correctly.

Fill your `.env` file with the following environment variables:

```env
VITE_MATCH_API_URL=http://localhost:3000/matching
```

## Testing

This project uses Vitest for unit testing. To run tests, execute:

```bash
yarn test
```

## Storybook

To view and develop UI components in isolation, we utilize Storybook. Start Storybook with:

```bash
yarn storybook
```

Storybook runs on a separate port and allows you to browse a component library, view the different states of each component, and interactively develop and test components.

## Backend Setup

Please visit the backend [repository here](https://github.com/lucaslk10/fintary-part-3-backend).

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.
