import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import InventoryLoggerItem, Category, Location, StockAdjustment, StockTransfer

class InventoryLoggerItemFilterSet(django_filters.FilterSet):
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.none())
    location = django_filters.ModelChoiceFilter(queryset=Location.objects.none())
    start_date = django_filters.DateFilter(field_name='inventory_date', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='inventory_date', lookup_expr='lte')

    class Meta:
        model = InventoryLoggerItem
        fields = ['item_name', 'category', 'location', 'start_date', 'end_date']

    def __init__(self, *args, **kwargs):
        # Extract request from kwargs if present
        request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)

        # Filter choices based on user's company
        if request and request.user and hasattr(request.user, 'company'):
            company = request.user.company
            self.filters['category'].queryset = Category.objects.filter(company=company)
            self.filters['location'].queryset = Location.objects.filter(company=company)
        else:
            # Handle the case where request or company is not properly set
            print("Request or company not set correctly")

class StockAdjustmentFilterSet(django_filters.FilterSet):
    item = django_filters.ModelChoiceFilter(queryset=InventoryLoggerItem.objects.none())
    location = django_filters.ModelChoiceFilter(queryset=Location.objects.none())
    adjustment_type = django_filters.ChoiceFilter(choices=StockAdjustment.ADJUSTMENT_TYPES)
    start_date = django_filters.DateFilter(field_name='date', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='date', lookup_expr='lte')

    class Meta:
        model = StockAdjustment
        fields = ['item', 'category', 'location', 'adjustment_type', 'start_date', 'end_date']

    def __init__(self, *args, **kwargs):
        request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)

        if request and request.user and hasattr(request.user, 'company'):
            company = request.user.company
            self.filters['item'].queryset = InventoryLoggerItem.objects.filter(company=company)
            self.filters['location'].queryset = Location.objects.filter(company=company)
            self.filters['category'].queryset = Category.objects.filter(company=company)
        else:
            # Handle the case where request or company is not properly set
            print("Request or company not set correctly")

class StockTransferFilterSet(django_filters.FilterSet):
    item = django_filters.ModelChoiceFilter(queryset=InventoryLoggerItem.objects.none())
    from_location = django_filters.ModelChoiceFilter(queryset=Location.objects.none())
    to_location = django_filters.ModelChoiceFilter(queryset=Location.objects.none())
    category = django_filters.ModelChoiceFilter(queryset=Category.objects.none())
    start_date = django_filters.DateFilter(field_name='date', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='date', lookup_expr='lte')

    class Meta:
        model = StockTransfer
        fields = ['item', 'category', 'from_location', 'to_location', 'start_date', 'end_date']

    def __init__(self, *args, **kwargs):
        request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)

        if request and request.user and hasattr(request.user, 'company'):
            company = request.user.company
            self.filters['item'].queryset = InventoryLoggerItem.objects.filter(company=company)
            self.filters['from_location'].queryset = Location.objects.filter(company=company)
            self.filters['to_location'].queryset = Location.objects.filter(company=company)
            self.filters['category'].queryset = Category.objects.filter(company=company)
        else:
            print("Request or company not set correctly")
