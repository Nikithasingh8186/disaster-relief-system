const API = "http://127.0.0.1:8000";

export async function getIncidents() {
  try {
    const response = await fetch(
      `${API}/incidents`
    );

    const data = await response.json();

    localStorage.setItem(
      "incidents",
      JSON.stringify(data)
    );

    return data;
  } catch {
    const saved =
      localStorage.getItem("incidents");

    return saved
      ? JSON.parse(saved)
      : [];
  }
}

export async function uploadText(text) {
  const response = await fetch(
    `${API}/upload/text`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        text
      })
    }
  );

  return await response.json();
}