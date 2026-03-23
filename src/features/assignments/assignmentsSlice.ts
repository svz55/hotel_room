import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { updateRoomStatus } from '../rooms/roomsSlice';
import { assignRoomToHousekeeper } from '../housekeepers/housekeepersSlice';
import axios from 'axios';

interface AssignmentsState {}

const initialState: AssignmentsState = {};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {},
});

export const assignRooms = () => async (dispatch: any, getState: () => RootState) => {
  const { rooms: initialRooms, housekeepers: initialHousekeepers } = getState();

  const dirtyRooms = initialRooms.rooms
    .filter((room) => room.status === 'dirty')
    .sort((a, b) => a.floor - b.floor);

  const housekeepersStateTracker = initialHousekeepers.housekeepers.map(h => {
    const currentWorkload = h.assignedRooms.reduce((acc, roomId) => {
      const room = initialRooms.rooms.find(r => r.id === roomId);
      return acc + (room ? room.capacity : 0);
    }, 0);

    return {
      id: h.id,
      name: h.name,
      workloadCapacity: h.workloadCapacity,
      currentWorkload,
      newlyAssigned: [] as string[],
    };
  });

  for (const room of dirtyRooms) {
    housekeepersStateTracker.sort((a, b) => a.currentWorkload - b.currentWorkload);

    const availableHousekeeper = housekeepersStateTracker.find(
      (h) => h.currentWorkload + room.capacity <= h.workloadCapacity
    );

    if (availableHousekeeper) {
      dispatch(assignRoomToHousekeeper({ housekeeperId: availableHousekeeper.id, roomId: room.id }));
      dispatch(updateRoomStatus({ id: room.id, status: 'assigned' }));
      
      availableHousekeeper.currentWorkload += room.capacity;
      availableHousekeeper.newlyAssigned.push(room.id);
    }
  }

  // Send Telegram notification
  const botToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN;
  const channelId = process.env.REACT_APP_TELEGRAM_CHANNEL_ID;

  if (botToken && channelId) {
    let message = '**Назначение номеров завершено**\n\n';
    const assignedHousekeepers = housekeepersStateTracker.filter(h => h.newlyAssigned.length > 0);

    if (assignedHousekeepers.length > 0) {
        assignedHousekeepers.forEach(h => {
            message += `**${h.name}**:\n`;
            h.newlyAssigned.forEach(roomId => {
                const room = initialRooms.rooms.find(r => r.id === roomId);
                if (room) {
                    message += `- Номер ${room.id} (Этаж ${room.floor})\n`;
                }
            });
            message += '\n';
        });
    } else {
        message += 'Нет новых назначений.';
    }

    try {
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: channelId,
        text: message,
        parse_mode: 'Markdown',
      });
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
    }
  }
};

export default assignmentsSlice.reducer;
