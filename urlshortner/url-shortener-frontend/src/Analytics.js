import { useState } from "react";

function Analytics() {
  const [shortId, setShortId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    setError("");
    setData(null);

    if (!shortId) {
      setError("Enter Short ID");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3002/url/analytics/${shortId}`
      );
      const result = await res.json();

      if (!res.ok) {
        setError(result.error);
        return;
      }

      setData(result);
    } catch {
      setError("Backend not reachable");
    }
  };

  return (
    <div>
      <h2>🌍 Analytics Dashboard</h2>

      <input
        type="text"
        placeholder="Enter Short ID"
        value={shortId}
        onChange={(e) => setShortId(e.target.value)}
      />

      <button onClick={fetchAnalytics}>Get Analytics</button>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="analytics">
          <p><b>Short ID:</b> {data.shortId}</p>
          <p><b>Original URL:</b> {data.redirectURL}</p>
          <p><b>Total Clicks:</b> {data.totalClicks}</p>

          <h3>Visitor Details</h3>
          <table style={{ width: "100%", fontSize: "14px" }}>
            <thead>
              <tr>
                <th>Time</th>
                <th>IP</th>
                <th>Country</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {data.visitHistory.map((v, i) => (
                <tr key={i}>
                  <td>{new Date(v.timestamp).toLocaleString()}</td>
                  <td>{v.ip}</td>
                  <td>{v.country}</td>
                  <td>{v.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Analytics;
