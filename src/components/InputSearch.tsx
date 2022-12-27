import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

interface IInputSearch {
  handleClickSearch: (param: string) => void;
}

const InputSearch = ({handleClickSearch}: IInputSearch) => {

  const [query, setQuery] = useState("");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  type eventType = React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>;

  const handleSearch = (e: eventType) => {
    e.preventDefault();
    //Prevent empty search
    if (query) handleClickSearch(query);
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{ p: '2px 4px', m: '0 0 20px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search city"
        inputProps={{ 'aria-label': 'search' }}
        fullWidth
        onChange={handleChangeSearch}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export { InputSearch }