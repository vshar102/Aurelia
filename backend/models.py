from pydantic import BaseModel, EmailStr
from typing import List


class CartItem(BaseModel):
    id: int
    name: str
    price: float
    quantity: int


class PaymentRequest(BaseModel):
    items: List[CartItem]
    total: float


class ChatMessage(BaseModel):
    message: str


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
