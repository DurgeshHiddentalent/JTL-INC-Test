'use client';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent, getEventById, getOrganizers, getVenues, updateEvent } from '@/lib/api';
import { formatDate } from '@/utils/formats';

export default function EventForm({ mode = 'create', eventId = null }) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    venue_id: '',
    organizer_id: '',
  });

  const [venues, setVenues] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  // Fetch dropdown data
  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [venuesRes, organizersRes] = await Promise.all([
          getVenues(),
          getOrganizers(),
        ]);

        setVenues(venuesRes.data?.data || []);
        setOrganizers(organizersRes.data?.data || []);
      } catch (err) {
        setSnackbar({ open: true, message: 'Failed to load dropdowns', severity: 'error' });
      }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (mode === 'edit' && eventId) {
      const fetchEvent = async () => {
        try {
          const res = await getEventById(eventId);
          const data = res?.data?.data;
          setForm({
            title: data.title,
            description: data.description,
            date: data.date ? formatDate(data.date) : null,
            venue_id: data.venue_id,
            organizer_id: data.organizer_id,
          });
        } catch (err) {
          console.error(err);
        }
      };
      fetchEvent();
    }
  }, [mode, eventId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'edit') {
        await updateEvent(eventId, form);
        setSnackbar({ open: true, message: 'Event updated!', severity: 'success' });
      } else {
        await createEvent(form);
        setSnackbar({ open: true, message: 'Event created!', severity: 'success' });
      }
      setTimeout(() => router.push('/'), 1500);
    } catch (err) {
      setSnackbar({ open: true, message: err.message, severity: 'error' });
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h5" mb={2}>
          {mode === 'edit' ? 'Edit Event' : 'Create New Event'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={form.title || ''}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
            required
          />

          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date"
            value={form?.date}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          <TextField
            fullWidth
            select
            label="Venue"
            name="venue_id"
            value={form?.venue_id || ''}
            onChange={handleChange}
            margin="normal"
            required
          >
            {venues?.map((venue) => (
              <MenuItem key={venue?.id} value={venue?.id}>
                {venue?.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Organizer"
            name="organizer_id"
            value={form?.organizer_id || ''}
            onChange={handleChange}
            margin="normal"
            required
          >
            {organizers?.map((org) => (
              <MenuItem key={org?.id} value={org?.id}>
                {org?.name}
              </MenuItem>
            ))}
          </TextField>

          <Box mt={3} display="flex" justifyContent="end" gap={2}>
            <Button type="submit" variant="contained" color='success'>
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
             <Button type="button" variant="contained" color='error' onClick={()=>router.push('/')}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}
