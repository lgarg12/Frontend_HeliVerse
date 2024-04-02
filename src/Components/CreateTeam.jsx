import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateTeam = ({ onClose, userId }) => {
  const [teams,setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('https://rest-api-heliverse.onrender.com/api/v2/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleAddUserToTeam = async (teamId) => {
    try {
      await axios.post(`https://rest-api-heliverse.onrender.com/api/v2/teams/add-user`, { userId , teamId });
      onClose(); 
    } catch (error) {
      console.error('Error adding user to team:', error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg z-50 w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Insert User In Team</h2>
        <div className='flex flex-col gap-5'>
          {teams.map(team => (
            <div key={team._id} className="flex items-center">
              <button className="font-semibold" onClick={() => handleAddUserToTeam(team._id)}>{team.name}</button>
            </div>
          ))}
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
