import React, { useState } from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import ChangeProfilePic from './ChangeProfilePic';
import ChangePassword from './ChangePassword';
import ChangeInformation from './ChangeInformation';

const tabs = [
  { id: 'profile', label: 'Profile Picture', icon: <PhotoCameraOutlinedIcon /> },
  { id: 'info', label: 'Account Information', icon: <PersonOutlineIcon /> },
  { id: 'password', label: 'Change Password', icon: <LockOutlinedIcon /> },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827' }}>Settings</Typography>
        <Typography variant="body2" sx={{ color: '#6b7280', mt: 0.5 }}>
          Manage your account preferences and personal information
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        {/* Left Sidebar Navigation */}
        <Box sx={{
          width: 240,
          flexShrink: 0,
          bgcolor: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
        }}>
          <Box sx={{ p: 2, borderBottom: '1px solid #f3f4f6' }}>
            <Typography variant="caption" sx={{ color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Preferences
            </Typography>
          </Box>
          <List dense disablePadding>
            {tabs.map((tab) => (
              <ListItem key={tab.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (tab.id === 'password') {
                      setPasswordDialogOpen(true);
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  selected={activeTab === tab.id}
                  sx={{
                    px: 2, py: 1.5,
                    borderLeft: activeTab === tab.id ? '3px solid #2563eb' : '3px solid transparent',
                    '&.Mui-selected': {
                      bgcolor: '#eff6ff',
                      '& .MuiListItemIcon-root': { color: '#2563eb' },
                      '& .MuiListItemText-primary': { color: '#2563eb', fontWeight: 600 },
                    },
                    '&:hover': { bgcolor: '#f9fafb' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: '#6b7280' }}>{tab.icon}</ListItemIcon>
                  <ListItemText
                    primary={tab.label}
                    primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: 500, color: '#4b5563' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Content Area */}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{
            bgcolor: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            p: 4,
            minHeight: 420,
          }}>
            {activeTab === 'profile' && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>Profile Picture</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                  Upload a photo to personalize your account
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <ChangeProfilePic />
              </>
            )}
            {activeTab === 'info' && (
              <>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>Account Information</Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 3 }}>
                  View and update your personal details
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <ChangeInformation />
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Password Dialog — opened via sidebar */}
      <ChangePassword
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
      />
    </Box>
  );
};

export default Settings;
