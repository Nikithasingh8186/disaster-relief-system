const API = "https://disaster-relief-system.onrender.com";

export const getIncidents = async () => {
  const res = await fetch(`${API}/incidents`);
  if (!res.ok) {
    throw new Error('Failed to fetch incidents');
  }
  return res.json();
};
