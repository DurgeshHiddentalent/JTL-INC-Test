'use client';

import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TableSortLabel, Paper, TablePagination,
  IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/formats';

export default function EventTable({
  events,
  sortField,
  sortOrder,
  handleSort,
  total,
  page,
  onPageChange,
  rowsPerPage = 5
}) {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['title', 'date', 'venue', 'organizer'].map((col) => (
              <TableCell key={col}>
                <TableSortLabel
                  active={sortField === col}
                  direction={sortField === col ? sortOrder : 'asc'}
                  onClick={() => handleSort(col)}
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event?.title}</TableCell>
              <TableCell>{event?.date ? formatDate(event?.date) : '-'}</TableCell>
              <TableCell>{event?.venue}</TableCell>
              <TableCell>{event?.organizer}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit">
                  <IconButton onClick={() => router.push(`/form/${event.id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(e, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[]}
      />
    </TableContainer>
  );
}
