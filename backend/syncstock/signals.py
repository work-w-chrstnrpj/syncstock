from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.db.models import F
from django.core.exceptions import ValidationError
from .models import InventoryLoggerItem, StockAdjustment, StockTransfer

# StockAdjustment signals
@receiver(pre_save, sender=StockAdjustment)
def validate_stock_adjustment(sender, instance, **kwargs):
    if not instance.pk: # Only on create
        if instance.item.quantity < instance.quantity and instance.adjustment_type in ['remove', 'missing', 'damage', 'expired', 'sold']:
            raise ValidationError("Insufficient stock, cannot proceed with the adjustment.")

@receiver(post_save, sender=StockAdjustment)
def update_inventory_on_adjustment_save(sender, instance, created, **kwargs):
    if created:
        if instance.adjustment_type in ['remove', 'missing', 'damage', 'expired', 'sold']:
            InventoryLoggerItem.objects.filter(pk=instance.item.pk).update(quantity=F('quantity') - instance.quantity)
        else:
            InventoryLoggerItem.objects.filter(pk=instance.item.pk).update(quantity=F('quantity') + instance.quantity)

@receiver(post_delete, sender=StockAdjustment)
def update_inventory_on_adjustment_delete(sender, instance, **kwargs):
    if instance.adjustment_type in ['remove', 'missing', 'damage', 'expired', 'sold']:
        InventoryLoggerItem.objects.filter(pk=instance.item.pk).update(quantity=F('quantity') + instance.quantity)
    else:
        InventoryLoggerItem.objects.filter(pk=instance.item.pk).update(quantity=F('quantity') - instance.quantity)


# StockTransfer signals
@receiver(pre_save, sender=StockTransfer)
def validate_stock_transfer(sender, instance, **kwargs):
    if not instance.pk:
        # Check source inventory item quantity
        if instance.item.quantity < instance.quantity:
            raise ValidationError("Insufficient stock for transfer.")

@receiver(post_save, sender=StockTransfer)
def update_inventory_on_transfer_save(sender, instance, created, **kwargs):
    if created:
        # Decrease from source item
        InventoryLoggerItem.objects.filter(pk=instance.item.pk).update(quantity=F('quantity') - instance.quantity)
        
        # We also need to add to the destination location. 
        # In this data model, does StockTransfer create a new InventoryLoggerItem at the destination?
        # Usually it should. If the destination item exists, update it. Else create it.
        dest_item = InventoryLoggerItem.objects.filter(
            item_name=instance.item.item_name,
            sku=instance.item.sku,
            location=instance.to_location,
            company=instance.company
        ).first()
        
        if dest_item:
            InventoryLoggerItem.objects.filter(pk=dest_item.pk).update(quantity=F('quantity') + instance.quantity)
        else:
            InventoryLoggerItem.objects.create(
                item_name=instance.item.item_name,
                sku=instance.item.sku,
                product_code=instance.item.product_code,
                supplier_name=instance.item.supplier_name,
                additional_description=instance.item.additional_description,
                quantity=instance.quantity,
                price=instance.item.price,
                inventory_date=instance.date,
                expiration_date=instance.item.expiration_date,
                location=instance.to_location,
                category=instance.item.category,
                user=instance.user,
                company=instance.company
            )
