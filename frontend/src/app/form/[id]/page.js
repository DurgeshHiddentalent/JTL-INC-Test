import EventForm from '@/components/EventForm';

export default function EditEventPage({ params }) {
  return <EventForm mode="edit" eventId={params?.id} />;
}
