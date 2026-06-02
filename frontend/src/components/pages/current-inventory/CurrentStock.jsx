import React, { useState, useEffect } from 'react';
import useAuthAxios from '../../../hooks/useAuthAxios';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableRow, Typography, Pagination, Stack, Paper, CircularProgress, Alert } from '@mui/material';
import SortableTableHead from '../../generic/SortableTableHead';
import useSortableData from '../../../hooks/useSortableData';

import GeneralFilter from '../../generic/GeneralFilter';
import SearchBox from '../../generic/SearchBox';
import ConfirmationDialog from '../../generic/ConfirmationDialog';
import VisibilityToggleButton from '../../generic/VisibilityToggleButton';


const CurrentStock = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ category: '', location: '' });
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showZeroStock, setShowZeroStock] = useState(false); // State to toggle visibility of zero-stock items
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Control filter visibility

  const api = useAuthAxios();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchItems();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, filters, sortOrder, page]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('inventory-logger/', {
        params: {
          page,
          ...(filters.category && { category: filters.category }),
          ...(filters.location && { location: filters.location }),
          ...(search && { search }),
          ordering: sortOrder === 'asc' ? 'quantity' : '-quantity',
        }
      });
      setItems(response.data.results);
      const pageSize = 10; // Adjust this value to your known page size
      const count = parseInt(response.data.count, 10);
      setTotalPages(Math.ceil(count / pageSize));
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearch = () => {
    fetchItems();
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleZeroStockToggle = () => {
    setShowZeroStock(prevShowZeroStock => !prevShowZeroStock);
  };

  // Filter items based on showZeroStock state
  const filteredItems = showZeroStock
    ? items
    : items.filter(item => item.quantity > 0);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { sortedData: sortedItems, order, orderBy, handleRequestSort } = useSortableData(filteredItems, 'item_name', 'asc');

  const handleFilterVisibilityToggle = () => {
    setIsFilterVisible(prev => !prev);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Total Current Stock</Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', md: 'center' }, gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 1, flexGrow: 1 }}>
              <SearchBox searchTerm={search} onSearchChange={handleSearchChange} onSearch={handleSearch} />
              <VisibilityToggleButton
                  onClick={handleFilterVisibilityToggle} 
                  isFilterVisible={isFilterVisible}
              />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleSortOrderToggle}
              color="primary"
              sx={{
                  height: '42px',
                  borderRadius: '8px',
                  px: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#f8fafc' }
              }}
            >
              Sort by Quantity: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleZeroStockToggle}
              color="primary"
              sx={{
                  height: '42px',
                  borderRadius: '8px',
                  px: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#f8fafc' }
              }}
            >
              {showZeroStock ? 'Hide Zero Stock' : 'Show Zero Stock'}
            </Button>
          </Box>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
          {isFilterVisible && (
              <GeneralFilter 
                  filters={filters} 
                  setFilters={setFilters} 
                  hiddenFields={['from_location', 'to_location', 'adjustment_type', 'item_name', 'start_date', 'end_date']}
                  visible={isFilterVisible}
              />
          )}
      </Box>

      {/* Inventory Items Display */}
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <SortableTableHead
            columns={[
              { id: 'category_name', label: 'Category' },
              { id: 'item_name', label: 'Item Name' },
              { id: 'product_code', label: 'Product Code' },
              { id: 'sku', label: 'SKU' },
              { id: 'quantity', label: 'Total Quantity' },
              { id: 'location_name', label: 'Location' },
            ]}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Alert severity="info">No results found</Alert>
                </TableCell>
              </TableRow>
            ) : (
              sortedItems.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.category ? item.category_name : 'N/A'}</TableCell>
                  <TableCell>{item.item_name}</TableCell>
                  <TableCell>{item.product_code}</TableCell>
                  <TableCell>{item.sku}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.location ? item.location_name : 'N/A'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Stack spacing={2} alignItems="center" style={{ marginTop: '20px' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default CurrentStock;
