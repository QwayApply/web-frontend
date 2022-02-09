import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

const AutocompleteStyle = {
  width: '30%',
};

export default ({ placeholder, options, setValue, ...props }: any) => {
  return (
    <Autocomplete
      {...props}
      disablePortal
      style={AutocompleteStyle}
      placeholder={placeholder}
      options={options}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            ...params.InputLabelProps,
            style: { color: '#000', fontWeight: 600 },
          }}
          InputProps={{
            ...params.InputProps,
            style: {
              backgroundColor: '#fff',
              outline: 'none',
              fontWeight: 600,
            },
          }}
        />
      )}
    />
  );
};
