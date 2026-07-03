const API =
  window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://disaster-relief-system.onrender.com";

export const getIncidents = async () => {
  if (!navigator.onLine) {
    throw new Error("Offline");
  }

  try {
    const res = await fetch(`${API}/incidents`);

    if (!res.ok) {
      throw new Error("Failed to fetch incidents");
    }

    return res.json();
  } catch (err) {
    throw new Error("Unable to connect to backend");
  }
};

export { API };