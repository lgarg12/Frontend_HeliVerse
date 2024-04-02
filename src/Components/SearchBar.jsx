import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleChange = event => {
      setSearchQuery(event.target.value);
      onSearch(event.target.value);
    };

    return (
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleChange}
        className="border border-gray-300 rounded-md py-2 px-4 w-full mb-4"
      />
    );
};

export default SearchBar;