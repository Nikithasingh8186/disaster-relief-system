function IncidentCard({
  incident
}) {
  return (
    <div
      style={{
        border: "1px solid gray",
        margin: "15px",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <h3>{incident.location}</h3>

      <p>
        People:
        {incident.people_affected}
      </p>

      <p>
        Injuries:
        {incident.injuries}
      </p>

      <p>
        Priority:
        {incident.priority}
      </p>

      <p>
        Needs:
        {incident.needs}
      </p>
    </div>
  );
}

export default IncidentCard;