import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PatientPagesStyles/PatientMedicalHistory.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import {
    Paper,
    Card,
    Modal,
    Box,
    Button,
    Typography,
    IconButton,
    CardContent, // Add this import
} from "@mui/material";

const PatientHistoryPage = ({ onGoBack }) => {
    const [patientHistory, setPatientHistory] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false); // To control modal visibility
    const [selectedHistory, setSelectedHistory] = useState(null); // To store selected history details

    // Function to get the logged-in user from localStorage
    const getCurrentUser = () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            return user; // This contains the logged-in user object (including _id)
        } catch (err) {
            console.error("Error getting user from localStorage", err);
            return null;
        }
    };

    useEffect(() => {
        const fetchPatientHistory = async () => {
            const user = getCurrentUser();
            if (!user || !user._id) {
                setError("User not found. Please log in again.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    `http://localhost:5000/api/patient-history/get-patient-history/${user._id}` // Fetch history for the patient
                );
                if (response.data.patientHistory.length > 0) {
                    setPatientHistory(response.data.patientHistory); // Store the history data
                } else {
                    setError("No history available for this patient.");
                }
            } catch (error) {
                setError("Failed to fetch patient history.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatientHistory();
    }, []);

    const toggleHistoryDetails = (index) => {
        setSelectedHistory(patientHistory[index]);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedHistory(null);
    };

    return (
        <div className="patient-history-page">
            <div
                className="header"
                style={{ display: "flex", alignItems: "center" }}
            >
                <h1
                    style={{
                        flexGrow: 1,
                        textAlign: "center",
                        color: "#184b9c",
                        margin: "0",
                        fontWeight: "bold",
                    }}
                >
                    Medical History
                </h1>
            </div>
            {loading && <p>Loading history...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && patientHistory.length > 0 && (
                <div className="history-list">
                    <Paper elevation={0}>
                        {patientHistory.map((historyItem, index) => (
                            <Card
                                key={index}
                                className="history-card"
                                variant="outlined"
                                sx={{ marginBottom: 2 }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        style={{
                                            color: "#184b9c",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        Date:{" "}
                                        {new Date(
                                            historyItem.createdAt
                                        ).toLocaleDateString()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Details:{" "}
                                        {historyItem.historyData.slice(0, 50)}
                                        ...
                                    </Typography>
                                    <div className="button-container">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() =>
                                                toggleHistoryDetails(index)
                                            }
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </Paper>
                </div>
            )}

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-box">
                    <IconButton
                        className="close-icon"
                        onClick={handleCloseModal}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{
                            color: "#184b9c",
                            fontWeight: "bold",
                            fontSize: "20px",
                        }}
                    >
                        Full Details
                    </Typography>
                    {selectedHistory && (
                        <>
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                Date:{" "}
                                <strong>
                                    {new Date(
                                        selectedHistory.createdAt
                                    ).toLocaleDateString()}
                                </strong>
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                Added by:{" "}
                                <strong>
                                    {selectedHistory.professionalName}
                                </strong>
                            </Typography>
                            <hr />
                            <Typography
                                id="modal-modal-description"
                                sx={{ mt: 2 }}
                                style={{
                                    background: "#fff",
                                    padding: "10px",
                                    border: "1px solid #eee",
                                }}
                            >
                                {selectedHistory.historyData}
                            </Typography>
                            <hr />
                        </>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

export default PatientHistoryPage;
