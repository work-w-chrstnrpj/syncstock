import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

/**
 * SortableTableHead — drop-in replacement for <TableHead>.
 *
 * Props:
 *   columns: Array<{ id: string, label: string, align?: 'left' | 'right' | 'center', sortable?: boolean, sx?: object }>
 *   order: 'asc' | 'desc'
 *   orderBy: string
 *   onRequestSort: (columnId: string) => void
 */
const SortableTableHead = ({ columns, order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((col) =>
          col.sortable === false ? (
            <TableCell key={col.id} align={col.align || 'left'} sx={col.sx}>
              {col.label}
            </TableCell>
          ) : (
            <TableCell
              key={col.id}
              align={col.align || 'left'}
              sortDirection={orderBy === col.id ? order : false}
              sx={col.sx}
            >
              <TableSortLabel
                active={orderBy === col.id}
                direction={orderBy === col.id ? order : 'asc'}
                onClick={createSortHandler(col.id)}
                sx={{
                  '&.Mui-active': { color: '#2563eb' },
                  '& .MuiTableSortLabel-icon': { color: '#2563eb !important' },
                }}
              >
                {col.label}
                {orderBy === col.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default SortableTableHead;
