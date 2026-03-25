from django.db import models


class GalleryItem(models.Model):
    TAG_CHOICES = [
        ('all', 'All'),
        ('decoration', 'Decoration'),
        ('floral', 'Floral'),
        ('stage', 'Stage'),
        ('planning', 'Planning'),
        ('reception', 'Reception'),
        ('hero', 'Hero Video'),
    ]

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/', null=True, blank=True)
    video_url = models.URLField(max_length=500, null=True, blank=True, help_text="URL for the video (e.g. from a CDN or public link)")
    tag = models.CharField(max_length=50, choices=TAG_CHOICES, default='all')
    is_hero = models.BooleanField(default=False, help_text="Set to True if this is the main hero background video")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
