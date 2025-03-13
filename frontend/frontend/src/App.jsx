import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import "./App.css";
import axios from "axios";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`function sum() {
return a+b;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  useEffect(() => {
    prism.highlightAll();
  }, []);

  const reviewCode = async () => {
    setLoading(true); // ✅ Start loading
    try {
      const response = await axios.post("http://localhost:4003/ai/get-response", {
        code,
      });
      setReview(response.data);
    } catch (error) {
      setReview("Error fetching review. Please try again.");
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
                color: "white",
              }}
            />
          </div>
          <div className="review-btn" onClick={reviewCode}>
            Review
          </div>
        </div>

        <div className="right">
          {loading ? (
            <div className="loading-animation"></div> 
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
