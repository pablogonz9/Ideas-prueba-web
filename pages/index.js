import { useState, useEffect } from 'react';

export default function Home() {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    fetchTexts();
  }, []);

  async function fetchTexts() {
    const response = await fetch('/api/get-texts');
    const data = await response.json();
    setTexts(data);
  }

  return (
    <div>
      <h1>Saved Texts</h1>
      <ul>
        {texts.map((text) => (
          <li key={text._id}>
            <p>{text.content}</p>
            <small>{new Date(text.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}