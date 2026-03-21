<div align="center">
  <img src="./client/public/Tuneboxd.png" alt="Tuneboxd Logo" width="320" />
  <h3>A React/Node.js social music platform — users can discover music by genre, write reviews, rate tracks and albums, and follow friends, while the Spotify and Last.fm APIs power personalized recommendations, artist pages, and real-time trending content.</h3>
</div>

---

# 🎵 Tuneboxd — Where Music Lovers Come Together

> *Ever wished there was a place where you could track every song you've fallen in love with, rave about a new album drop, and connect with people who just get it? That's exactly what we built.*

Welcome to **Tuneboxd** — a social music platform designed for people who live and breathe music. Whether you're a casual listener who saves playlists for every mood, or a die-hard fan who knows every track on an obscure B-side, Tuneboxd gives you the space to share, discover, and celebrate music the way you always wanted to.

---

## 🌟 The Idea Behind It

Think of your favorite music app. It probably lets you stream songs, maybe build playlists. But does it let you *talk* about music? Does it let you write a proper review of that album you've been obsessing over? Does it connect you with other fans who feel the same way about an artist?

That's the gap Tuneboxd fills.

We took inspiration from platforms like Letterboxd (for film) and built something tailored to the music world — a hybrid of a music diary, a social network, and a discovery engine. Every feature was designed with one question in mind: *"What do real music fans actually want to do?"*

---

## ✨ Features

### 🏠 Dashboard
Your home base. The dashboard surfaces **trending songs**, **top artists**, and **featured releases** so you're always in the loop. See what the community is listening to right now, discover what's bubbling up in the charts, and find your next obsession.

### 🔍 Music Discovery
Not sure what to listen to next? The **Discovery** hub has you covered:
- Browse music by **genre** — over 320 genres ranging from A Cappella to Western
- Get **personalized recommendations** powered by the Spotify API
- Explore **curated playlists** and trending collections

### 🎤 Artist & Album Pages
Deep-dive into your favorite artists and albums. Each page gives you:
- Full **discography** listings
- **Related artists** you might love
- **Top tracks** and community reviews
- Everything you need to go down the rabbit hole

### ⭐ Reviews & Ratings
Here's where the magic happens. Tuneboxd lets you write real, meaningful reviews for songs, albums, and playlists. Rate on a **1–5 star scale**, pour your thoughts into a review, and contribute to the community's collective music knowledge. Read what others think, agree, debate — that's the fun.

### 👤 User Profiles
Your profile is your musical identity. It shows off:
- Songs, albums, and artists you've **liked**
- Your **listening history**
- Reviews you've written
- Who you're **following** and who follows you
- What you're **currently listening to**

### 🤝 Community
Music is better together. The **Community** page aggregates discussions, insights, and activity from users across the platform. Discover what people are talking about, find fans of niche genres, and join the conversation.

### 🔔 Follow System
Follow users whose taste you trust. Their activity surfaces in your feed, making it easy to discover music through people, not algorithms.

### ⚙️ Settings & Preferences
Full control over your account — update credentials, manage notifications, set privacy preferences, and personalize your experience.

---

## 🛠️ Tech Stack

Tuneboxd is a modern full-stack web application built with a clean separation between the client and server.

### Frontend
| Technology | Purpose |
|---|---|
| **React** | UI component library |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Blazing-fast build tool & dev server |
| **TailwindCSS** | Utility-first styling |
| **React Router DOM** | Client-side routing |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | Server framework |
| **TypeScript** | Type-safe server code |
| **Supabase (PostgreSQL)** | Primary database |
| **Redis (ioredis)** | Session storage |
| **Bcrypt** | Password hashing |
| **Express-session** | Secure session management |

### External APIs
| API | Usage |
|---|---|
| **Spotify API** | Music data, search, recommendations, trending songs |
| **Last.fm API** | Trending tracks, artist stats, genre data |

---

## 🏗️ Project Structure

```
Tuneboxd/
├── client/                  # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/           # Route-level page components
│   │   ├── components/      # Reusable UI components
│   │   └── images/          # Icon assets
│   └── public/              # Static assets (logo, background)
│
├── server/                  # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/          # API route definitions
│   │   ├── controllers/     # Request handlers & business logic
│   │   ├── models/          # TypeScript data interfaces
│   │   └── utils/           # Helpers (Supabase client, Spotify token, etc.)
│   └── .env.example         # Environment variable template
│
└── package.json             # Monorepo root — runs both client & server
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:
- **Node.js** v18 or higher
- **npm** (comes with Node.js)
- A **Supabase** account and project
- **Spotify API** credentials (Client ID & Secret)
- A **Last.fm** API key
- A **Redis** instance (local or hosted)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/wolfgang04/Tuneboxd.git
cd Tuneboxd
```

**2. Install dependencies**
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Install server dependencies
cd server && npm install && cd ..
```

**3. Configure environment variables**

Copy the example env file and fill in your credentials:
```bash
cp server/.env.example server/.env
```

Open `server/.env` and set your values:
```env
PORT=8080
SECRET=your_session_secret_key

# Supabase
DATABASE_URL=your_supabase_url
DATABASE_KEY=your_supabase_anon_key

# Auth
SALT_ROUNDS=10

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Last.fm API
LASTFM_API_KEY=your_lastfm_api_key
LASTFM_API_SECRET=your_lastfm_api_secret
```

**4. Start the development servers**
```bash
# From the root directory — starts both client (port 3000) and server (port 8080) concurrently
npm start
```

Then open your browser to **http://localhost:3000** and you're good to go! 🎉

### Running Separately

If you prefer to run them individually:

```bash
# Terminal 1 — Backend (Express on :8080)
cd server
npm start

# Terminal 2 — Frontend (Vite on :3000)
cd client
npm run dev
```

---

## 🔌 API Overview

The backend exposes a RESTful API under `/api`:

| Endpoint Group | Description |
|---|---|
| `/api/user` | Authentication — signup, login, logout, password reset, profile |
| `/api/spotify` | Spotify data — search, artist info, albums, recommendations |
| `/api/lastfm` | Last.fm data — trending songs, genre data |
| `/api/review` | Reviews — create, read, and delete reviews |
| `/api/follow` | Social graph — follow/unfollow, followers, following |
| `/api/song` | Song metadata and interactions |
| `/api/artist` | Artist metadata and interactions |
| `/api/album` | Album metadata and interactions |
| `/api/playlist` | Playlist management |

---

## 🔒 Security

Tuneboxd takes security seriously:
- Passwords are hashed with **bcrypt** (10 salt rounds) — your plaintext password is never stored
- Sessions are managed server-side using **Redis** with a 24-hour expiry
- Session cookies are **HTTP-only** and use `SameSite=lax` to mitigate CSRF risks
- CORS is restricted to the configured client origin

---

## 🗺️ Roadmap

Some ideas on the horizon:
- [ ] Real-time notifications for follows and review interactions
- [ ] Public activity feed / timeline
- [ ] Music-based friend recommendations ("People with similar taste")
- [ ] Native mobile app (React Native)
- [ ] Integration with Apple Music API

---

## 🤝 Contributing

Contributions are welcome! If you have ideas, find bugs, or want to add features:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use it, learn from it, and build on top of it.

---

<div align="center">
  <p>Built with ❤️ for music lovers, by music lovers.</p>
  <p><em>Now go find your next favorite song.</em> 🎶</p>
</div>