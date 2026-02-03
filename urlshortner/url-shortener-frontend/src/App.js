import { useState } from "react";
import Analytics from "./Analytics";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");

    try {
      const res = await fetch("http://localhost:3002/url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setShortUrl(`http://localhost:3002/${data.id}`);
      setUrl("");
    } catch {
      setError("Backend server not running");
    }
  };

  return (
    <div className="container">
      <h1>🔗 URL Shortener</h1>

      <button onClick={() => setShowAnalytics(!showAnalytics)}>
        {showAnalytics ? "⬅ Back" : "📊 Analytics"}
      </button>

      {showAnalytics ? (
        <Analytics />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter long URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit">Shorten</button>
          </form>

          {error && <p className="error">{error}</p>}

          {shortUrl && (
            <div className="result">
              <p>Short URL:</p>
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
