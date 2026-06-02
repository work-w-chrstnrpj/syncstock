import React from 'react';
import Add from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const AddUnitButton = ({ onClick }) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={onClick}
            disableElevation
            sx={{
                height: '42px',
                borderRadius: '8px',
                px: 3,
                textTransform: 'none',
                fontWeight: 600
            }}
        >
            Add
        </Button>
    );
};

export default AddUnitButton;