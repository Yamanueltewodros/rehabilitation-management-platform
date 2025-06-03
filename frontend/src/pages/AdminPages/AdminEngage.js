import React, { useState, useEffect } from "react";
import { SnackbarProvider, useSnackbar, closeSnackbar } from 'notistack';
import { Button, Card, CardContent, CardMedia, Typography, Modal, Box, Grid } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import "../Styling/AdminPageStyles/AdminEngage.css";

const AdminEngagementForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [mediaType, setMediaType] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [engagements, setEngagements] = useState([]);
  const [selectedEngagement, setSelectedEngagement] = useState(null);
  const [view, setView] = useState("add");

  // Function to add engagement
  const handleAddEngagement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/engagement/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mediaType, url, description }),
      });
      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar("Component added successfully!", { variant: 'success' });
        setMediaType("");
        setUrl("");
        setDescription("");
        fetchEngagements(); // Refresh the engagement list
      } else {
        enqueueSnackbar(data.message || "Error adding engagement", { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Error adding engagement: " + error.message, { variant: 'error' });
    }
  };

  // Function to get all engagements
  const fetchEngagements = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/engagement/all");
      const data = await response.json();

      if (response.ok) {
        setEngagements(data);
      } else {
        enqueueSnackbar("Error fetching engagements", { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Error fetching engagements: " + error.message, { variant: 'error' });
    }
  };

  // Function to confirm deletion
  const confirmDeleteEngagement = (id) => {
    enqueueSnackbar(
      "Are you sure you want to delete this component?",
      {
        variant: 'warning',
        action: (key) => (
          <>
            <Button onClick={() => handleDeleteEngagement(id) && closeSnackbar(key)}>Yes</Button>
            <Button onClick={() => closeSnackbar(key)}>No</Button>
          </>
        ),
        persist: true,
      }
    );
  };

  // Function to delete engagement
  const handleDeleteEngagement = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/engagement/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        enqueueSnackbar("Component deleted successfully!", { variant: 'success' });
        setSelectedEngagement(null); // Close the details view
        closeModal(); // Close the modal
        fetchEngagements(); // Refresh the list
      } else {
        enqueueSnackbar(data.message || "Error deleting engagement", { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar("Error deleting engagement: " + error.message, { variant: 'error' });
    }
  };

  // Function to toggle view details and hide
  const handleViewDetails = (engagement) => {
    setSelectedEngagement(engagement);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedEngagement(null);
  };

  // Function to close the modal when clicking outside of it
  const handleClickOutside = (event) => {
    if (event.target.id === "engagementModal") {
      closeModal();
    }
  };

  // Fetch engagements when switching to view mode
  useEffect(() => {
    if (view === "view") {
      fetchEngagements();
    }
  }, [view]);

  // Function to get YouTube thumbnail
  const getYouTubeThumbnail = (url) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (videoIdMatch) {
      return videoIdMatch[1];
    }
    return null;
  };

  return (
    <div className="admin-engagement-container">

      {/* Toggle buttons between "View Engagements" and "Add Engagement" */}
      <div className="admin-engagement-button-group">
        <Button onClick={() => setView("add")} className={`admin-engagement-button ${view === "add" ? "active" : ""}`}>Add Engagement</Button>
        <Button onClick={() => setView("view")} className={`admin-engagement-button ${view === "view" ? "active" : ""}`}>View Engagements</Button>
      </div>

      {/* Show "Add Engagement" form when view is set to "add" */}
      {view === "add" && (
        <form onSubmit={handleAddEngagement} className="admin-engagement-form">
          <Typography variant="h4" className="form-title">Add Engagement</Typography>
          <div className="form-group">
            <label htmlFor="mediaType">Media Type:</label>
            <select
              id="mediaType"
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              required
              className="form-input"
            >
              <option value="" disabled>Select Media Type</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="pdf">PDF</option>
              <option value="audio">Audio</option>
              <option value="document">Document</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-textarea"
            />
          </div>

          <Button type="submit" variant="contained" color="success" className="form-submit-button">Add Engagement</Button>
        </form>
      )}

      {/* Show "View Engagements" when view is set to "view" */}
      {view === "view" && (
  <div className="engagement-list-container">
    <Typography variant="h4" className="engagement-list-title">
      Engagement Gallery
    </Typography>
    <div className="engagement-gallery">
      {engagements.map((engagement) => (
        <div 
          className="gallery-item"
          key={engagement._id}
          onClick={() => handleViewDetails(engagement)}
        >
          <div className="gallery-item-content">
            {engagement.mediaType === "video" ? (
              getYouTubeThumbnail(engagement.url) ? (
                <div className="media-wrapper video">
                  <CardMedia
                    component="img"
                    image={`https://img.youtube.com/vi/${getYouTubeThumbnail(engagement.url)}/0.jpg`}
                    alt="Video Thumbnail"
                    className="media-content"
                  />
                  <div className="play-overlay">
                    <PlayArrowIcon />
                  </div>
                </div>
              ) : (
                <div className="invalid-media">
                  <VideoLibraryIcon />
                  <Typography>Invalid video URL</Typography>
                </div>
              )
            ) : engagement.mediaType === "image" ? (
              <div className="media-wrapper image">
                <CardMedia
                  component="img"
                  image={engagement.url}
                  alt="Image"
                  className="media-content"
                />
              </div>
            ) : (
              <div className="media-wrapper document">
                <div className="document-icon">
                  {engagement.mediaType === "pdf" && <PictureAsPdfIcon />}
                  {engagement.mediaType === "audio" && <AudiotrackIcon />}
                  {engagement.mediaType === "document" && <DescriptionIcon />}
                  {engagement.mediaType === "other" && <InsertDriveFileIcon />}
                </div>
              </div>
            )}
          </div>
          <div className="gallery-item-description">
            <Typography variant="body1" className="item-description">
              {engagement.description}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      {/* Modal for engagement details */}
      <Modal
        open={Boolean(selectedEngagement)}
        onClose={closeModal}
        aria-labelledby="engagement-modal-title"
        aria-describedby="engagement-modal-description"
      >
        <Box className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          {selectedEngagement && (
            <>
              <Typography variant="h4" id="engagement-modal-title">Component Details</Typography>
              {selectedEngagement.mediaType === "video" && getYouTubeThumbnail(selectedEngagement.url) && (
                <CardMedia
                  component="img"
                  image={`https://img.youtube.com/vi/${getYouTubeThumbnail(selectedEngagement.url)}/0.jpg`}
                  alt="Video Thumbnail"
                  className="video-thumbnail"
                />
              )}
              {selectedEngagement.mediaType === "image" && (
                <CardMedia
                  component="img"
                  image={selectedEngagement.url}
                  alt="Image"
                  className="image-thumbnail"
                />
              )}
              <Typography variant="body1"><strong>Media Type:</strong> {selectedEngagement.mediaType}</Typography>
              <Typography variant="body1"><strong>URL:</strong> <a href={selectedEngagement.url} target="_blank" rel="noopener noreferrer">{selectedEngagement.url}</a></Typography>
              <Typography variant="body1"><strong>Description:</strong> {selectedEngagement.description}</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => confirmDeleteEngagement(selectedEngagement._id)}
                className="delete-btn"
              >
                Delete Engagement
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

const App = () => (
  <SnackbarProvider maxSnack={3}>
    <AdminEngagementForm />
  </SnackbarProvider>
);

export default App;
