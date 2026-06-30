function IncidentCard({ incident }) {
  const formattedTime = incident.time
    ? new Date(incident.time).toLocaleString()
    : 'No valid time';

  const locationLabel =
    incident.location?.type === 'gps'
      ? `${incident.location.value?.lat}, ${incident.location.value?.lng}`
      : incident.location?.type === 'manual'
        ? incident.location.value
        : typeof incident.location === 'string'
          ? incident.location
          : 'Location not available';

  return (
    <div
      style={{
        border: '1px solid gray',
        margin: '15px',
        padding: '20px',
        borderRadius: '10px',
        background: '#f9fafb',
      }}
    >
      <h3>Incident Report</h3>

      {incident.text ? (
        <p>📝 {incident.text}</p>
      ) : (
        <p style={{ color: 'gray' }}>No text provided</p>
      )}

      {incident.image && (
        <img
          src={incident.image}
          alt="incident"
          style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }}
        />
      )}

      <p>📍 {locationLabel}</p>
      <small>🕒 {formattedTime}</small>
    </div>
  );
}

export default IncidentCard;
