# Holidaze
![image](https://github.com/user-attachments/assets/ce0e7f5a-52da-499b-a9fd-41d037c870c5)

## Overview
Holidaze is a modern accommodation booking platform designed to connect travelers with unique venues, and empower venue managers to manage their properties effortlessly. Built with performance, responsiveness, and user experience in mind, this project delivers a fully responsive front-end interface for both customers and venue managers.

This is the front-end application developed using the official Noroff API, tailored to meet the brief requirements of Holidaze.

## Description
Holidaze supports two primary user roles: Customers and Venue Managers. It allows users to browse venues, check availability, book accommodations, and manage venue listings and bookings.

The platform includes:
- Dual registration types (Customer and Venue Manager) with stud.noroff.no email validation.
- Browsing, searching, and viewing of venue listings available to all users (including visitors).
- Calendar integration to display venue availability and booked dates.
- Secure booking and management features for registered users.
- Clean UI and responsive design for all devices.

## Features
### Public (visitor)
- View list of all venues
- Search for venues by keyword.
- View individiual venue details including images and availability calendar.

### Authentication
- Register using a stud.noroff.no email.
- Choose user role during registration. Customer or Venue manager.
- Secure login and logout functionality
- Encrypted sessions handled via cookies.
- Middleware+route protection and session updates.

### Customers
- Create bookings on venue details page.
- View upcoming bookings.
- Update avatar/profile picture.

### Venue Manager
- Create, update and delete venues.
- View bookings for their managed venues.
- Update avatar/profile pictures.

### Listings & Venues
- Create venues with:
  - Title
  - Description
  - Media Gallery
  - Location
  - Price per night
  - Guest capacity
  - Amenities
- Real-time availability calendar with booked dates marked.
- Search and browse all venues by title/location.

## Built With
- **Framework**: [Next.js 15.0.3](https://nextjs.org/)
- **Typescript**: [Typescript^5](https://www.typescriptlang.org/)
- **Zod**: [Zod^3.23.8](https://zod.dev/)
- **UI Components**: [Shadcn ui](https://ui.shadcn.com/)
- **CSS Framework**: [Tailwind CSS 3.4.1](https://tailwindcss.com/)
- **Hosting Service**: [Vercel](https://vercel.com/)
- **Design Tools**: Photoshop, Figma
- **Planning Tool**: Notion

## Getting Started
### Installing
To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Motormary/nextjs-pe2-holidaze
   ```

2. Navigate to the project directory:

   ```bash
   cd nextjs-pe2-holidaze
   ```

3. Install dependencies

   ```bash
    pnpm install
   ```

4. Rename the '.env.example' file inside the root folder to '.env'

5. Use these values:

  - API_KEY=235c15a7-c0f5-4925-b6ec-59e3f4e2d081

  - API_BASE="https://v2.api.noroff.dev"


## Running
To run the project locally:
1. Start the development server:
    ```bash
    pnpm dev
    ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000).
