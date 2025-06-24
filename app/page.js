"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1>Welcome to My App</h1>
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "20px",
          cursor: "default",
        }}
      >
        Debug your JavaScript code with AI.
      </p>
      <Link href="/debugger">
        <button>Go to AI Code Debugger</button>
      </Link>
    </main>
  );
}
