from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
import uuid
import datetime

class Company(models.Model):
    name = models.CharField(max_length=255)
    company_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    company_email = models.EmailField(unique=True)
    company_address = models.TextField(blank=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    company = models.ForeignKey(Company, on_delete=models.PROTECT, related_name='users')
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)

    def __str__(self):
        return self.username
    
    @property
    def company_code(self):
        return self.company.company_code

class Location(models.Model):
    company = models.ForeignKey(Company, on_delete=models.PROTECT)
    name = models.CharField(max_length=255)
    address = models.TextField()
    description = models.TextField(blank=True)
    person_in_charge = models.CharField(max_length=255, blank=True, null=True)
    google_maps_url = models.CharField(max_length=1000, blank=True, null=True)

    def __str__(self):
        return self.name

class InventoryLoggerItem(models.Model):
    item_name = models.CharField(max_length=255)
    sku = models.CharField(max_length=50)
    product_code = models.CharField(max_length=100, blank=True)
    supplier_name = models.CharField(max_length=255, blank=True)
    additional_description = models.TextField(blank=True, null=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=20, decimal_places=2)
    inventory_date = models.DateField()
    expiration_date = models.DateField(null=True, blank=True)
    location = models.ForeignKey('Location', on_delete=models.PROTECT)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)  
    company = models.ForeignKey(Company, on_delete=models.PROTECT) 
    def __str__(self):
        return self.item_name

class StockAdjustment(models.Model):
    ADJUSTMENT_TYPES = [
        ('remove', 'Remove'),
        ('missing', 'Missing'),
        ('damage', 'Damage'),
        ('expired', 'Expired'),
        ('sold', 'Sold'),
    ]

    item = models.ForeignKey(InventoryLoggerItem, on_delete=models.CASCADE)
    adjustment_type = models.CharField(max_length=10, choices=ADJUSTMENT_TYPES)
    quantity = models.IntegerField()
    date = models.DateField()
    reason = models.TextField(blank=True, null=True)
    company = models.ForeignKey('Company', on_delete=models.PROTECT)
    location = models.ForeignKey('Location', on_delete=models.PROTECT)
    # sku and product_code are removed as they are redundant.
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)

    class Meta:
        ordering = ['date']

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Call save method once

    def __str__(self):
        return f"{self.adjustment_type} - {self.item.item_name}"

class StockTransfer(models.Model):
    from_location = models.ForeignKey('Location', related_name='transfers_from', on_delete=models.PROTECT)
    to_location = models.ForeignKey('Location', related_name='transfers_to', on_delete=models.PROTECT)
    item = models.ForeignKey(InventoryLoggerItem, on_delete=models.CASCADE) 
    quantity = models.IntegerField()
    date = models.DateField()
    company = models.ForeignKey('Company', on_delete=models.PROTECT)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    # Additional fields for tracking
    supplier_name = models.CharField(max_length=25, blank=True, null=True)
    additional_description = models.TextField(max_length=255, blank=True, null=True)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    expiration_date = models.DateField(blank=True, null=True)
    category = models.ForeignKey('Category', on_delete=models.PROTECT)

    def __str__(self):
        return f"Transfer from {self.from_location.name} to {self.to_location.name}"

class Category(models.Model):
    company = models.ForeignKey(Company, on_delete=models.PROTECT)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category_image = models.ImageField(upload_to='category_images/', null=True, blank=True)  # Updated line

    def __str__(self):
        return self.name
