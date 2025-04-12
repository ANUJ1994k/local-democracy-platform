import { useState } from 'react';
import axios from 'axios';

const AdminLegislationForm = () => {
  const [title, setTitle] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [summary, setSummary] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://local-democracy-platform-lun5.onrender.com/api/legislation/add', {
        title, originalText, summary,
      });
      alert('📘 Legislation added!');
      setTitle('');
      setOriginalText('');
      setSummary('');
    } catch (err) {
      console.error(err);
      alert('Failed to add legislation');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border" />
      <textarea value={originalText} onChange={(e) => setOriginalText(e.target.value)} placeholder="Original Legislation Text" className="w-full p-2 border" />
      <textarea value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Plain Summary" className="w-full p-2 border" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Legislation</button>
    </form>
  );
};

export default AdminLegislationForm;
