import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelUsed, setModelUsed] = useState("");

  const generateMeme = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImage("");
    setModelUsed("");

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt,
      });

      setImage(res.data.imageUrl);
      setModelUsed(res.data.model);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error || "Error generating meme (check backend)";
      alert(msg);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "80px",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "30px" }}>
        AI Meme Generator
      </h1>

      <input
        type="text"
        placeholder="Type meme idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          padding: "10px",
          width: "320px",
          borderRadius: "5px",
          border: "1px solid #555",
          background: "#222",
          color: "#fff",
        }}
      />

      <br />

      <button
        onClick={generateMeme}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          background: loading ? "#444" : "#000",
          color: "white",
          borderRadius: "5px",
          border: "1px solid #555",
          marginTop: "10px",
        }}
      >
        {loading ? "Generating..." : "Generate Meme"}
      </button>

      <br />

      {modelUsed && (
        <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
          Model used: {modelUsed}
        </p>
      )}

      {image && (
        <img
          src={image}
          alt="Generated Meme"
          style={{ width: "400px", borderRadius: "10px", marginTop: "20px" }}
        />
      )}
    </div>
  );
}

export default App;
