# Pokedex Lite

A clean and responsive Pokémon catalog app built with React.  
Browse Pokémon, search by name, filter by type, and save your favorites.

---

## Live Demo

 https://pokedex-lite-gajanan.vercel.app/


---

## Features

- Search Pokémon by name  
- Filter Pokémon by type (Fire, Water, Grass, etc.)  
- Add / Remove favorites  
- Favorites saved in LocalStorage (persist after refresh)  
- Pagination for browsing  
- Click to view Pokémon details in a modal  
- Responsive UI  

---

## Tech Stack

- **React** – for building UI (functional components & hooks)  
- **Tailwind CSS** – for styling and responsive design  
- **PokéAPI** – for Pokémon data  
- **LocalStorage** – to persist favorites  

---

## Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Gajanan06/Pokedex-Lite
cd Pokedex-Lite
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Run the app
```bash
npm run dev
```

Open in browser:
```
http://localhost:5173
```

---

## Build (Production)

```bash
npm run build
```

Preview build:
```bash
npm run preview
```

---

## How Core Features Work

### 🔹 Type Filtering
- User selects a type from dropdown  
- API call: `/type/{type}`  
- Extract Pokémon list  
- Update state → UI re-renders with filtered results  

---

### 🔹 Favorites (Local Storage)
- Click ❤️ to toggle favorite  
- Stored in LocalStorage  
- Automatically loaded on refresh  

---

### 🔹 Search
- Filters Pokémon based on name  
- Works together with type filtering  

---

## Challenges Faced (Simple Explanation)

### 1. Different API Response Formats
- List API and Type API returned data in different structures  
- Solution: Extracted and normalized data into a common format  

---

### 2. Favorites Not Persisting
- Favorites were getting reset after refresh  
- Solution: Used LocalStorage with proper state handling  

---

### 3. Filtering Not Working Properly
- Wrong data extraction caused empty results  
- Solution: Correctly mapped API response and updated state  

---

### 4. Pagination with Filtering
- Pagination caused empty data when switching types  
- Solution: Reset offset when type changes  

---

## Future Improvements

- Multi-type filtering (e.g., Fire + Flying)  
- Favorites-only filter  
- Sorting (A–Z, by ID)  
- Loading skeleton UI  
- Better error handling  

---

##  Author

**Gajanan Nilajkar**

---