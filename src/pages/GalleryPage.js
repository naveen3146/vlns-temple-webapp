import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { getToken } from "../components/loginService";

export default function GalleryPage() {
  const [view, setView] = useState("gallery");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [uploadMsg, setUploadMsg] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [eventBanner, setEventBanner] = useState(null); // New state for event banner

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8085/temple/photos");
      // Expecting response: [{ url, fileName, ... }]
      setImages(response.data);
    } catch (err) {
      setUploadMsg("Failed to load images.");
    }
  };

  // Fetch videos from backend
  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8085/video");
      // Expecting response: [{ id, title, description, s3Url, fileName }]
      setVideos(response.data);
    } catch (err) {
      setUploadMsg("Failed to load videos.");
    }
  };

  // Fetch event banner (new function)
  const fetchEventBanner = async () => {
    try {
      const response = await axios.get("http://localhost:8085/event/banner");
      // Expecting response: { url, title, description }
      setEventBanner(response.data);
    } catch (err) {
      console.error("Failed to load event banner.");
    }
  };

  useEffect(() => {
    fetchImages();
    fetchVideos();
    fetchEventBanner(); // Fetch event banner on mount
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Upload handler for images
  const handleUpload = async (e) => {
    e.preventDefault();
    setUploadMsg("");
    if (!files.length) {
      setUploadMsg("Please select at least one file.");
      return;
    }
    if (files.length > 10) {
      setUploadMsg("You can upload a maximum of 10 files at a time.");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      await axios.post("http://localhost:8085/temple/photos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${getToken()}`,
        },
      });
      setUploadMsg("Upload successful!");
      setFiles([]);
      fetchImages(); // Refresh gallery after upload
    } catch (err) {
      setUploadMsg("Upload failed.");
    }
  };

  // Delete handler for images
  const handleDeleteImage = async (fileName) => {
    try {
      await axios.delete(`http://localhost:8085/temple/photos/${fileName}`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
      });
      fetchImages();
    } catch (err) {
      setUploadMsg("Delete failed.");
    }
  };

  // Delete handler for videos
  const handleDeleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/video/${id}`, {
        headers: { "Authorization": `Bearer ${getToken()}` }
      });
      fetchVideos();
    } catch (err) {
      setUploadMsg("Delete failed.");
    }
  };

  const isLoggedIn = !!getToken();

  // Modal close handler
  const handleCloseModal = () => setSelectedVideo(null);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Gallery</h2>

      {/* Event Banner Section (newly added) */}
      {eventBanner && (
        <div className="mb-8">
          <img
            src={eventBanner.url}
            alt={eventBanner.title}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            style={{ border: "4px solid #e2e8f0" }} // Optional: add a border for vibrancy
          />
          <div className="mt-4 text-center">
            <h3 className="text-2xl font-bold text-red-700">{eventBanner.title}</h3>
            <p className="text-lg text-gray-700">{eventBanner.description}</p>
          </div>
        </div>
      )}

      {isLoggedIn && view === "gallery" && (
        <form onSubmit={handleUpload} className="mb-6 flex flex-col md:flex-row items-center gap-2">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={e => setFiles(Array.from(e.target.files))}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
            Upload Photos
          </button>
        </form>
      )}
      {uploadMsg && <div className="mb-4 text-blue-700">{uploadMsg}</div>}

      <div
        className="relative inline-block mb-6"
        ref={dropdownRef}
      >
        <button
          className="p-2 border rounded bg-gray-100 min-w-[120px] text-left"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {view === "gallery" ? "Images" : "Videos"}
          <span className="ml-2">&#9662;</span>
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 mt-1 w-full bg-white border rounded shadow z-10">
            <div
              className={`p-2 cursor-pointer hover:bg-gray-200 ${view === "gallery" ? "font-bold" : ""}`}
              onClick={() => { setView("gallery"); setDropdownOpen(false); }}
            >
              Images
            </div>
            <div
              className={`p-2 cursor-pointer hover:bg-gray-200 ${view === "videos" ? "font-bold" : ""}`}
              onClick={() => { setView("videos"); setDropdownOpen(false); }}
            >
              Videos
            </div>
          </div>
        )}
      </div>

      {view === "gallery" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative cursor-pointer group"
              onClick={() => setSelectedImage(img)}
            >
              <div className="aspect-w-1 aspect-h-1">
                <img
                  src={img.url}
                  alt={img.fileName}
                  className="object-cover rounded group-hover:shadow-lg w-full h-40"
                />
              </div>
              {isLoggedIn && (
                <button
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
                  onClick={e => {
                    e.stopPropagation();
                    handleDeleteImage(img.fileName);
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {view === "videos" && (
        <>
          {isLoggedIn && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!files.length) {
                  setUploadMsg("Please select a video file.");
                  return;
                }
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("title", e.target.title.value);
                formData.append("description", e.target.description.value);
                try {
                  await axios.post("http://localhost:8085/video", formData, {
                    headers: {
                      "Content-Type": "multipart/form-data",
                      "Authorization": `Bearer ${getToken()}`,
                    },
                  });
                  setUploadMsg("Video upload successful!");
                  setFiles([]);
                  fetchVideos(); // Refresh videos after upload
                } catch (err) {
                  setUploadMsg("Video upload failed.");
                }
              }}
              className="mb-6 flex flex-col md:flex-row items-center gap-2"
            >
              <input
                type="file"
                accept="video/*"
                onChange={e => setFiles(Array.from(e.target.files))}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Video Title"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Video Description"
                className="border p-2 rounded"
                required
              />
              <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
                Upload Video
              </button>
            </form>
          )}
          {uploadMsg && <div className="mb-4 text-blue-700">{uploadMsg}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((video, idx) => (
              <div
                key={video.id || idx}
                className="relative cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <video
                  src={video.s3Url}
                  className="w-full h-40 object-cover rounded group-hover:shadow-lg"
                  style={{ pointerEvents: "none" }} // Prevent play in tile
                />
                <div className="mt-2 font-bold truncate">{video.title}</div>
                <div className="text-sm text-gray-600 truncate">{video.description}</div>
                {isLoggedIn && (
                  <button
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteVideo(video.id);
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-4 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold text-gray-700"
              onClick={handleCloseModal}
            >
              ×
            </button>
            <video
              controls
              src={selectedVideo.s3Url}
              className="w-full h-96 rounded mb-2"
              autoPlay
            />
            <div className="font-bold text-lg">{selectedVideo.title}</div>
            <div className="text-gray-600">{selectedVideo.description}</div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-transparent p-0 max-w-2xl w-full relative flex flex-col items-center">
            <button
              className="absolute top-2 right-2 text-2xl font-bold text-gray-700 bg-white bg-opacity-80 rounded-full px-3 py-1 shadow z-10"
              style={{ zIndex: 10 }}
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.fileName}
              className="w-full max-h-[80vh] object-contain"
              style={{ marginTop: "0.5rem" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}