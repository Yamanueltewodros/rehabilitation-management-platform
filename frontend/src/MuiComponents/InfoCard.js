import React from "react";
import "./InfoCardStyling.css";
const InfoCard = ({ conditions, title, total }) => {
    return (
        <div className="info-card">
            <p className="title-text">{title}</p>
            <p className="total">{total}</p>
            <p className="description">{conditions}</p>
        </div>
    );
};

export default InfoCard;
