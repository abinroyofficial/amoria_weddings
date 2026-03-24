from django.db import models


class Testimonial(models.Model):
    author_name = models.CharField(max_length=150)
    role = models.CharField(max_length=100, blank=True, help_text='e.g. Bride, Groom, Mother of Bride')
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    is_featured = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.author_name} – {self.rating}★"
