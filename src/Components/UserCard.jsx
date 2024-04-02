
import React, { useState } from 'react';
import Button from './Button';
import { FaTrash } from 'react-icons/fa';

const UserCard = ({ user, onDeleteUser , onOpenCreateTeam , onSetUserId}) => {
  const handleAddUser = () => {
    onSetUserId(user._id);
    onOpenCreateTeam();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm h-min-[200px] w-[200px] border flex items-center justify-center">
      <div className="p-4 flex flex-col items-center gap-3">
        <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full border" />
        <div className="mt-2 flex flex-col items-center">
          <div className='flex flex-col items-center'>
            <h2 className="text-lg font-semibold text-gray-800">{`${user.first_name} ${user.last_name}`}</h2>
            <p className="text-sm text-gray-600">{user.domain}</p>
          </div>
          <div className='flex items-center flex-col'>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.gender}</p>
            <p className="text-sm text-gray-600">{user.available ? 'Available' : 'Not Available'}</p>
          </div>
        </div>
        <Button text={'Add User'} onClickOperation={handleAddUser}/>
        <FaTrash className="text-red-500 cursor-pointer" onClick={() => onDeleteUser(user._id)} />
      </div>
    </div>
  );
};

export default UserCard;
