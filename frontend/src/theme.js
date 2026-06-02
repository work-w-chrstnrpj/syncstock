import { createTheme } from '@mui/material/styles';

const modernTheme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Modern blue from landing page
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f97316', // Orange accent if needed
    },
    background: {
      default: '#f9fafb', // Soft gray background for the app
      paper: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: '"Inter", "system-ui", "sans-serif"',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: {
      textTransform: 'none', // Modern buttons don't use all-caps
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10, // 10px rounded corners globally
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          height: '40px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Very soft shadow
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#111827',
          boxShadow: 'none',
          borderBottom: '1px solid #e5e7eb', // subtle border instead of shadow
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#6b7280', // Gray header text
          backgroundColor: '#f9fafb', // Light gray background for table headers
          borderBottom: '1px solid #e5e7eb',
        },
        body: {
          color: '#111827',
          borderBottom: '1px solid #f3f4f6', // Very subtle row dividers
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          height: '40px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '40px',
        },
      },
    },
  },
});

export default modernTheme;
