const API = 'http://127.0.0.1:8000';

export const getIncidents = async () => {
  const res = await fetch(`${API}/incidents`);
  if (!res.ok) {
    throw new Error('Failed to fetch incidents');
  }
  return res.json();
};
