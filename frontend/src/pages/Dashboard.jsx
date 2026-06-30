import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import UploadForm from '../components/UploadForm';
import IncidentCard from '../components/IncidentCard';

import { getIncidents } from '../services/api';

function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState('');

  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (err) {
      console.error('Unable to load incidents', err);
      setIncidents([]);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const filtered = incidents.filter((item) => {
    const locationText =
      item.location?.type === 'gps'
        ? `${item.location.value?.lat}, ${item.location.value?.lng}`
        : item.location?.type === 'manual'
          ? item.location.value
          : typeof item.location === 'string'
            ? item.location
            : '';

    return (
      locationText.toLowerCase().includes(search.toLowerCase()) ||
      (item.text || '').toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <Navbar />

      <div style={{ padding: '20px' }}>
        <h1>Dashboard</h1>

        <UploadForm refresh={loadIncidents} />

        <br />

        <SearchBar search={search} setSearch={setSearch} />

        <br />

        {filtered.length === 0 ? (
          <p>No reports found.</p>
        ) : (
          filtered.map((incident) => (
            <IncidentCard
              key={incident.time || incident.id || Math.random()}
              incident={incident}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
