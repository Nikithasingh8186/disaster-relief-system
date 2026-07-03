import { useState, useEffect } from "react";
import { API } from "../services/api";

function UploadForm({ refresh }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const [gpsLocation, setGpsLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState("");

  const [locError, setLocError] = useState("");
  const [loadingLoc, setLoadingLoc] = useState(true);

  // Backend endpoint
  const INCIDENT_API = `${API}/incidents`;

  // ---------------- GPS ----------------

  const getGPSLocation = () => {
    if (!navigator.onLine) {
      setLocError("Offline mode: Enter location manually");
      setLoadingLoc(false);
      return;
    }

    if (!navigator.geolocation) {
      setLocError("Geolocation not supported");
      setLoadingLoc(false);
      return;
    }

    setLoadingLoc(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setLocError("");
        setLoadingLoc(false);
      },
      () => {
        setGpsLocation(null);
        setLoadingLoc(false);
        setLocError("GPS failed. Enter location manually.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getGPSLocation();

    window.addEventListener("online", getGPSLocation);

    return () => {
      window.removeEventListener("online", getGPSLocation);
    };
  }, []);

  // ---------------- Image ----------------

  const convertToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  // ---------------- Save ----------------

  const saveIncident = async (incident) => {
    if (!navigator.onLine) {
      const old =
        JSON.parse(localStorage.getItem("incidents")) || [];

      localStorage.setItem(
        "incidents",
        JSON.stringify([...old, incident])
      );
      return;
    }

    try {
      const response = await fetch(INCIDENT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }
    } catch {
      const old =
        JSON.parse(localStorage.getItem("incidents")) || [];

      localStorage.setItem(
        "incidents",
        JSON.stringify([...old, incident])
      );
    }
  };

  // ---------------- Location ----------------

  const getFinalLocation = () => {
    if (gpsLocation) {
      return {
        type: "gps",
        value: gpsLocation,
      };
    }

    if (manualLocation.trim()) {
      return {
        type: "manual",
        value: manualLocation,
      };
    }

    return null;
  };

  // ---------------- Text ----------------

  const submitText = async () => {
    if (!text.trim()) return;

    const location = getFinalLocation();

    if (!location) {
      alert("Please provide location");
      return;
    }

    const incident = {
      type: "text",
      text,
      image: null,
      location,
      time: new Date().toISOString(),
    };

    await saveIncident(incident);

    setText("");
    refresh();
  };

  // ---------------- Image ----------------

  const submitImage = async () => {
    if (!image) return;

    const location = getFinalLocation();

    if (!location) {
      alert("Please provide location");
      return;
    }

    const base64 = await convertToBase64(image);

    const incident = {
      type: "image",
      text: "",
      image: base64,
      location,
      time: new Date().toISOString(),
    };

    await saveIncident(incident);

    setImage(null);
    refresh();
  };

  return (
    <div>
      <h3>📍 Disaster Report Form</h3>

      {loadingLoc ? (
        <p>📡 Fetching GPS location...</p>
      ) : gpsLocation ? (
        <p>
          📍 GPS: {gpsLocation.lat}, {gpsLocation.lng}
        </p>
      ) : (
        <p style={{ color: "red" }}>{locError}</p>
      )}

      {!gpsLocation && (
        <input
          type="text"
          placeholder="Enter location (e.g. Vizag bus stop)"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
        />
      )}

      <hr />

      <textarea
        rows="5"
        cols="50"
        placeholder="Enter disaster report..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <button onClick={submitText}>Submit Text</button>

      <hr />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0] || null)}
      />

      <br />
      <br />

      <button onClick={submitImage}>Upload Image</button>
    </div>
  );
}

export default UploadForm;