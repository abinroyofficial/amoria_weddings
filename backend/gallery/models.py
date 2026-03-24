from django.db import models


class GalleryItem(models.Model):
    TAG_CHOICES = [
        ('all', 'All'),
        ('decoration', 'Decoration'),
        ('floral', 'Floral'),
        ('stage', 'Stage'),
        ('planning', 'Planning'),
        ('reception', 'Reception'),
    ]

    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='gallery/')
    tag = models.CharField(max_length=50, choices=TAG_CHOICES, default='all')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
