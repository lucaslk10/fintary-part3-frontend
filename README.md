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

## Backend Setup

Please visit backend [repository here](https://github.com/lucaslk10/fintary-part-3-backend).

## Contributing

We welcome contributions to the project. Please refer to the project's issues and pull request templates for more information on contributing.

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.
