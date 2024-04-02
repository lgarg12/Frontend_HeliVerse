import React from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Team = ({ team , setTeams}) => {

    const handleDeleteUser = async (userId, teamId) => {
        try {
            await axios.post('https://rest-api-heliverse.onrender.com/api/v2/teams/remove-user', { userId, teamId });
            const response = await axios.get('https://rest-api-heliverse.onrender.com/api/v2/teams');
            setTeams(response.data);
        } catch (error) {
            console.error('Error removing user from team:', error);
        }
      };    
  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">{team && team.name}</h2>
      <div className="border rounded-lg p-4">
        {team && team.users.length > 0 ? (
          <ul className='overflow-y-scroll h-[300px] w-[300px]'>
            {team.users.map(user => (
              <li key={user._id} className="border-b py-2 mx-2 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img src={user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full border" />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.domain}</p>
                  </div>
                </div>
                <FaTrash className='text-light' onClick={() => handleDeleteUser(user._id,team._id)}/>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users in this team</p>
        )}
      </div>
    </div>
  );
};

export default Team;
