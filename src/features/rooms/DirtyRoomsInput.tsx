import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { markRoomsAsDirty } from './roomsSlice';
import { TextField, Button, Box } from '@mui/material';

const DirtyRoomsInput = () => {
  const [roomNumbers, setRoomNumbers] = useState('');
  const dispatch = useAppDispatch();

  const handleAddDirtyRooms = () => {
    const ids = roomNumbers.split(',').map(s => s.trim()).filter(Boolean);
    if (ids.length) {
      dispatch(markRoomsAsDirty(ids));
      setRoomNumbers('');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', margin: '16px' }}>
      <TextField
        label="Грязные номера (через запятую)"
        variant="outlined"
        value={roomNumbers}
        onChange={(e) => setRoomNumbers(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <Button variant="contained" onClick={handleAddDirtyRooms}>
        Добавить
      </Button>
    </Box>
  );
};

export default DirtyRoomsInput;
