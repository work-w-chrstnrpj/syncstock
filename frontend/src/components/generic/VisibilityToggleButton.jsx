import React from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

const VisibilityToggleButton = ({  onClick, isFilterVisible }) => {
    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={onClick}
            startIcon={isFilterVisible ? <FilterListOffIcon /> : <FilterListIcon />}
            sx={{
                height: '42px',
                borderRadius: '8px',
                px: 2,
                textTransform: 'none',
                fontWeight: 600,
                backgroundColor: '#fff',
                '&:hover': {
                    backgroundColor: '#f8fafc',
                }
            }}
        >
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
        </Button>
   );
}

export default VisibilityToggleButton;