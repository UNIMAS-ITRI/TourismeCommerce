import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        value={searchTerm}
        onChange={handleSearchChange}
        variant="standard"
        size="small"
        placeholder="Search..."
        InputProps={{
          style: {
            backgroundColor: 'white',
            disableUnderline: true,
            borderRadius: '5px',
            paddingLeft: '10px',
            width: '50vw',
          },
          endAdornment: (
            <IconButton type="submit">
              <SearchRoundedIcon />
            </IconButton>
          )
        }}
      />
    </form>
  );
}

export default SearchBar;
