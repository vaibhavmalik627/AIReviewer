import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  // review will hold an array of objects like [{ line: 2, type: "bug", message: "Missing semicolon" }, ...]
  const [review, setReview] = useState([]);
  const [plainReview, setPlainReview] = useState(''); // fallback string messages

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:5000/ai/get-review', 
  { code }, 
  {
    headers: { 'Content-Type': 'application/json' }
  }
);

      if (Array.isArray(response.data.review)) {
        setReview(response.data.review);
        setPlainReview('');
      } else if (typeof response.data.review === 'string') {
        // fallback to plain string if backend sends plain text review
        setPlainReview(response.data.review);
        setReview([]);
      } else {
        setPlainReview("⚠️ Unexpected response format.");
        setReview([]);
      }
    } catch (error) {
      console.error("Axios error:", error);
      setPlainReview("⚠️ Failed to fetch review. Is the server running?");
      setReview([]);
    }
  }

  // Highlight code with prism and add spans for feedback highlights
  function highlightWithFeedback(code) {
    const lines = code.split('\n');
    return lines.map((line, index) => {
      const feedbackForLine = review.find(r => r.line === index + 1);
      let highlightedLine = prism.highlight(line, prism.languages.javascript, "javascript");

      if (feedbackForLine) {
        highlightedLine = `<span class="highlight-${feedbackForLine.type}" title="${feedbackForLine.message}">${highlightedLine}</span>`;
      }

      return highlightedLine;
    }).join('\n');
  }

  return (
    <main style={{ display: 'flex', height: '100vh' }}>
      <div className="left" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="code" style={{ flex: 1 }}>
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={highlightWithFeedback}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 16,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
          />
        </div>
        <button 
          onClick={reviewCode} 
          style={{ padding: '10px 15px', marginTop: '10px', cursor: 'pointer' }}
        >
          Review Code
        </button>
      </div>
      <div className="right" style={{ flex: 1, padding: '10px', overflowY: 'auto', borderLeft: '1px solid #ddd' }}>
        {plainReview ? (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {plainReview}
          </Markdown>
        ) : (
          <pre>
            {review.length === 0 ? 'No feedback yet.' : review.map((fb, i) => (
              <div key={i}>
                Line {fb.line} [{fb.type}]: {fb.message}
              </div>
            ))}
          </pre>
        )}
      </div>
    </main>
  );
}

export default App;


