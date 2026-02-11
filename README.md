
# 🚀 Cygnus Careers

A modern and responsive job listing application built with **React** and **Tailwind CSS**. This project demonstrates frontend fundamentals, component structure, state management, and filtering logic.

## ✨ Features

- **Job Browsing:** View a list of job postings with beautiful cards.
- **🔍 Real-time Search:** Filter jobs by title or company instantly.
- **📍 Location Filter:** Easily filter by "Remote" or "On-site" roles.
- **🏷️ Type Filter:** Sort by Internship, Full-time, or Contract roles.
- **🔤 Sorting:** Sort jobs by "Newest First" or "Alphabetical (A-Z)".
- **HIGHLIGHT:** Search terms are highlighted in the job titles.
- **Responsiveness:** Fully optimized for mobile, tablet, and desktop.
- **Dark Mode Aesthetic:** Premium dark theme with glassmorphism effects.

## 🛠️ Tech Stack

- **React:** For component-based UI and state management.
- **Tailwind CSS:** For rapid, utility-first styling.
- **Vite:** For fast development and build tooling.

## 🚀 Getting Started

Follow these steps to run the project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd cygnus
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    Go to `http://localhost:5173` to view the app.

## 📂 Project Structure

```
src/
├── components/         # Reusable UI parts (JobCard.jsx)
├── data/               # Mock data source (jobs.js)
├── pages/              # Page components (HomePage.jsx, JobsPage.jsx)
├── App.jsx             # Router configuration
├── index.css           # Global styles & Tailwind directives
└── main.jsx            # Entry point
```

## 💡 Design Decisions

- **Tailwind CSS:** references a "premium" design system without the overhead of heavy CSS files.
- **Component Reusability:** `JobCard` is a standalone component that accepts props, making it easy to reuse.
- **Search Highlighting:** Added a simple regex-based highlighter for better UX.
- **Glassmorphism:** Used backdrop-filter and semi-transparent backgrounds for a modern feel.

---

Built with ❤️ by [Your Name]
