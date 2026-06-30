function IncidentCard({ incident }) {
  const formattedTime =
    incident.time && !isNaN(incident.time)
      ? new Date(Number(incident.time)).toLocaleString()
      : "No valid time";

  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "15px",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h3>{incident.location}</h3>

      <p>People: {incident.people_affected}</p>

      <p>Injuries: {incident.injuries}</p>

      <p>Priority: {incident.priority}</p>

      <p>Needs: {incident.needs}</p>

      <small>🕒 {formattedTime}</small>
    </div>
  );
}

export default IncidentCard;