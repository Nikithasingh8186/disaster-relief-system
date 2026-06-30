import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import "./App.css";

const API = "http://127.0.0.1:8000";

function App() {
  const [incidents, setIncidents] = useState([]);

  // 🔥 FETCH FROM BACKEND
  const refresh = async () => {
    try {
      const res = await fetch(`${API}/incidents`);
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      console.log("Backend not available");
      setIncidents([]);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="app-container">

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>🚨 Disaster Alert System</h1>
        <p>Report incidents quickly and online/offline ready</p>
      </div>

      {/* FORM */}
      <UploadForm refresh={refresh} />

      <hr />

      <h2>📋 Reports</h2>

      {incidents.length === 0 ? (
        <p>No reports yet</p>
      ) : (
        incidents.map((item, index) => (
          <div key={index} className="card">

            {/* TEXT */}
            {item.text && <p>📝 {item.text}</p>}

            {/* IMAGE */}
            {item.image && (
              <img
                src={item.image}
                alt="incident"
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "10px"
                }}
              />
            )}

            {/* LOCATION (FINAL SAFE DISPLAY) */}
            <p style={{ color: "gray" }}>
              📍{" "}
              {item.location?.type === "gps"
                ? `${item.location.value?.lat}, ${item.location.value?.lng}`
                : item.location?.type === "manual"
                ? item.location.value
                : typeof item.location === "string"
                ? item.location
                : "Location not available"}
            </p>

            {/* TIME */}
            <small>
              🕒 {new Date(item.time).toLocaleString()}
            </small>

          </div>
        ))
      )}
    </div>
  );
}

export default App;