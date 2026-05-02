import asyncio
import uuid
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import CartItem, PaymentRequest, ChatMessage, ContactForm
from concierge import get_response

app = FastAPI(title="AURELIA API", version="1.0.0")

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Product Catalogue ─────────────────────────────────────────────────────────
PRODUCTS = [
    {
        "id": 1,
        "name": "Nocturne Overcoat",
        "category": "Outerwear",
        "price": 4850.00,
        "description": "Double-faced cashmere with hand-stitched lapels. The definitive AURELIA silhouette.",
        "image_url": "https://picsum.photos/seed/1/600/800",
    },
    {
        "id": 2,
        "name": "Obsidian Blazer",
        "category": "Outerwear",
        "price": 3200.00,
        "description": "Structured Italian wool with a peaked lapel. Authority in its purest form.",
        "image_url": "https://picsum.photos/seed/2/600/800",
    },
    {
        "id": 3,
        "name": "Silk Reverie Blouse",
        "category": "Outerwear",
        "price": 1450.00,
        "description": "Hand-rolled edges on grade-A Mulberry silk. Effortless and refined.",
        "image_url": "https://picsum.photos/seed/3/600/800",
    },
    {
        "id": 4,
        "name": "Champagne Silk Scarf",
        "category": "Accessories",
        "price": 680.00,
        "description": "Pure silk, hand-painted in Florence. A statement of quiet luxury.",
        "image_url": "https://picsum.photos/seed/4/600/800",
    },
    {
        "id": 5,
        "name": "Atelier Belt",
        "category": "Accessories",
        "price": 520.00,
        "description": "Full-grain calfskin with a brushed 18k gold buckle. Handmade in Florence.",
        "image_url": "https://picsum.photos/seed/5/600/800",
    },
    {
        "id": 6,
        "name": "Noir Leather Gloves",
        "category": "Accessories",
        "price": 390.00,
        "description": "Peccary leather, cashmere-lined. An heirloom for the modern wardrobe.",
        "image_url": "https://picsum.photos/seed/6/600/800",
    },
    {
        "id": 7,
        "name": "Milan Derby Shoe",
        "category": "Footwear",
        "price": 1890.00,
        "description": "Goodyear-welted calfskin with a Venetian last. Built to last a lifetime.",
        "image_url": "https://picsum.photos/seed/7/600/800",
    },
    {
        "id": 8,
        "name": "Chelsea in Cordovan",
        "category": "Footwear",
        "price": 2100.00,
        "description": "Hand-burnished shell cordovan on a classic Chelsea silhouette.",
        "image_url": "https://picsum.photos/seed/8/600/800",
    },
]


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/api/products")
async def get_products():
    return PRODUCTS


@app.post("/api/process-payment")
async def process_payment(payload: PaymentRequest):
    await asyncio.sleep(2)  # Simulate payment processing
    order_id = str(uuid.uuid4()).upper()[:12]
    return {
        "status": "success",
        "order_id": order_id,
        "message": "Your order has been confirmed. A receipt will arrive shortly.",
    }


@app.post("/api/contact-submit")
async def contact_submit(form: ContactForm):
    print(f"\n[AURELIA INQUIRY] From: {form.name} <{form.email}>")
    print(f"  Subject : {form.subject}")
    print(f"  Message : {form.message}\n")
    return {
        "status": "received",
        "message": "Thank you for your enquiry. Our team will be in touch within 24 hours.",
    }


@app.post("/api/chat")
async def chat(payload: ChatMessage):
    reply = get_response(payload.message)
    return {"reply": reply}
