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

## Tech Stack

- **Frontend**: HTML5, Vanilla CSS (custom properties, Grid, Flexbox), Vanilla JS (ES6+)
- **Backend**: Python 3.10+, FastAPI, Uvicorn, Pydantic
- **Fonts**: Google Fonts (Cormorant Garamond, Jost)
- **Images**: picsum.photos (seeded, deterministic)

---

*AURELIA Maison · Milan · Paris · London · © 2026*
