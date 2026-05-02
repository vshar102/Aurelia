# AURELIA — Luxury Fashion Website

> *"Dressed in Silence, Defined by Detail."*

A cohesive, multi-page luxury fashion website featuring a live product storefront, an editorial Brand Story, a Contact inquiry form, a full Checkout flow, and a Python-powered AI Concierge — all connected to a FastAPI backend.

---

## Project Structure

```
AURELIA-Luxury-Fashion/
├── backend/
│   ├── main.py           # FastAPI app & all API endpoints
│   ├── models.py         # Pydantic request/response models
│   ├── concierge.py      # AI Concierge keyword-matching engine
│   └── requirements.txt  # Python dependencies
├── frontend/
│   ├── index.html        # Home / Shop (product grid)
│   ├── about.html        # Brand Story (Maison)
│   ├── contact.html      # Inquiry form
│   ├── checkout.html     # Cart review & payment
│   ├── style.css         # Global design system & all component styles
│   └── script.js         # Global JS (cart, chat, scroll, page logic)
└── README.md
```

---

## Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Start the FastAPI Server

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at: `http://localhost:8000`  
Interactive docs: `http://localhost:8000/docs`

### 3. Open the Frontend

Open `frontend/index.html` directly in your browser (no build step needed).  
Ensure the backend is running so the product grid and chat load correctly.

---

## Design System

| Token | Value | Use |
|---|---|---|
| `--color-obsidian` | `#0A0A0A` | Backgrounds |
| `--color-gold` | `#C5A059` | Accents, CTAs, borders |
| `--color-charcoal` | `#1A1A1A` | Cards, surfaces |
| `--color-white` | `#FFFFFF` | Primary text |
| `--font-display` | Cormorant Garamond | Headings, editorial |
| `--font-body` | Jost | Body, UI labels |

---

## API Reference

### `GET /api/products`
Returns the 8-item luxury product catalogue.

```json
[
  {
    "id": 1,
    "name": "Nocturne Overcoat",
    "category": "Outerwear",
    "price": 4850.00,
    "description": "...",
    "image_url": "https://picsum.photos/seed/1/600/800"
  }
]
```

---

### `POST /api/process-payment`
Simulates a 2-second payment and returns an order confirmation.

**Request body:**
```json
{
  "items": [{ "id": 1, "name": "Nocturne Overcoat", "price": 4850.00, "quantity": 1 }],
  "total": 4885.00
}
```

**Response:**
```json
{
  "status": "success",
  "order_id": "A3F9C12B4E01",
  "message": "Your order has been confirmed."
}
```

---

### `POST /api/contact-submit`
Accepts a contact form submission and logs it server-side.

**Request body:**
```json
{
  "name": "Jane Ashford",
  "email": "jane@example.com",
  "subject": "Bespoke Commission",
  "message": "I'd like to enquire about a custom overcoat."
}
```

**Response:**
```json
{
  "status": "received",
  "message": "Thank you for your enquiry. Our team will be in touch within 24 hours."
}
```

---

### `POST /api/chat`
Routes a user message to the AI Concierge keyword engine.

**Request body:**
```json
{ "message": "What fabrics do you use?" }
```

**Response:**
```json
{
  "reply": "Our pieces are crafted exclusively from hand-sourced Italian silk and Grade-A cashmere..."
}
```

**Concierge keyword groups:**

| Keywords | Topic |
|---|---|
| material, fabric, made of | Materials & provenance |
| price, cost, expensive | Pricing philosophy |
| size, fit, measurements | Sizing & bespoke consultation |
| shipping, delivery, arrive | Private courier delivery |
| return, refund, exchange | Return policy |
| new, latest, collection | Nocturne 2026 collection |
| hello, hi, greetings | Welcome greeting |
| recommend, suggest, best | Curated recommendation |

---

## Frontend Features

| Feature | Implementation |
|---|---|
| **Persistent Header** | Transparent → glassmorphism on scroll |
| **Product Grid** | Dynamically fetched from `/api/products` |
| **Category Filter** | Outerwear / Accessories / Footwear |
| **Scroll Animations** | IntersectionObserver fade-in-up on product cards |
| **Cart (localStorage)** | Add, remove, quantity, total — persists on refresh |
| **Slide-out Cart Drawer** | Overlay + animated drawer from right |
| **Checkout** | Live cart review, order summary, payment simulation |
| **Contact Form** | POST to API, success/error inline states |
| **AI Chat Widget** | Floating FAB → slide-up window on all pages |
| **Typing Indicator** | Animated 3-dot bounce before bot reply |
| **Order Confirmation** | Full-page overlay after successful payment |
| **Mobile Responsive** | CSS Grid + Flexbox, tested at 600px & 900px breakpoints |

