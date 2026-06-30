import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import UploadForm from "../components/UploadForm";
import IncidentCard from "../components/IncidentCard";

import {
  getIncidents
} from "../services/api";

function Dashboard() {
  const [incidents, setIncidents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const loadIncidents =
    async () => {
      const data =
        await getIncidents();

      setIncidents(data);
    };

  useEffect(() => {
    loadIncidents();
  }, []);

  const filtered =
    incidents.filter((item) =>
      item.location
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "20px"
        }}
      >
        <h1>Dashboard</h1>

        <UploadForm
          refresh={
            loadIncidents
          }
        />

        <br />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <br />

        {filtered.map(
          (incident) => (
            <IncidentCard
              key={
                incident.id
              }
              incident={
                incident
              }
            />
          )
        )}
      </div>
    </div>
  );
}

export default Dashboard;