import { useAppSelector } from '@/app/hooks';
import type { RootState } from '@/app/store';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const HousekeepersList = () => {
  const { housekeepers, rooms } = useAppSelector((state: RootState) => state);

  const getWorkloadDetails = (assignedRooms: string[]) => {
    let currentWorkload = 0;
    const breakdown: string[] = [];

    const sortedRooms = [...assignedRooms].sort();

    sortedRooms.forEach(roomId => {
      const room = rooms.rooms.find(r => r.id === roomId);
      if (room) {
        currentWorkload += room.capacity;
        breakdown.push(`${room.id}/${room.capacity}`);
      }
    });

    const breakdownString = breakdown.length > 0 ? ` (${breakdown.join(', ')})` : '';
    
    return {
      currentWorkload,
      breakdownString
    };
  };

  return (
    <Paper elevation={3} style={{ margin: '16px', padding: '16px' }}>
      <Typography variant="h5" gutterBottom>
        Горничные
      </Typography>
      <List>
        {housekeepers.housekeepers.map((housekeeper) => {
          const { currentWorkload, breakdownString } = getWorkloadDetails(housekeeper.assignedRooms);
          return (
            <ListItem 
              key={housekeeper.id}
              style={{
                backgroundColor: housekeeper.color,
                borderRadius: '4px',
                marginBottom: '8px',
                color: 'white'
              }}
            >
              <ListItemText
                primary={housekeeper.name}
                secondary={`Загруженность: ${currentWorkload} / ${housekeeper.workloadCapacity}${breakdownString}`}
                secondaryTypographyProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default HousekeepersList;
