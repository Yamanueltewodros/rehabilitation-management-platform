import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

import "../ProfessionalStyles/AddProgress.css";

const PatientProgressForm = ({ patientId, onSubmitSuccess, onGoBack }) => {
    const [formData, setFormData] = useState({
        height: "",
        weight: "",
        bmi: "",
        bloodPressure: "",
        heartRate: "",
        respiratoryRate: "",
        spo2: "",
        bloodglucose: "",
        CBC: "",
        frequencyOfUse: "",
        quantityOfUse: "",
        numberOfCravings: "",
        asiScore: "",
        asiCategory: "",
        ALT: "",
        AST: "",
        ALP: "",
        serumCreatinine: "",
        urinalysis: "",
    });

    const [currentStep, setCurrentStep] = useState(1); // Track the current step of the form
    const [error, setError] = useState(null);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/progress/add-progress", // Adjust API endpoint as needed
                {
                    ...formData,
                    patient: patientId, // Pass the patientId along with form data
                }
            );
            alert("Progress report submitted successfully!");
            if (onSubmitSuccess) onSubmitSuccess(); // Call the function if provided
            setFormData({
                height: "",
                weight: "",
                bmi: "",
                bloodPressure: "",
                heartRate: "",
                respiratoryRate: "",
                spo2: "",
                bloodglucose: "",
                CBC: "",
                frequencyOfUse: "",
                quantityOfUse: "",
                numberOfCravings: "",
                asiScore: "",
                asiCategory: "",
                ALT: "",
                AST: "",
                ALP: "",
                serumCreatinine: "",
                urinalysis: "",
            });
            setCurrentStep(1); // Reset to step 1 after submission
        } catch (error) {
            console.error("Error submitting progress report:", error);
            setError("Error submitting progress report.");
        }
    };

    // Render the first step of the form
    const renderStep1 = () => (
        <>
            <div className="form-step-1">
                <div className="container">
                    <TextField
                        label="Height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        sx={{ paddingRight: "5px" }}
                    />

                    <TextField
                        sx={{ height: "50px" }}
                        label="Weight (kg)"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>

                <div className="container">
                    <TextField
                        label="Blood Pressure (mmHg)"
                        name="bloodPressure"
                        value={formData.bloodPressure}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>

                <div className="container">
                    <TextField
                        label="Heart Rate (bpm)"
                        name="heartRate"
                        type="number"
                        value={formData.heartRate}
                        onChange={handleInputChange}
                        required
                        fullWidth
                        sx={{ paddingRight: "5px" }}
                    />

                    <TextField
                        label="Respiratory Rate (breaths/min)"
                        name="respiratoryRate"
                        type="number"
                        value={formData.respiratoryRate}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                </div>

                <div className="container">
                    <TextField
                        label="SpO2 (%)"
                        name="spo2"
                        type="number"
                        value={formData.spo2}
                        onChange={handleInputChange}
                        requireddi
                        fullWidth
                        sx={{ paddingRight: "5px" }}
                    />
                </div>

                <div className="form-controller-step-1">
                    <button onClick={() => setCurrentStep(2)} className="next-button">
                        Next
                    </button>
                </div>
            </div>
        </>
    );

    // Render the second step of the form
    const renderStep2 = () => (
        <div className="form-step-2">
            <div className="container">
                <TextField
                    label="Blood Glucose (mg/dL)"
                    name="bloodglucose"
                    type="number"
                    value={formData.bloodglucose}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    sx={{ paddingRight: "5px" }}
                />

                <TextField
                    label="CBC (Complete Blood Count)"
                    name="CBC"
                    type="number"
                    value={formData.CBC}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
            </div>

            <div className="container">
                <TextField
                    label="Frequency of Use (times/week)"
                    name="frequencyOfUse"
                    type="number"
                    value={formData.frequencyOfUse}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    sx={{ paddingRight: "5px" }}
                />

                <TextField
                    label="Quantity of Use (grams)"
                    name="quantityOfUse"
                    type="number"
                    value={formData.quantityOfUse}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
            </div>

            <div className="container">
                <TextField
                    label="Number of Cravings (per week)"
                    name="numberOfCravings"
                    type="number"
                    value={formData.numberOfCravings}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    sx={{ paddingRight: "5px" }}
                />

                <TextField
                    label="ASI Score"
                    name="asiScore"
                    type="number"
                    value={formData.asiScore}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
            </div>

            <div className="container">
                <TextField
                    label="ALT (U/L)"
                    name="ALT"
                    type="number"
                    value={formData.ALT}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
            </div>

            <div className="container">
                <TextField
                    label="AST (U/L)"
                    name="AST"
                    type="number"
                    value={formData.AST}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    sx={{ paddingRight: "5px" }}
                />

                <TextField
                    label="ALP (U/L)"
                    name="ALP"
                    type="number"
                    value={formData.ALP}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
            </div>

            <div className="container">
                <TextField
                    label="Serum Creatinine (mg/dL)"
                    name="serumCreatinine"
                    type="number"
                    value={formData.serumCreatinine}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    sx={{ paddingRight: "5px" }}
                />

                <TextField
                    label="Urinalysis Results"
                    name="urinalysis"
                    type="number"
                    value={formData.urinalysis}
                    onChange={handleInputChange}
                    required
                    fullWidth
                />
            </div>

            <div className="form-controller ">
                <button
                    type="submit"
                    className="back-button"
                    onClick={() => setCurrentStep(1)}
                >
                    Back
                </button>
                <button type="submit" className="submit-button">
                    Submit Report
                </button>
            </div>
        </div>
    );

    return (
        <>
            <h2 className="title">Add Patient's Progress Report</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                {currentStep === 1 ? renderStep1() : renderStep2()}
            </form>
        </>
    );
};

export default PatientProgressForm;
