import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'amoria_backend.settings')
django.setup()

from gallery.models import GalleryItem

# Clear existing gallery items for a clean cinematic state
GalleryItem.objects.all().delete()

# High-quality wedding reels from public CDNs
items = [
    {
        "title": "Ethereal Garden Union",
        "video_url": "https://cdn.pixabay.com/vimeo/457580662/wedding-51111.mp4?width=1280&hash=1230e7ed87da48fcae5546e8c0fa3d88b4887342",
        "tag": "hero",
        "is_hero": True
    },
    {
        "title": "Grand Ballroom Waltz",
        "video_url": "https://cdn.pixabay.com/vimeo/345435349/dance-24874.mp4?width=640&hash=c900e704020a32432e650462e76f57a3e790fe7f",
        "tag": "stage",
        "is_hero": False
    },
    {
        "title": "Signature Floral Curation",
        "video_url": "https://cdn.pixabay.com/vimeo/182527260/wedding-5334.mp4?width=640&hash=6f383e87870a2f4a43f8e4e7e7a5e4a8a5f4e4a7",
        "tag": "floral",
        "is_hero": False
    }
]

for item in items:
    GalleryItem.objects.create(**item)

print("Successfully seeded the gallery with cinematic high-quality videos.")
