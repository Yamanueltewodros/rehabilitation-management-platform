import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProfessionalStyles/showhistory.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Paper,
  Card,
  Modal,
  Box,
} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const PatientHistoryPage = ({ patientId, onGoBack }) => {
  const [patient, setPatient] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedHistory, setExpandedHistory] = useState(null); // To track which history is expanded
  const [modalOpen, setModalOpen] = useState(false); // To control modal visibility
  const [selectedHistory, setSelectedHistory] = useState(null); // To store selected history details

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/get-patients`);
        const foundPatient = response.data.find((p) => p._id === patientId); // Find the patient by ID
        setPatient(foundPatient);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError("Error fetching patient details.");
        console.error(error);
        setLoading(false); // Stop loading in case of error
      }
    };

    if (patientId) {
      fetchPatientDetails();
    }
  }, [patientId]);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/patient-history/get-patient-history/${patientId}`
        );
        if (response.data.patientHistory.length > 0) {
          setPatientHistory(response.data.patientHistory);
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
  }, [patientId]);

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
        <div class="header" style={{display: 'flex', alignItems: 'center'}}>
            <ArrowBackIcon className=".back-button" onClick={onGoBack}/>
            <h1 style={{flexGrow: 1, textAlign: 'center', margin: '0'}}>Patient History</h1>
        </div>
      {loading && <p>Loading history...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && patientHistory.length > 0 && (
  
        <div className="history-list">
          <Paper elevation={0}>
          {patientHistory.map((historyItem, index) => (
            <Card key={index} className="history-card" variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div" style={{color: "#184b9c", fontWeight:"bold"}}>
                  Date: {new Date(historyItem.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Details: {historyItem.historyData.slice(0, 50)}...
                </Typography>
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => toggleHistoryDetails(index)}
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
          <IconButton className="close-icon" onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{color: "#184b9c", fontWeight:"bold", fontSize:"20px"}}>
            Full Details
          </Typography>
          {selectedHistory && (
            <>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Date: {new Date(selectedHistory.createdAt).toLocaleDateString()}
              </Typography>
              <hr />
              <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{
                background:"#fff",
                padding:"10px",
                border: "1px solid #eee"
              }}>
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
