import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'amoria_backend.settings')
django.setup()

from services.models import Service

# Delete previous services to ensure clean state for the 4 featured ones
Service.objects.all().delete()

services = [
    {
        "name": "Bespoke Decoration",
        "category": "decoration",
        "description": "We transform spaces into ethereal dreamscapes using custom-built installations, premium textiles, and immersive lighting.",
        "is_featured": True
    },
    {
        "name": "Exquisite Florals",
        "category": "floral",
        "description": "Our master florists curate rare and exotic blooms to create living tapestries of color and scent.",
        "is_featured": True
    },
    {
        "name": "Signature Stages",
        "category": "stage",
        "description": "Grand, high-impact stages designed with 3D visuals and bespoke furniture to anchor your celebration.",
        "is_featured": True
    },
    {
        "name": "Total Management",
        "category": "planning",
        "description": "End-to-end orchestration of your wedding journey, ensuring every detail is executed with silent precision.",
        "is_featured": True
    }
]

for s in services:
    Service.objects.create(**s)

print("Successfully added new services to the database.")
