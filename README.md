# React / NextJS Full Stack Developer Assignment

## Overview

This repository contains a full-stack movie database web application built using **Next.js** and **Supabase**. The app allows users to authenticate, view, create, and edit movies, following the provided Figma design specifications.

## Features

- **Authentication**: Handled using **Supabase Auth**.
- **Database & Storage**: Managed with **Supabase**.
- **Server-Side Rendering (SSR)**: Implemented using **Next.js** for better SEO and performance.
- **React Suspense**: Used where necessary for optimized loading experiences.
- **Responsive UI**: Designed to match the **Figma** specifications.
- **Tailwind CSS**: Styled with **custom variables** as provided in the Figma design file.
- **Movie Management**: Users can **create, update, and view movies** with:
  - **Title (text)**
  - **Publishing Year (number)**
  - **Poster (image)**
- **Form Validation**: Ensures correct input formats and displays API error messages.
- **Pagination**: Implemented for movie listing.
- **State Management**: Optimized for efficient data flow.
- **Localization Support**: Added for multiple languages.
- **API Documentation**: Provided for backend endpoints.
- **Hosted on AWS**: Following best deployment practices.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for movie posters)
- **Deployment**: AWS

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+)
- npm or yarn
- Supabase account with API keys

### Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/mask477/movie-app-task.git
   cd movie-app
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Create a `.env.local` file and add your **Supabase API keys**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app is deployed on **AWS**. You can check out the live version at:
🔗 [Live Demo](https://main.dk4qkhe4ajapp.amplifyapp.com/)

## Design Reference

The UI follows the **Figma design** provided:
🔗 [Figma Link](https://www.figma.com/design/GtEDPLHyXSxRrOXMR44K8A/Full-Stack-Dev-Assignment?node-id=0-1&t=QE4S7261ven57Jqp-1)

---

### 🚀 Built with ❤️ by Mursal Khan
