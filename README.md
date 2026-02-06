# Task Flow

A mobile task management application built with React Native (Expo) and Convex.
The app allows users to create, manage, and persist daily tasks with a clean architecture and scalable backend.
The main focus of the project is mobile architecture, state management, theme handling, and real-time backend interaction using Convex.

---

## Table of Contents

- [Description](#description)
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies & Stack Explanation](#technologies--stack-explanation)
- [Architecture & Flow](#architecture--flow)
- [Installation & Run](#installation--run)
- [Project Structure](#project-structure)
- [Author](#author)

---

## Description

Task Flow allows users to:

- Create and manage daily tasks
- Mark tasks as completed
- Edit and delete tasks
- Persist data using a backend database
- Switch between light and dark themes
- Experience a clean, mobile-first UI

The application is built with **React Native using Expo**, while the backend logic and data persistence are handled by **Convex**.

---

## Live Demo

Try it online via our [Live Demo](https://movie-hub-next.onrender.com)!

---

## Features

- Create, update, delete tasks
- Toggle task completion
- Persistent task storage (Convex backend)
- Real-time data synchronization
- Light / Dark theme support
- Theme persistence with AsyncStorage
- Clean separation of frontend and backend logic
- Mobile-first UI architecture
- Type-safe backend schema and mutations

---

## Technologies & Stack Explanation

- **React Native** — mobile application framework
- **Expo** — development environment and tooling
- **Expo Router** — file-based navigation
- **TypeScript** — static typing and safer code
- **Convex** — backend-as-a-service with real-time database
- **AsyncStorage** — local persistence for user preferences
- **Context API** — global state management (theme)
- **Ionicons** — icon set for mobile UI

---

## Architecture & Flow

_Tasks Flow_ 1. App fetches tasks using Convex queries 2. User creates or updates a task 3. Frontend triggers Convex mutations 4. Backend updates the database 5. UI re-renders automatically with updated data

_Theme Flow_ 1. User toggles theme mode 2. Theme state is updated via ThemeContext 3. Preference is saved in AsyncStorage 4. Theme is restored on app launch

---

## Installation & Run

### 1. The Quickest Way (Docker Compose)

1. Install dependencies

```bash
npm install
```

2. Start Expo development server

```bash
npx expo start
```

3. Run on device
   • iOS Simulator (via Xcode)
   • Android Emulator
   • Physical device via Expo Go

---

## Project Structure

```
task-flow/
├─ app/
│  ├─ (tabs)/
│  │  ├─ index.tsx
│  │  └─ settings.tsx
│  ├─ _layout.tsx
├─ convex/
│  ├─ schema.ts
│  └─ tasks.ts
├─ hooks/
│  └─ useTheme.tsx
├─ assets/
│  └─ styles/
├─ package.json
└─ app.json
```

---

## Author

**Taras Poiatsyka**\
[GitHub](https://github.com/tvsxar)
