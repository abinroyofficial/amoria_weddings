from django.db import models


class Service(models.Model):
    CATEGORY_CHOICES = [
        ('decoration', 'Wedding Decoration'),
        ('floral', 'Floral Design'),
        ('stage', 'Stage Setup'),
        ('planning', 'Full Event Planning'),
    ]

    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
