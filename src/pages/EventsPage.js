import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "../components/loginService";

const EventCard = ({ event, onEdit, onDelete, isAdmin }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const validImageUrl =
    event.imageUrl &&
    event.imageUrl !== "null" &&
    event.imageUrl.trim() !== "";

  return (
    <div className="border rounded shadow p-0 mb-4 bg-white flex flex-col">
      {/* Event Info FIRST */}
      <div className="w-full bg-[#fffaf0] rounded-t p-4 flex flex-col items-center">
        <div className="text-lg text-[#C21807] font-bold mb-1">🛕 {event.title}</div>
        <div className="text-sm text-[#7B3F00] mb-1">
          📅 తేదీ: {new Date(event.date).toLocaleDateString('te-IN', { year: 'numeric', month: 'long', day: 'numeric' })}, {new Date(event.date).toLocaleTimeString('te-IN', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-sm text-[#4B3621] mb-1">📍 వేదిక: {event.templeName}</div>
        <div className="text-sm text-[#4B3621] mb-1">🪔 కార్యక్రమం: {event.description}</div>
        <div className="text-sm text-[#4B3621] mb-1">స్థలం: {event.location}</div>
        <div className="text-sm text-[#4B3621] mb-1">📞 సంప్రదించండి: {event.contact}</div>
        {isAdmin && (
          <div className="flex gap-2 mt-2">
            <button onClick={() => onEdit(event)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
            <button
              onClick={() => {
                if (typeof event.eventId === "number" && !isNaN(event.eventId)) {
                  onDelete(event.eventId);
                } else {
                  alert("Invalid event id!");
                }
              }}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {/* IMAGE BELOW INFO */}
      {validImageUrl && (
        <div
          className="cursor-pointer"
          onClick={() => setShowImageModal(true)}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover rounded-b-lg shadow-lg transition-transform duration-200 hover:scale-105"
            style={{ borderTop: "4px solid #e2e8f0" }}
          />
        </div>
      )}
      {/* Modal for large image */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-transparent p-0 max-w-2xl w-full relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-700 bg-white bg-opacity-80 rounded-full px-3 py-1 shadow z-10"
              style={{ zIndex: 10 }}
              onClick={() => setShowImageModal(false)}
            >
              ×
            </button>
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full max-h-[80vh] object-contain"
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to check admin role from JWT
function isAdmin() {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.roles && payload.roles.includes("ROLE_ADMIN");
  } catch {
    return false;
  }
}

export default function EventsPage({ eventBanner }) {
  const [formData, setFormData] = useState({
    templeName: '',
    title: '',
    description: '',
    date: '',
    location: '',
    contact: '',
    image: null
  });

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showBannerModal, setShowBannerModal] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8085/events");
      setEvents(response.data);
    } catch (err) {
      // handle error
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      templeName: event.templeName,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      contact: event.contact,
      image: null // You may want to handle image update separately
    });
  };

  const handleDelete = async (id) => {
    if (typeof id !== "number" || isNaN(id)) {
      alert("Invalid event id!");
      return;
    }
    if (window.confirm("Are you sure you want to delete this event?")) {
      await axios.delete(`http://localhost:8085/events/${id}`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
      });
      fetchEvents();
    }
  };

  // Update handleSubmit for editing
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if date is selected and valid
    if (!formData.date || formData.date.trim() === "") {
      alert("దయచేసి తేదీ మరియు సమయాన్ని ఎంచుకోండి.\nPlease select both date and time.");
      return;
    }

    // Optionally, check if the date string is a valid date
    if (isNaN(new Date(formData.date).getTime())) {
      alert("తేదీ మరియు సమయం సరైనవి కావాలి.\nPlease select a valid date and time.");
      return;
    }

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    try {
      if (editingEvent) {
        await axios.put(`http://localhost:8085/events/${editingEvent.eventId}`, form, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getToken()}`,
          },
        });
        setEditingEvent(null);
      } else {
        await axios.post("http://localhost:8085/events", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${getToken()}`,
          },
        });
      }
      alert("Event saved!");
      setFormData({
        templeName: '',
        title: '',
        description: '',
        date: '',
        location: '',
        contact: '',
        image: null
      });
      fetchEvents();
    } catch (err) {
      alert("Failed to save event.");
    }
  };

  return (
    <>
      {/* Event Info Form (Admin only) */}
      {isAdmin() && (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow max-w-xl mx-auto">
          <input
            name="templeName"
            placeholder="Temple Name"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="title"
            placeholder="Event Title"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="description"
            placeholder="Event Description"
            rows="4"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="datetime-local"
            name="date"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="contact"
            placeholder="Contact Info"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingEvent ? "Update Event" : "Submit Event"}
          </button>
        </form>
      )}

      {/* Event Info Section */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-red-700">{eventBanner?.title}</h2>
        <p className="text-lg text-gray-700">{eventBanner?.description}</p>
        {eventBanner?.photoTitle && (
          <div className="mt-2 text-md font-semibold text-gray-800">
            {eventBanner.photoTitle}
          </div>
        )}
      </div>

      {/* Banner Section BELOW event info */}
      {eventBanner && (
        <div className="mb-8 flex justify-center">
          <div
            className="cursor-pointer w-full max-w-3xl"
            onClick={() => setShowBannerModal(true)}
          >
            <img
              src={eventBanner.url}
              alt={eventBanner.title}
              className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
              style={{ border: "4px solid #e2e8f0" }}
            />
          </div>
        </div>
      )}

      {/* Banner Modal */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-transparent p-0 max-w-2xl w-full relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-700 bg-white bg-opacity-80 rounded-full px-3 py-1 shadow z-10"
              style={{ zIndex: 10 }}
              onClick={() => setShowBannerModal(false)}
            >
              ×
            </button>
            <img
              src={eventBanner.url}
              alt={eventBanner.title}
              className="w-full max-h-[80vh] object-contain"
              style={{ marginTop: "0.5rem" }}
            />
            <div className="mt-4 text-center">
              <h3 className="text-2xl font-bold text-red-700">{eventBanner.title}</h3>
              <p className="text-lg text-gray-700">{eventBanner.description}</p>
              {eventBanner.photoTitle && (
                <div className="mt-2 text-md font-semibold text-gray-800">
                  {eventBanner.photoTitle}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Events List */}
      {events.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event, idx) => (
              <EventCard
                key={idx}
                event={event}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin()}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}