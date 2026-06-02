from django.contrib import admin
from .models import User, InventoryLoggerItem, StockAdjustment, StockTransfer, Location, Category, Company

from django.contrib.auth.models import Group, Permission

class UserAdmin(admin.ModelAdmin):
    list_display = ('id','username', 'email', 'first_name', 'last_name', "company")
    search_fields = ('username', 'email')

class InventoryLoggerItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'company', 'item_name', 'product_code', 'sku', 'quantity', 'price', 'location', 'category')
    search_fields = ('item_name', 'location', 'product_code')
    list_filter = ('category', 'location')

class UserInline(admin.TabularInline):
    model = User
    extra = 0

class CompanyAdmin(admin.ModelAdmin):
    model = Company
    inlines = [UserInline]
    list_display = ('id', 'name', 'company_code')
    search_fields = ('name', 'company_code')

class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'address', 'company')
    list_filter = ('company',)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'company')
    list_filter = ('company',)

class StockAdjustmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'company', 'item', 'adjustment_type', 'location', 'quantity', 'reason')
    list_filter = ('company',)


class StockTransferAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'company', 'item', 'quantity', 'from_location', 'to_location')
    list_filter = ('company',)




admin.site.register(Location, LocationAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(InventoryLoggerItem, InventoryLoggerItemAdmin)
admin.site.register(StockAdjustment, StockAdjustmentAdmin)
admin.site.register(StockTransfer, StockTransferAdmin)
admin.site.register(Company, CompanyAdmin)