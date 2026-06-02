// components/Inventory.js

import React, { useState, useEffect } from 'react';
import useAuthAxios from '../../../hooks/useAuthAxios';
import InventoryForm from './InventoryForm';
import {
    Box, Button, Table, TableBody, TableCell, TableContainer,
    TableRow, Typography, Pagination, Stack, Paper, CircularProgress, Alert
} from '@mui/material';
import { Add, Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../../../context/AuthProvider';
import SortableTableHead from '../../generic/SortableTableHead';
import useSortableData from '../../../hooks/useSortableData';

import GeneralFilter from '../../generic/GeneralFilter';
import SearchBox from '../../generic/SearchBox';
import ConfirmationDialog from '../../generic/ConfirmationDialog';
import VisibilityToggleButton from '../../generic/VisibilityToggleButton';
import AddUnitButton from '../../generic/AddUnitButton';


const INVENTORY_COLUMNS = [
    { id: 'inventory_date', label: 'Date' },
    { id: 'category_name', label: 'Category' },
    { id: 'product_code', label: 'Product Code' },
    { id: 'item_name', label: 'Item Name' },
    { id: 'supplier_name', label: 'Supplier Name' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'sku', label: 'SKU' },
    { id: 'location_name', label: 'Location' },
    { id: 'actions', label: 'Actions', sortable: false, align: 'right', sx: { paddingRight: '90px' } },
];

const InventoryLogger = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [filters, setFilters] = useState({ 
        start_date: '', end_date: '', category: '', location: '' });
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const { isAuthenticated } = useAuth();
    const { sortedData: sortedItems, order, orderBy, handleRequestSort } = useSortableData(items, 'inventory_date', 'desc');
    const api = useAuthAxios();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (isAuthenticated) {
                fetchItems();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, filters, page, isAuthenticated]);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.get('inventory-logger/', {
                params: {
                    page,
                    ...(filters.location && { location: filters.location }),
                    ...(filters.category && { category: filters.category }),
                    ...(filters.start_date && { start_date: filters.start_date }),
                    ...(filters.end_date && { end_date: filters.end_date }),
                    ...(search && { search })
                }
            });
            setItems(response.data.results);
            const pageSize = 10;
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

    const handleAddItem = () => {
        setEditingItem(null);
        setShowForm(true);
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleOpenDelete = (id) => {
        setDeleteId(id);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await api.delete(`inventory-items/${deleteId}/`);
            fetchItems();
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
        setDeleteId(null);
    };

    const handleFilterVisibilityToggle = () => {
        setIsFilterVisible(prev => !prev);
    };

    if (!isAuthenticated) {
        return <p>You must be logged in to view this page.</p>;
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>Inventory Logger</Typography>

            {/* Top Bar: Search, Filters Toggle, and Add Button */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, gap: 1, flexGrow: 1 }}>
                    <SearchBox searchTerm={search} onSearchChange={handleSearchChange} onSearch={handleSearch} />
                    <VisibilityToggleButton
                        onClick={handleFilterVisibilityToggle} 
                        isFilterVisible={isFilterVisible}
                    />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' } }}>
                    <AddUnitButton onClick={handleAddItem} />
                </Box>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center">
                {isFilterVisible && (
                    <GeneralFilter 
                        filters={filters} 
                        setFilters={setFilters} 
                        hiddenFields={['from_location', 'to_location', 'adjustment_type', 'item_name']}
                        visible={isFilterVisible}
                    />
                )}
            </Box>

            {/* Inventory Items Display */}
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <SortableTableHead
                        columns={INVENTORY_COLUMNS}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} align="center">
                                    <Alert severity="info">No results found</Alert>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.inventory_date}</TableCell>
                                    <TableCell>{item.category ? item.category_name : 'N/A'}</TableCell>
                                    <TableCell>{item.product_code}</TableCell>
                                    <TableCell>{item.item_name}</TableCell>
                                    <TableCell>{item.supplier_name}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.sku}</TableCell>
                                    <TableCell>{item.location ? item.location_name : 'N/A'}</TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <IconButton size="small" sx={{ bgcolor: '#ecfdf5', color: '#10b981', '&:hover': { bgcolor: '#d1fae5' } }}>
                                                <ViewIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleEditItem(item)} sx={{ bgcolor: '#eff6ff', color: '#3b82f6', '&:hover': { bgcolor: '#dbeafe' } }}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton size="small" onClick={() => handleOpenDelete(item.id)} sx={{ bgcolor: '#fef2f2', color: '#ef4444', '&:hover': { bgcolor: '#fee2e2' } }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
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

            {/* Inventory Form */}
            {showForm && (
                <InventoryForm
                    item={editingItem}
                    onClose={() => setShowForm(false)}
                    onSave={fetchItems}
                />
            )}

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                open={openDeleteDialog}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this item?<br /><small style='font-style: italic;'>This data will be permanently lost upon deletion.</small>"
            />
        </div>
    );
};

export default InventoryLogger;
