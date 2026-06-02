const currentInventoryConfig = {
  apiEndpoint: 'inventory-items/',
  chartTitle: 'Current Inventory Analytics',
  filtersConfig: {
    category: '',
    location: '',
    item_name: ''
  },
  hiddenFields: ['from_location', 'to_location', 'adjustment_type', 'start_date', 'end_date'],
  mappedData: (item) => ({
      item_name: item.item_name,
      total_quantity: item.quantity
  })
};

export default currentInventoryConfig;
