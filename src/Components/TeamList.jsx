import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Team from '../Components/Team';
import { FaTrash } from 'react-icons/fa';

const TeamList = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');
  
    const handleInputChange = (event) => {
      setTeamName(event.target.value);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://rest-api-heliverse.onrender.com/api/v2/teams', { name: teamName });
            const responseTeam = await axios.get('https://rest-api-heliverse.onrender.com/api/v2/teams');
            setTeams(responseTeam.data);
            setTeamName('');
        } catch (error) {
            console.error('Error creating team:', error);
        }
    };
    const handleDeleteTeam = async (teamId) => {
      try {
          await axios.delete(`https://rest-api-heliverse.onrender.com/api/v2/teams/${teamId}`);
          const response = await axios.get('https://rest-api-heliverse.onrender.com/api/v2/teams');
          setTeams(response.data);
      } catch (error) {
          console.error('Error deleting team:', error);
      }
    };
  
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
  

  return (
    <div className='flex gap-4 flex-col'>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={teamName}
              onChange={handleInputChange}
              placeholder="Enter team name"
              className="border p-2 rounded-md mr-2"
            />
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Create Team</button>
        </form>
      
        {teams && teams.map(team => (
          <div className='flex justify-between border p-2 rounded-md' key={team._id}>
              <Team team={team} setTeams={setTeams}/>
              <FaTrash className='mt-3' onClick={() => handleDeleteTeam(team._id)}/>
          </div>
        ))}

    </div>
  );
};

export default TeamList;
