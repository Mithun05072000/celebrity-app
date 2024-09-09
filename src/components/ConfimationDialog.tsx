import React from "react";

interface ConfirmationDialogProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p>Are you sure you want to delete?</p>
        <div style={buttonContainerStyle}>
          <button
            onClick={onConfirm}
            style={deleteButtonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "red")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ddd")
            }
          >
            Delete
          </button>
          <button onClick={onClose} style={cancelButtonStyle}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  textAlign: "center",
  position: "relative",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "20px",
};

const buttonStyle = {
  margin: "0 5px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1rem",
  backgroundColor: "#ddd", // Default color for both buttons
};

const deleteButtonStyle = {
  ...buttonStyle,
  color: "black",
};

const cancelButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ddd",
  color: "black",
};

export default ConfirmationDialog;
