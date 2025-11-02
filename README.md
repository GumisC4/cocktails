# Cocktail Browser App

A modern web application for browsing and discovering cocktails, built as part of the KN Solvro recruitment process.

## Overview

This application allows users to explore a wide variety of cocktails, mark their favorites, search and filter through the collection, and view detailed information about each cocktail including ingredients and preparation instructions.

## Features

- **Cocktail List**: Browse through a paginated grid of cocktails
- **Favorites**: Mark and unmark cocktails as favorites for easy access
- **Search & Filter**: Find cocktails by name, category, glass type, and other criteria
- **Detailed View**: See full cocktail details including ingredients with measurements and instructions
- **Random Cocktail**: Discover new cocktails with the random feature
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes for better user experience

## Technologies Used

- **React** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls

## API

This application uses the [Solvro Cocktails API](https://cocktails.solvro.pl) to fetch cocktail data.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GumisC4/cocktails.git
   cd cocktails
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```
