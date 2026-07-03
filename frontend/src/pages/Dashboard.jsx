import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UploadForm from "../components/UploadForm";
import IncidentCard from "../components/IncidentCard";

import { getIncidents, API } from "../services/api";

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");

  // ---------------- Sync Offline Reports ----------------

  const syncOfflineReports = async () => {
    if (!navigator.onLine) return;

    const offline =
      JSON.parse(localStorage.getItem("incidents")) || [];

    if (offline.length === 0) return;

    try {
      for (const incident of offline) {
        const response = await fetch(`${API}/incidents`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(incident),
        });

        if (!response.ok) {
          throw new Error("Failed to sync report");
        }
      }

      // Remove offline reports after successful sync
      localStorage.removeItem("incidents");

      console.log("Offline reports synced successfully.");

      // Reload latest backend data
      loadIncidents();
    } catch (err) {
      console.error("Sync failed:", err);
    }
  };

  // ---------------- Load Reports ----------------

  const loadIncidents = async () => {
    if (!navigator.onLine) {
      const offline =
        JSON.parse(localStorage.getItem("incidents")) || [];

      setIncidents(offline);
      return;
    }

    try {
      const data = await getIncidents();

      setIncidents(data);

      // Cache latest backend data
      localStorage.setItem(
        "incidents",
        JSON.stringify(data)
      );
    } catch (err) {
      console.error("Unable to load incidents:", err);

      const offline =
        JSON.parse(localStorage.getItem("incidents")) || [];

      setIncidents(offline);
    }
  };

  // ---------------- Startup ----------------

  useEffect(() => {
    loadIncidents();

    const handleOnline = async () => {
      await syncOfflineReports();
      await loadIncidents();
    };

    const handleOffline = () => {
      loadIncidents();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ---------------- Search ----------------

  const filtered = incidents.filter((item) => {
    const locationText =
      item.location?.type === "gps"
        ? `${item.location.value?.lat}, ${item.location.value?.lng}`
        : item.location?.type === "manual"
        ? item.location.value
        : typeof item.location === "string"
        ? item.location
        : "";

    return (
      locationText.toLowerCase().includes(search.toLowerCase()) ||
      (item.text || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  // ---------------- UI ----------------

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        <UploadForm refresh={loadIncidents} />

        <br />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <br />

        {filtered.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          filtered.map((incident) => (
            <IncidentCard
              key={incident.id || incident.time}
              incident={incident}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;