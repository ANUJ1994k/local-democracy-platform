// src/components/admin/LegislationSummary.jsx
import React, { useState } from "react";
import axios from "axios";

const LegislationSummary = () => {
  const [originalText, setOriginalText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!originalText.trim()) return alert("Please enter the original legislation text.");

    setLoading(true);
    try {
      const res = await axios.post("https://local-democracy-platform-lun5.onrender.com/api/legislation/summarize", {
        originalText,
      });
      setSummary(res.data.summary);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert("Failed to generate summary. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">📝 AI-powered Legislation Summarizer</h2>
      <textarea
        value={originalText}
        onChange={(e) => setOriginalText(e.target.value)}
        rows={6}
        className="w-full p-3 border border-gray-300 rounded"
        placeholder="Paste the original legislative text here..."
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Summarizing..." : "Generate Plain Summary"}
      </button>

      {summary && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded">
          <h3 className="font-bold mb-2">🧾 Plain Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default LegislationSummary;