---

## Refined Prompt (Project Specification)

```
Role: You are a Senior Full-Stack Developer specializing in high-end 
E-commerce experiences and FastAPI integrations.

PROJECT: AURELIA — Luxury Fashion Website

OBJECTIVE:
Build a cohesive, multi-page luxury fashion website featuring a storefront, 
an editorial "About" page, a "Contact" page, a "Checkout" page, and a 
Python-powered AI Concierge chatbot.

SECTION 1 — PROJECT STRUCTURE
aurelia/
├── backend/
│   ├── main.py              # FastAPI app
│   ├── models.py            # All Pydantic models
│   ├── concierge.py         # AI Concierge keyword logic
│   └── requirements.txt     # fastapi, uvicorn, pydantic
├── frontend/
│   ├── index.html           # Home / Shop
│   ├── about.html           # Brand Story
│   ├── contact.html         # Inquiry Form
│   ├── checkout.html        # Cart Review & Payment
│   ├── style.css            # Global shared styles + page-specific sections
│   └── script.js            # Global JS + page-specific scoped functions
└── README.md

Start backend with: uvicorn backend.main:app --reload --port 8000

SECTION 2 — DESIGN SYSTEM
Color Palette:
  - Obsidian: #0A0A0A (backgrounds)
  - Champagne Gold: #C5A059 (accents, borders, CTAs)
  - Pure White: #FFFFFF (text, cards)
  - Soft Charcoal: #1A1A1A (card backgrounds, surfaces)

Typography:
  - Headings: "Cormorant Garamond" (Google Fonts) — editorial, high-fashion
  - Body: "Jost" (Google Fonts) — clean, modern, highly legible

Design Principles:
  - Minimalist, editorial. Generous whitespace. No clutter.
  - Fully responsive: mobile-first layouts using CSS Grid/Flexbox.
  - All hover states must have smooth transitions (0.3s ease).

SECTION 3 — FRONTEND ARCHITECTURE

3.1 NAVIGATION (shared across all pages)
  - Persistent header: transparent on load, transitions to 
    semi-opaque glassmorphism on scroll.
  - Logo "AURELIA" left-aligned. Nav links center/right.
  - Cart icon with a live item-count badge pulled from localStorage.

3.2 PAGE SPECS

  index.html — Hero + dynamic product grid (fetch from /api/products).
  about.html — Editorial brand story with pull-quotes and full-bleed images.
  contact.html — Form with POST to /api/contact-submit. Success/error states.
  checkout.html — Cart review, order summary, payment simulation, 
                  confirmation overlay. Empty cart state with redirect.

3.3 GLOBAL JAVASCRIPT (script.js)
  - API_BASE_URL: const API_BASE = 'http://localhost:8000/api';
  - Cart: getCart(), addToCart(), removeFromCart(), clearCart(), getCartCount()
  - Page-scoping: data-page attribute on <body> per HTML file.

SECTION 4 — BACKEND ARCHITECTURE

Pydantic Models: CartItem, PaymentRequest, ChatMessage, ContactForm

Endpoints:
  GET  /api/products         — 8 luxury items with picsum images
  POST /api/process-payment  — 2s delay, returns order_id (uuid4)
  POST /api/contact-submit   — logs submission, returns confirmation
  POST /api/chat             — delegates to concierge.get_response()

SECTION 5 — CHAT UI
  - FAB: fixed bottom-right, gold circle, pulsing glow animation.
  - Window: slides up on click, gold border, dark background.
  - Typing indicator: 1s before bot reply appears.
  - Injected via script.js, appears on all pages.

SECTION 6 — TECHNICAL CONSTRAINTS
  - CORS: allow all localhost origins and file://.
  - requirements.txt: fastapi, uvicorn[standard], pydantic[email]
  - Error handling: all fetch() calls wrapped in try/catch.
  - No external JS frameworks. Vanilla JS only.
  - CSS custom properties defined in :root.
```

---

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS (custom properties, Grid, Flexbox), Vanilla JS (ES6+)
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic
- **Fonts**: Google Fonts (Cormorant Garamond, Jost)
- **Images**: picsum.photos (seeded, deterministic)

---

*AURELIA Maison · Milan · Paris · London · © 2026*
