import React, { useState } from 'react';
import {
  Typography, Button, Box, TextField, Grid,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Snackbar, Alert, Chip
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ChangePassword from './ChangePassword';
import useFetchUserDetails from '../../../hooks/useFetchUserDetails';
import userAuthAxios from '../../../hooks/useAuthAxios';

const ChangeInformation = () => {
  const { userDetails, setUserDetails, error } = useFetchUserDetails();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const api = userAuthAxios();

  const handleSave = () => {
    api.put('user-details/', userDetails)
      .then(response => {
        setUserDetails(response.data);
        setDialogOpen(false);
        setSnackbarMessage('Profile updated successfully.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => { window.location.reload(); }, 2000);
      })
      .catch(() => {
        setSnackbarMessage('Failed to update profile. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  if (error) {
    return <Typography color="error">Error fetching user details.</Typography>;
  }

  const InfoRow = ({ label, value }) => (
    <Box sx={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      py: 1.5, borderBottom: '1px solid #f3f4f6',
      '&:last-child': { borderBottom: 'none' }
    }}>
      <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500, minWidth: 130 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: '#111827', fontWeight: 500, flexGrow: 1, textAlign: 'right' }}>
        {value || <Chip label="Not set" size="small" sx={{ bgcolor: '#f3f4f6', color: '#9ca3af' }} />}
      </Typography>
    </Box>
  );

  return (
    <>
      <Box>
        <InfoRow label="First Name" value={userDetails.first_name} />
        <InfoRow label="Last Name" value={userDetails.last_name} />
        <InfoRow label="Username" value={userDetails.username} />
        <InfoRow label="Email" value={userDetails.email} />
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mt: 4, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditOutlinedIcon />}
          onClick={() => setDialogOpen(true)}
          sx={{ borderRadius: '8px', px: 3, boxShadow: 'none' }}
        >
          Edit Information
        </Button>
        <Button
          variant="outlined"
          startIcon={<LockOutlinedIcon />}
          onClick={() => setPasswordDialogOpen(true)}
          sx={{ borderRadius: '8px', px: 3, borderColor: '#e5e7eb', color: '#374151' }}
        >
          Change Password
        </Button>
      </Box>

      {/* Edit Information Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: '12px' } }}>
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>Edit Profile Information</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid item xs={6}>
              <TextField
                label="First Name" fullWidth
                value={userDetails.first_name || ''}
                onChange={(e) => setUserDetails({ ...userDetails, first_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name" fullWidth
                value={userDetails.last_name || ''}
                onChange={(e) => setUserDetails({ ...userDetails, last_name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Username" fullWidth
                value={userDetails.username || ''}
                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email" fullWidth type="email"
                value={userDetails.email || ''}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDialogOpen(false)} sx={{ borderRadius: '8px', color: '#6b7280' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" sx={{ borderRadius: '8px', boxShadow: 'none', px: 3 }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <ChangePassword open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} />

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ borderRadius: '8px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChangeInformation;
