import React from "react";

function UnauthPage() {
  return (
    <div style={styles.container}>
      <div style={styles.messageContainer}>
        <h1 style={styles.title}>Oops!</h1>
        <p style={styles.message}>You don't have access to view this page.</p>
        <p style={styles.suggestion}>Please contact support or check your permissions.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    fontFamily: "'Arial', sans-serif",
  },
  messageContainer: {
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: "10px",
  },
  message: {
    fontSize: "18px",
    color: "#333",
    marginBottom: "15px",
  },
  suggestion: {
    fontSize: "16px",
    color: "#5bc0de",
    fontStyle: "italic",
  },
};

export default UnauthPage;
