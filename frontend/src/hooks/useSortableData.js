import { useState, useMemo } from 'react';

/**
 * useSortableData — client-side sort hook.
 *
 * @param {Array} data - the array to sort
 * @param {string} defaultOrderBy - initial column id to sort by
 * @param {string} defaultOrder - 'asc' | 'desc'
 *
 * Returns: { sortedData, order, orderBy, handleRequestSort }
 */

// Detect ISO date strings like "2024-01-15" or "2024-01-15T10:30:00Z"
function isDateString(val) {
  if (typeof val !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}/.test(val);
}

function descendingComparator(a, b, orderBy) {
  const aVal = a[orderBy] ?? '';
  const bVal = b[orderBy] ?? '';

  // Date comparison — parse into timestamps
  if (isDateString(aVal) && isDateString(bVal)) {
    const aTime = new Date(aVal).getTime();
    const bTime = new Date(bVal).getTime();
    if (bTime < aTime) return -1;
    if (bTime > aTime) return 1;
    return 0;
  }

  // Pure numeric comparison (only when BOTH values are purely numeric, e.g. quantity)
  const aStr = String(aVal).trim();
  const bStr = String(bVal).trim();
  const isPureNumber = (s) => s !== '' && !isNaN(Number(s));
  if (isPureNumber(aStr) && isPureNumber(bStr)) {
    const diff = Number(bStr) - Number(aStr);
    return diff !== 0 ? diff : 0;
  }

  // Fall back to case-insensitive string comparison
  const aLower = aStr.toLowerCase();
  const bLower = bStr.toLowerCase();
  if (bLower < aLower) return -1;
  if (bLower > aLower) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const useSortableData = (data, defaultOrderBy = '', defaultOrder = 'asc') => {
  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    if (!orderBy || !data) return data;
    return [...data].sort(getComparator(order, orderBy));
  }, [data, order, orderBy]);

  return { sortedData, order, orderBy, handleRequestSort };
};

export default useSortableData;
