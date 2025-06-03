import React, { useState, useEffect } from "react";
import "./PatientPagesStyles/Engage.css";
import { CardMedia, Typography, Modal, Box, Button } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const Report = () => {
    const [engagements, setEngagements] = useState([]);
    const [filteredEngagements, setFilteredEngagements] = useState([]);
    const [selectedType, setSelectedType] = useState("all");
    const [selectedEngagement, setSelectedEngagement] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/engagement/all")
            .then(response => response.json())
            .then(data => {
                setEngagements(data);
                setFilteredEngagements(data);
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        if (selectedType === "all") {
            setFilteredEngagements(engagements);
        } else {
            setFilteredEngagements(engagements.filter(item => item.mediaType === selectedType));
        }
    }, [selectedType, engagements]);

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    const groupByCategory = (engagements) => {
        return engagements.reduce((acc, item) => {
            if (!acc[item.mediaType]) {
                acc[item.mediaType] = [];
            }
            acc[item.mediaType].push(item);
            return acc;
        }, {});
    };

    const getYouTubeThumbnail = (url) => {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (videoIdMatch) {
            return videoIdMatch[1];
        }
        return null;
    };

    const handleViewDetails = (engagement) => {
        setSelectedEngagement(engagement);
    };

    const closeModal = () => {
        setSelectedEngagement(null);
    };

    const openUrlInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="report-container">
            <h1 className="report-title">Engagement Components</h1>
            <div className="button-group">
                <button className="filter-button" onClick={() => handleTypeChange("all")}>All</button>
                <button className="filter-button" onClick={() => handleTypeChange("image")}>Image</button>
                <button className="filter-button" onClick={() => handleTypeChange("video")}>Video</button>
                <button className="filter-button" onClick={() => handleTypeChange("pdf")}>PDF</button>
                <button className="filter-button" onClick={() => handleTypeChange("document")}>Document</button>
                <button className="filter-button" onClick={() => handleTypeChange("audio")}>Audio</button>
                <button className="filter-button" onClick={() => handleTypeChange("other")}>Other</button>
            </div>
            <hr />
            {selectedType === "all" ? (
                Object.entries(groupByCategory(filteredEngagements)).map(([type, items]) => (
                    <div key={type} className="category-group">
                        <h2 className="category-title">{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                        <ul className="engagement-list">
                            {items.map(item => (
                                <li className="engagement-item" key={item._id} onClick={() => handleViewDetails(item)}>
                                    {item.mediaType === 'video' ? (
                                        getYouTubeThumbnail(item.url) ? (
                                            <div className="media-wrapper video">
                                                <CardMedia
                                                    component="img"
                                                    image={`https://img.youtube.com/vi/${getYouTubeThumbnail(item.url)}/0.jpg`}
                                                    alt="Video Thumbnail"
                                                    className="engagement-image"
                                                />
                                                <div className="play-overlay">
                                                    <VideoLibraryIcon />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="invalid-media">
                                                <VideoLibraryIcon />
                                                <Typography>Invalid video URL</Typography>
                                            </div>
                                        )
                                    ) : item.mediaType === 'image' ? (
                                        <div className="media-wrapper image">
                                            <CardMedia
                                                component="img"
                                                image={item.url}
                                                alt="Image"
                                                className="engagement-image"
                                            />
                                        </div>
                                    ) : (
                                        <div className="media-wrapper document">
                                            <div className="document-icon">
                                                {item.mediaType === "pdf" && <PictureAsPdfIcon />}
                                                {item.mediaType === "audio" && <AudiotrackIcon />}
                                                {item.mediaType === "document" && <DescriptionIcon />}
                                                {item.mediaType === "other" && <InsertDriveFileIcon />}
                                            </div>
                                            {item.mediaType === "pdf" && (
                                                <div className="engagement-description">
                                                    <Typography variant="body1" className="item-description">
                                                        {item.description}
                                                    </Typography>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {item.mediaType !== "pdf" && (
                                        <div className="engagement-description">
                                            <Typography variant="body1" className="item-description">
                                                {item.description}
                                            </Typography>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <ul className="engagement-list">
                    {filteredEngagements.map(item => (
                        <li className="engagement-item" key={item._id} onClick={() => handleViewDetails(item)}>
                            {item.mediaType === 'video' ? (
                                getYouTubeThumbnail(item.url) ? (
                                    <div className="media-wrapper video">
                                        <CardMedia
                                            component="img"
                                            image={`https://img.youtube.com/vi/${getYouTubeThumbnail(item.url)}/0.jpg`}
                                            alt="Video Thumbnail"
                                            className="engagement-image"
                                        />
                                        <div className="play-overlay">
                                            <VideoLibraryIcon />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="invalid-media">
                                        <VideoLibraryIcon />
                                        <Typography>Invalid video URL</Typography>
                                    </div>
                                )
                            ) : item.mediaType === 'image' ? (
                                <div className="media-wrapper image">
                                    <CardMedia
                                        component="img"
                                        image={item.url}
                                        alt="Image"
                                        className="engagement-image"
                                    />
                                </div>
                            ) : (
                                <div className="media-wrapper document">
                                    <div className="document-icon">
                                        {item.mediaType === "pdf" && <PictureAsPdfIcon />}
                                        {item.mediaType === "audio" && <AudiotrackIcon />}
                                        {item.mediaType === "document" && <DescriptionIcon />}
                                        {item.mediaType === "other" && <InsertDriveFileIcon />}
                                    </div>
                                    {item.mediaType === "pdf" && (
                                        <div className="engagement-description">
                                            <Typography variant="body1" className="item-description">
                                                {item.description}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                            )}
                            {item.mediaType !== "pdf" && (
                                <div className="engagement-description">
                                    <Typography variant="body1" className="item-description">
                                        {item.description}
                                    </Typography>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <Modal
                open={Boolean(selectedEngagement)}
                onClose={closeModal}
                aria-labelledby="engagement-modal-title"
                aria-describedby="engagement-modal-description"
            >
                <Box className="modal-content">
                    <div className="modal-header">
                        <Typography variant="h4" id="engagement-modal-title">Component Details</Typography>
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>
                    {selectedEngagement && (
                        <div className="modal-body">
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
                            <Typography variant="body1">
                                <strong>URL:</strong> <Button onClick={() => openUrlInNewTab(selectedEngagement.url)}>Click to open</Button>
                            </Typography>
                            <Typography variant="body1"><strong>Description:</strong> {selectedEngagement.description}</Typography>
                        </div>
                    )}
                    <div className="modal-footer">
                        <Button onClick={closeModal}>Close</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default Report;
