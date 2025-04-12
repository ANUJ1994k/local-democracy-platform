// src/components/admin/CreatePoll.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [location, setLocation] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question || !options.length || options.some(opt => !opt)) {
      return alert('Please provide all fields properly.');
    }

    setLoading(true);

    try {
      const response = await axios.post('https://local-democracy-platform-lun5.onrender.com/api/votes/create', {
        question,
        description,
        options,
        location,
        endsAt: endsAt ? new Date(endsAt) : null,
      });

      alert('Poll created successfully!');
      setLoading(false);
    } catch (error) {
      console.error('Error creating poll:', error);
      alert('Failed to create poll. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Create a New Poll</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Poll Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="What is the question?"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Provide more context"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Poll Options</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="w-full p-3 border border-gray-300 rounded mt-2"
              placeholder={`Option ${index + 1}`}
              required
            />
          ))}
          <button
            type="button"
            onClick={addOption}
            className="text-blue-600 mt-2"
          >
            + Add another option
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">Location (Optional)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Poll End Date (Optional)</label>
          <input
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Creating Poll...' : 'Create Poll'}
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
