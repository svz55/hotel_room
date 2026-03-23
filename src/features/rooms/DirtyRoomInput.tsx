import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { updateRoomStatus } from './roomsSlice';
import type { RootState } from '@/app/store';

const DirtyRoomInput = () => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();
  const allRooms = useAppSelector((state: RootState) => state.rooms.rooms);
  const allRoomIds = allRooms.map(room => room.id);

  const handleAddDirtyRooms = () => {
    const roomIds = input.split(',').map(id => id.trim()).filter(Boolean);

    if (roomIds.length === 0) {
        return;
    }

    const invalidIds = roomIds.filter(id => !allRoomIds.includes(id));

    if (invalidIds.length > 0) {
      alert(`Следующие номера не найдены: ${invalidIds.join(', ')}`);
      return;
    }
    
    roomIds.forEach(roomId => {
      dispatch(updateRoomStatus({ id: roomId, status: 'dirty' }));
    });
    
    setInput('');
  };

  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Добавить грязные номера
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          label="Номера через запятую"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="small"
          fullWidth
        />
        <Button variant="contained" onClick={handleAddDirtyRooms}>
          Добавить
        </Button>
      </Box>
    </Paper>
  );
};

export default DirtyRoomInput;
