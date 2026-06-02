import React from 'react';
import { Box, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = ({ searchTerm, onSearchChange, onSearch }) => {
    return (
        <Box display="flex" alignItems="center" gap={1.5} flexGrow={1}>
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchTerm}
                onChange={onSearchChange}
                size="small"
                sx={{
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                        height: '42px',
                        borderRadius: '8px',
                        backgroundColor: '#fff',
                    }
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" fontSize="small" />
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSearch}
                disableElevation
                sx={{
                    height: '42px',
                    borderRadius: '8px',
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600
                }}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBox;
