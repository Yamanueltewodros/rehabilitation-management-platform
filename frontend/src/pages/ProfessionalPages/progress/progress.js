import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProgress from "./AddProgress";
import ViewProgress from "./viewprogress";
import Visualize from "./Visualize";

import "../ProfessionalStyles/progress.css";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Progress = ({ patientId, onGoBack }) => {
    const [activeSection, setActiveSection] = useState("viewProgress");
    const navigate = useNavigate();

    const handleAddProgress = () => {
        setActiveSection("add");
    };

    const handleViewProgress = () => {
        setActiveSection("viewProgress");
    };

    const handleVisualizeProgress = () => {
        setActiveSection("visualize");
    };

    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page in the browser history
    };

    return (
        <div>
            <div className="navContainer">
                <ArrowBackIcon className=".back-button back-to-details" onClick={onGoBack} />
                <button onClick={handleAddProgress} className={activeSection==="add"? 'active': 'inactive'}>Add Progress</button>

                <button onClick={handleViewProgress} className={activeSection==="viewProgress"? 'active': 'inactive'}>View Progress</button>

                <button onClick={handleVisualizeProgress} className={activeSection==="visualize"? 'active': 'inactive'}>Visualize</button>
            </div>
            <div>
                {activeSection === "add" && (
                    <AddProgress patientId={patientId} />
                )}
                {activeSection === "viewProgress" && (
                    <ViewProgress patientId={patientId} />
                )}
                {activeSection === "visualize" && (
                    <Visualize patientId={patientId} />
                )}
            </div>
        </div>
    );
};

export default Progress;
