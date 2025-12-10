import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("");

  const generateMeme = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImage("");
    setModel("");

    try {
      const res = await axios.post("http://localhost:5000/generate", {
        prompt,
      });

      setImage(res.data.imageUrl);
      setModel(res.data.model || "Unknown");
    } catch (err) {
      console.error(err);
      alert("Error generating meme. Check console for details.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateMeme();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "20px",
          padding: "40px",
          maxWidth: "800px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            margin: "0 0 30px 0",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🎨 AI Meme Generator
        </h1>

        <input
          type="text"
          placeholder="Describe your meme... (e.g., 'funny cat with sunglasses')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: "15px 20px",
            width: "100%",
            fontSize: "16px",
            borderRadius: "10px",
            border: "2px solid #ddd",
            outline: "none",
            transition: "border 0.3s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.border = "2px solid #667eea")}
          onBlur={(e) => (e.target.style.border = "2px solid #ddd")}
        />

        <button
          onClick={generateMeme}
          disabled={loading || !prompt.trim()}
          style={{
            marginTop: "20px",
            padding: "15px 40px",
            width: "100%",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: loading || !prompt.trim() ? "not-allowed" : "pointer",
            background:
              loading || !prompt.trim()
                ? "#ccc"
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            transition: "transform 0.2s, box-shadow 0.2s",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
          onMouseEnter={(e) => {
            if (!loading && prompt.trim()) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
          }}
        >
          {loading ? "🎨 Generating..." : "✨ Generate Meme"}
        </button>

        {loading && (
          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
              color: "#667eea",
              fontSize: "16px",
            }}
          >
            Creating your masterpiece... This may take 10-30 seconds ⏳
          </p>
        )}

        {model && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Model: {model}
          </p>
        )}

        {image && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <img
              src={image}
              alt="Generated Meme"
              style={{
                maxWidth: "100%",
                borderRadius: "15px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            />
            <a
              href={image}
              download="meme.png"
              style={{
                display: "inline-block",
                marginTop: "20px",
                padding: "10px 30px",
                background: "#4CAF50",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#45a049")}
              onMouseLeave={(e) => (e.target.style.background = "#4CAF50")}
            >
              💾 Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;