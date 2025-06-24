"use client";
import { useState } from "react";

export default function DebuggerPage() {
  const [code, setCode] = useState("// Paste your JavaScript here");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDebug() {
    setLoading(true);
    setResponse("Thinking...");

    try {
      const res = await fetch("/api/debug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }

      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      setResponse("Error contacting AI debugger.");
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>AI JavaScript Debugger</h1>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={80}
        style={{ width: "100%", fontFamily: "monospace", marginTop: "20px" }}
      />

      <button
        onClick={handleDebug}
        disabled={loading}
        style={{ marginTop: "20px" }}
      >
        {loading ? "Debugging..." : "Run Debugger"}
      </button>

      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "20px",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        {response}
      </pre>
    </main>
  );
}
