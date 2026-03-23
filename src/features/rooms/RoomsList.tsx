import { useAppDispatch, useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { Grid, Typography, Paper } from '@mui/material';
import type { Room } from '@/types';
import { toggleRoomStatus } from './roomsSlice';

const translateStatus = (status: string) => {
  switch (status) {
    case 'dirty':
      return 'Грязный';
    case 'assigned':
      return 'Назначен';
    case 'clean':
      return 'Чистый';
    default:
      return status;
  }
};

const RoomsList = () => {
  const { rooms, housekeepers } = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const handleRoomClick = (roomId: string, currentStatus: string) => {
    if (currentStatus !== 'assigned') {
      dispatch(toggleRoomStatus(roomId));
    }
  };

  const getHousekeeperInfo = (roomId: string) => {
    const housekeeper = housekeepers.housekeepers.find(h => h.assignedRooms.includes(roomId));
    return housekeeper ? { name: housekeeper.name, color: housekeeper.color } : { name: '', color: '#ff9800' };
  }

  const roomsByFloor = rooms.rooms.reduce((acc, room) => {
    (acc[room.floor] = acc[room.floor] || []).push(room);
    return acc;
  }, {} as Record<number, Room[]>);

  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Номера
      </Typography>
      {Object.entries(roomsByFloor).map(([floor, floorRooms]) => (
        <Paper key={floor} elevation={2} style={{ margin: '16px 0', padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            Этаж {floor}
          </Typography>
          <Grid container spacing={2}>
            {floorRooms.map((room) => {
              const housekeeperInfo = getHousekeeperInfo(room.id);
              return (
                <Grid item key={room.id} xs={12} sm={6} md={4} lg={2.4}>
                  <Paper 
                    elevation={3} 
                    style={{
                      padding: '12px', 
                      textAlign: 'center', 
                      backgroundColor: room.status === 'dirty' ? '#ffebee' : room.status === 'assigned' ? housekeeperInfo.color : '#e8f5e9',
                      cursor: room.status !== 'assigned' ? 'pointer' : 'default',
                      color: room.status === 'assigned' ? 'white' : 'inherit'
                    }}
                    onClick={() => handleRoomClick(room.id, room.status)}
                  >
                    <Typography variant="subtitle1">№ {room.id}</Typography>
                    <Typography variant="body2">{room.capacity}-М</Typography>
                    <Typography variant="caption">{translateStatus(room.status)}</Typography>
                    <Typography variant="caption" display="block">
                      {room.status === 'assigned' ? `- ${housekeeperInfo.name}` : '\u00A0'}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      ))}
    </Paper>
  );
};

export default RoomsList;
