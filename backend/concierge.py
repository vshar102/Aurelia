"""
AURELIA AI Concierge — Keyword-Matching Personal Shopper
"""

RESPONSES = [
    {
        "keywords": ["material", "fabric", "made of", "composition", "textile", "cloth"],
        "reply": (
            "Our pieces are crafted exclusively from hand-sourced Italian silk "
            "and Grade-A cashmere drawn from the highlands of Inner Mongolia. "
            "Every thread is selected by our master atelier in Milan, ensuring "
            "a tactile experience that is nothing short of extraordinary."
        ),
    },
    {
        "keywords": ["price", "cost", "expensive", "worth", "value", "afford"],
        "reply": (
            "At AURELIA, our pricing reflects the uncompromising quality, "
            "the provenance of our materials, and the artisanship of our "
            "master craftspeople. Each piece is an investment — one that "
            "only appreciates in character over time."
        ),
    },
    {
        "keywords": ["size", "fit", "measurements", "sizing", "small", "large", "medium"],
        "reply": (
            "We offer a bespoke sizing consultation to ensure an impeccable fit. "
            "May I direct you to our detailed Size Guide, or I can connect you "
            "with our in-house tailor for a truly personalised experience? "
            "AURELIA believes that luxury begins the moment the garment meets your form."
        ),
    },
    {
        "keywords": ["shipping", "delivery", "arrive", "dispatch", "courier", "when"],
        "reply": (
            "Every AURELIA order is dispatched via private courier, "
            "nestled within our signature obsidian gift box — a ritual "
            "as considered as the garments themselves. Delivery typically "
            "graces your door within 3 to 5 business days."
        ),
    },
    {
        "keywords": ["return", "refund", "exchange", "send back", "policy"],
        "reply": (
            "We honour a 14-day return policy for unworn garments presented "
            "in their original, pristine packaging. Our concierge team will "
            "personally guide you through the process, ensuring every "
            "interaction with AURELIA remains effortless."
        ),
    },
    {
        "keywords": ["new", "latest", "collection", "season", "launch", "nocturne"],
        "reply": (
            "Our current collection, 'Nocturne,' draws its inspiration from "
            "the sweeping architectural drama of fin-de-siècle Vienna. "
            "Each silhouette speaks to a quiet confidence — designed for "
            "those who prefer their elegance understated yet unmistakable."
        ),
    },
    {
        "keywords": ["hello", "hi", "hey", "good morning", "good evening", "greetings"],
        "reply": (
            "Good day. Welcome to AURELIA. I am your personal concierge, "
            "at your service for any enquiry — be it our fabrics, collections, "
            "sizing, or the nuances of an order. How may I be of service today?"
        ),
    },
    {
        "keywords": ["recommend", "suggest", "what should", "best", "popular", "favourite"],
        "reply": (
            "For a first acquisition from AURELIA, I would suggest the "
            "'Nocturne Overcoat' — our most celebrated piece this season. "
            "Rendered in double-faced cashmere with hand-stitched lapels, "
            "it is the very definition of understated authority."
        ),
    },
]

DEFAULT_REPLY = (
    "I am AURELIA's personal concierge, and it would be my pleasure to assist you. "
    "I can speak to our fabrics and materials, sizing and fit, the 'Nocturne' collection, "
    "shipping, or our return policy. How may I be of service?"
)


def get_response(message: str) -> str:
    """Return a sophisticated concierge reply based on keyword matching."""
    lower = message.lower()
    for entry in RESPONSES:
        for kw in entry["keywords"]:
            if kw in lower:
                return entry["reply"]
    return DEFAULT_REPLY
