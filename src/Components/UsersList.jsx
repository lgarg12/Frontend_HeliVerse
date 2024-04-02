import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';
import Pagination from 'react-js-pagination'; 
import Button from './Button';
import SearchBar from './SearchBar';
import CreateTeam from './CreateTeam';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [userId,setUserId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usersPerPage = 20;

  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://rest-api-heliverse.onrender.com/api/v1/users'); 
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    setSearchResults(users); 
  }, [users]);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = searchResults.slice(indexOfFirstUser, indexOfLastUser);


  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = query => {
    if(!users) return;

    const filteredUsers = users.filter(user =>
      (user.first_name && user.first_name.toLowerCase().includes(query.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResults(filteredUsers);
    setCurrentPage(1); 
  };
  const handleDeleteUser = async userId => {
    try {
      await axios.delete(`https://rest-api-heliverse.onrender.com/v1/users/${userId}`);
      const response = await axios.get('https://rest-api-heliverse.onrender.com/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleModalClose = () => {
    
    setIsModalOpen(false);
  };
  const handleOpenCreatTeam = () => {
    setIsModalOpen(true); 
  };
  const handleSettingUserId = (userId) => {
    setUserId(userId)
  }


  return (
    <div className="w-[9/11]">
      <SearchBar onSearch={handleSearch}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentUsers.map(user => (
          <UserCard key={user._id} user={user} OnDeleteUser={handleDeleteUser} onOpenCreateTeam={handleOpenCreatTeam} onSetUserId={handleSettingUserId} />
        ))}
      </div>
      {isModalOpen && <CreateTeam onClose={handleModalClose} userId={userId}/>}
      <div className="flex justify-center mt-4">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={usersPerPage}
          totalItemsCount={users.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText={<Button text={'previous'}/>}
          nextPageText={<Button text={'next'}/>}
          hideFirstLastPages={true}
          hideNavigation={users.length <= usersPerPage}
          innerClass='flex gap-5 items-center border'
        />
      </div>
    </div>
  );
};

export default UsersList;
