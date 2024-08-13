# TUF - Assignment

## Overview

**TUF - Assignment** is a project designed to manage banners on a website. The application includes an admin portal where users can update banner information, toggle banners as active/inactive, and view banners with a countdown timer on a dedicated banner page.

## Features

- **Admin Portal**: Manage banner information, including description, end time, and visibility status (active/inactive).
- **Banner Display**: Display banners with a countdown timer showing the time remaining until the banner expires.
- **Responsive UI**: The application is designed with a user-friendly and responsive interface.

## Project Structure

- **Admin Portal**: Accessible at `/admin`, this portal allows administrators to update banner details and manage their visibility.
- **Banner Page**: Accessible at `/banner/:id`, this page displays the banner with its details and a countdown timer.
- **Error Handling**: A custom error page is displayed for any undefined routes, showing a "404 - Not Found" message.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Routing**: React Router
- **State Management**: React Hooks
- **Backend**: Node.js, Express
- **Database**: MySQL

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```
   git clone https://github.com/haarsh1306/tuf-assignment.git
2. **Navigate to project directory**
   ```
   cd tuf-assignment
   cd frontend
3. **Install dependencies**
   ```
   npm install
4. **Start development server**
   ```
   npm run dev
## Live Link
  https://tuf-assignment-nu.vercel.app/

