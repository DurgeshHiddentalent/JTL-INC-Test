'use client';

import {
  Box, TextField, Button, InputAdornment, CircularProgress,
  LinearProgress,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import EventTable from '@/components/EventTable';
import { getEvents } from '@/lib/api';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 5;

  const fetchEvents = async () => {
  setLoading(true);
  try {
    const res = await getEvents({
      search,
      sortBy: sortField,
      sortOrder,
      page: page + 1,
      limit: rowsPerPage,
    });
    setEvents(res.data?.data || []);
    setTotal(res.data?.data?.length || 0);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
  }, [search, sortField, sortOrder, page]);

  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === 'asc';
    setSortField(field);
    setSortOrder(isAsc ? 'desc' : 'asc');
  };

  return (
    <Box py={4} px={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          placeholder="Search Events"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{backgroundColor:"#fff"}}
        />
        <Button href="/form" variant="contained" color="primary">
          Create Event
        </Button>
      </Box>
{loading && <LinearProgress />}
      {events?.length > 0 ? (
        <EventTable
          events={events}
          sortField={sortField}
          sortOrder={sortOrder}
          handleSort={handleSort}
          total={total}
          page={page}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
        />
      )
    :  <Box display="flex" justifyContent="center">
      <Typography color='text' variant="h5" mb={2}>No events found!</Typography>
      </Box>
    }
    </Box>
  );
}
