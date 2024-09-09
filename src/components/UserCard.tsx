import React, { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import ConfirmationDialog from "./ConfimationDialog";
import { ageCalculate } from "../utils/ageCalculate";

interface UserCardProps {
  celeb: User;
  isActive: boolean;
  onToggle: () => void;
  onDelete: (id: number) => void;
}

interface User {
  id: number;
  first: string;
  last: string;
  age: number;
  dob: string;
  gender: string;
  country: string;
  description: string;
}

const UserCard: React.FC<UserCardProps> = ({
  celeb,
  isActive,
  onToggle,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState<User>(celeb);
  const [isChanged, setIsChanged] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setUserDetails(celeb);
  }, [celeb]);
  const userAge = ageCalculate(celeb.dob);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
    setIsChanged(true);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (isChanged) {
      setIsEditing(false);
      setIsChanged(false);
    }
  };

  const handleCancelClick = () => {
    setUserDetails(celeb);
    setIsEditing(false);
    setIsChanged(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(celeb.id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const cardStyle: React.CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    margin: "16px",
    padding: "16px",
    backgroundColor: "#fff",
    transition: "box-shadow 0.3s ease",
  };

  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    paddingBottom: "8px",
    borderBottom: "1px solid #ddd",
    color: "#666",
  };

  const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "16px",
  };

  const textareaStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    marginBottom: "16px",
    minHeight: "100px", // Increase height to accommodate larger descriptions
  };

  const rowStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  };

  const buttonStyle: React.CSSProperties = {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "1.2em",
    padding: "8px",
  };

  const saveButtonStyle: React.CSSProperties = {
    color: "blue",
  };

  const cancelButtonStyle: React.CSSProperties = {
    color: "red",
  };

  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    marginTop: "16px",
  };

  const dropdown: React.CSSProperties = {
    border: "none",
    background: "none",
    cursor: "pointer",
  };

  const valueContainerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "16px",
  };

  const labelValueStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle} onClick={onToggle}>
        <h3>{`${celeb.first} ${celeb.last}`}</h3>
        <button style={dropdown}>
          {isActive ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {isActive && (
        <div>
          {isEditing ? (
            <div>
              <div style={rowStyle}>
                <label>
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={userAge}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </label>
                <label>
                  Gender:
                  <select
                    name="gender"
                    value={userDetails.gender}
                    onChange={handleInputChange}
                    style={inputStyle}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Rather not say</option>
                  </select>
                </label>
                <label>
                  Country:
                  <input
                    type="text"
                    name="country"
                    value={userDetails.country}
                    onChange={handleInputChange}
                    style={inputStyle}
                  />
                </label>
              </div>

              <label>
                Description:
                <textarea
                  name="description"
                  value={userDetails.description}
                  onChange={handleInputChange}
                  style={textareaStyle}
                />
              </label>
              <div style={buttonContainerStyle}>
                <button
                  style={{ ...buttonStyle, ...cancelButtonStyle }}
                  onClick={handleCancelClick}
                >
                  <FaTimes />
                </button>
                <button
                  style={{ ...buttonStyle, ...saveButtonStyle }}
                  onClick={handleSaveClick}
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={rowStyle}>
                <div style={labelValueStyle}>
                  <strong>Age:</strong>
                  <span>{userAge}</span>
                </div>
                <div style={labelValueStyle}>
                  <strong>Gender:</strong>
                  <span>{userDetails.gender}</span>
                </div>
                <div style={labelValueStyle}>
                  <strong>Country:</strong>
                  <span>{userDetails.country}</span>
                </div>
              </div>

              <p>
                <div style={labelValueStyle}>
                  <strong>Description:</strong>
                  <span>{userDetails.description}</span>
                </div>
              </p>

              <div style={{ textAlign: "right" }}>
                <button
                  style={{ ...buttonStyle, color: "red" }}
                  onClick={handleDeleteClick}
                >
                  <FaTrash />
                </button>
                <button
                  style={{ ...buttonStyle, color: "blue" }}
                  onClick={handleEditClick}
                >
                  <FaEdit />
                </button>
              </div>
              {showDeleteConfirm && (
                <ConfirmationDialog
                  show={showDeleteConfirm}
                  onClose={handleCancelDelete}
                  onConfirm={handleConfirmDelete}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
