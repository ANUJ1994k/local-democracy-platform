
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotePollList = () => {
  const [polls, setPolls] = useState([]);
  const [userVotes, setUserVotes] = useState(new Set()); // Track user votes

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get('https://local-democracy-platform-lun5.onrender.com/api/votes/active');
        setPolls(response.data);
      } catch (error) {
        console.error('Error fetching polls:', error);
      }
    };

    fetchPolls();
  }, []);

  const handleVote = async (pollId, option) => {
    try {
      const userId = 'user_' + Math.random().toString(36).substring(7); 
      await axios.post(`https://local-democracy-platform-lun5.onrender.com/api/votes/vote/${pollId}`, {
        userId,
        option
      });

      setUserVotes(prev => new Set(prev.add(pollId))); // Prevent multiple votes on the same poll
      alert('Vote recorded!');
    } catch (error) {
      console.error('Error submitting vote:', error);
      alert('Failed to record vote. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold">Active Polls</h2>
      {polls.length === 0 ? (
        <p>No active polls at the moment.</p>
      ) : (
        polls.map((poll) => (
          <div key={poll._id} className="border border-gray-300 p-4 rounded-md space-y-4">
            <h3 className="text-lg font-semibold">{poll.question}</h3>
            {poll.description && <p>{poll.description}</p>}
            {poll.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleVote(poll._id, option)}
                className="px-4 py-2 bg-blue-600 text-white rounded mt-2 hover:bg-blue-700"
                disabled={userVotes.has(poll._id)} // Disable voting if user already voted on this poll
              >
                {option}
              </button>
            ))}
            {poll.endsAt && (
              <p className="text-sm text-gray-500">
                Voting ends at: {new Date(poll.endsAt).toLocaleString()}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default VotePollList;
