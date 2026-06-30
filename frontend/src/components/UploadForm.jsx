import { useState, useEffect } from "react";

function UploadForm({ refresh }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const [gpsLocation, setGpsLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState("");

  const [locError, setLocError] = useState("");
  const [loadingLoc, setLoadingLoc] = useState(true);

  const API = "http://127.0.0.1:8000/incidents";

  // 🔥 GPS LOCATION
  const getGPSLocation = () => {
    if (!navigator.onLine) {
      setLocError("Offline mode: enter location manually");
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
    return () => window.removeEventListener("online", getGPSLocation);
  }, []);

  // 🔥 IMAGE TO BASE64
  const convertToBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

  // 🔥 SAVE (ONLINE + OFFLINE)
  const saveIncident = async (incident) => {
    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incident),
      });
    } catch (err) {
      const old = JSON.parse(localStorage.getItem("incidents")) || [];
      localStorage.setItem("incidents", JSON.stringify([...old, incident]));
    }
  };

  // 🔥 FINAL LOCATION
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

  // 📝 TEXT SUBMIT
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
      time: new Date().toISOString(), // FIXED TIME
    };

    await saveIncident(incident);

    setText("");
    refresh();
  };

  // 🖼 IMAGE SUBMIT
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
      time: new Date().toISOString(), // FIXED TIME
    };

    await saveIncident(incident);

    setImage(null);
    refresh();
  };

  return (
    <div>
      <h3>📍 Disaster Report Form</h3>

      {/* LOCATION STATUS */}
      {loadingLoc ? (
        <p>📡 Fetching GPS location...</p>
      ) : gpsLocation ? (
        <p>📍 GPS: {gpsLocation.lat}, {gpsLocation.lng}</p>
      ) : (
        <p style={{ color: "red" }}>{locError}</p>
      )}

      {/* MANUAL LOCATION */}
      {!gpsLocation && (
        <input
          type="text"
          placeholder="Enter location (e.g. Vizag bus stop)"
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
        />
      )}

      <hr />

      {/* TEXT */}
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter disaster report..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />
      <button onClick={submitText}>Submit Text</button>

      <hr />

      {/* IMAGE */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0] || null)}
      />

      <br /><br />
      <button onClick={submitImage}>Upload Image</button>
    </div>
  );
}

export default UploadForm;