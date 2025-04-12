import { useEffect, useState } from 'react';
import axios from 'axios';

const LegislationList = () => {
  const [laws, setLaws] = useState([]);

  useEffect(() => {
    axios.get('https://local-democracy-platform-lun5.onrender.com/api/legislation/all')
      .then(res => setLaws(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📘 Proposed Local Laws</h2>
      {laws.map((law) => (
        <div
          key={law._id || law.id} // ✅ fallback for mock data with `id`
          className="border p-3 mb-3 rounded-lg shadow-sm bg-white"
        >
          <h3 className="text-lg font-semibold text-gray-800">{law.title}</h3>

          {law.createdAt && (
            <p className="text-sm text-gray-500 mb-1">
              {new Date(law.createdAt).toLocaleString()}
            </p>
          )}

          {law.summary && (
            <p className="text-gray-700 mb-2">
              <strong>Plain Summary:</strong> {law.summary}
            </p>
          )}

          <details>
            <summary className="text-blue-600 mt-2 cursor-pointer">
              View Original Text
            </summary>
            <p className="mt-1 text-sm text-gray-600">{law.originalText}</p>
          </details>
        </div>
      ))}
    </div>
  );
};

export default LegislationList;
