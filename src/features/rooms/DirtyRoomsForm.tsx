import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { markRoomsAsDirty } from './roomsSlice';

const DirtyRoomsForm = () => {
  const [roomInput, setRoomInput] = useState('');
  const dispatch = useAppDispatch();

  const handleAddDirtyRooms = () => {
    const roomIds = roomInput.split(',').map(id => id.trim()).filter(id => id);
    if (roomIds.length > 0) {
      dispatch(markRoomsAsDirty(roomIds));
      setRoomInput('');
    }
  };

  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Отметить номера как грязные
      </Typography>
      <TextField
        label="Номера комнат (через запятую)"
        variant="outlined"
        fullWidth
        value={roomInput}
        onChange={(e) => setRoomInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddDirtyRooms();
          }
        }}
        style={{ marginBottom: '16px' }}
      />
      <Button variant="contained" color="primary" onClick={handleAddDirtyRooms}>
        Добавить
      </Button>
    </Paper>
  );
};

export default DirtyRoomsForm;
