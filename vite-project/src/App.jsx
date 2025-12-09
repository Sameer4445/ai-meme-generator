import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateMeme = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImage("");

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt,
      });

      setImage(res.data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Error generating meme");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>AI Meme Generator</h1>

      <input
        type="text"
        placeholder="Type meme idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <br /><br />

      <button
        onClick={generateMeme}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
          background: "black",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Generate Meme
      </button>

      <br /><br />

      {loading && <p>Generating meme...</p>}

      {image && (
        <img
          src={image}
          alt="Generated Meme"
          style={{ width: "400px", borderRadius: "10px" }}
        />
      )}
    </div>
  );
}

export default App;
