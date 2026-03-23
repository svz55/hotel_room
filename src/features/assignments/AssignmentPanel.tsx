import { Button, Paper, Typography } from '@mui/material';
import { useAppDispatch } from '@/app/hooks';
import { assignRooms } from '../assignments/assignmentsSlice';
import { resetRooms } from '../rooms/roomsSlice';
import { resetAssignments } from '../housekeepers/housekeepersSlice';

const AssignmentPanel = () => {
  const dispatch = useAppDispatch();

  const handleAssign = () => {
    dispatch(assignRooms());
  };

  const handleReset = () => {
    dispatch(resetRooms());
    dispatch(resetAssignments());
  };

  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Панель управления
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAssign} style={{ marginRight: '8px' }}>
        Назначить грязные номера
      </Button>
      <Button variant="contained" color="error" onClick={handleReset}>
        Сбросить
      </Button>
    </Paper>
  );
};

export default AssignmentPanel;
