import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Housekeeper } from '@/types';

interface HousekeepersState {
  housekeepers: Housekeeper[];
}

const initialState: HousekeepersState = {
  housekeepers: [
    { id: 'h1', name: 'Анна', workloadCapacity: 20, assignedRooms: [], color: '#FFC107' },
    { id: 'h2', name: 'Иван', workloadCapacity: 20, assignedRooms: [], color: '#2196F3' },
    { id: 'h3', name: 'Мария', workloadCapacity: 20, assignedRooms: [], color: '#4CAF50' },
    { id: 'h4', name: 'Петр', workloadCapacity: 20, assignedRooms: [], color: '#E91E63' },
    { id: 'h5', name: 'Елена', workloadCapacity: 20, assignedRooms: [], color: '#9C27B0' },
  ],
};

const housekeepersSlice = createSlice({
  name: 'housekeepers',
  initialState,
  reducers: {
    assignRoomToHousekeeper(state, action: PayloadAction<{ housekeeperId: string; roomId: string }>) {
      const { housekeeperId, roomId } = action.payload;
      const housekeeper = state.housekeepers.find((h) => h.id === housekeeperId);
      if (housekeeper) {
        housekeeper.assignedRooms.push(roomId);
      }
    },
    clearAssignments(state) {
        for (const housekeeper of state.housekeepers) {
          housekeeper.assignedRooms = [];
        }
    },
    resetAssignments(state) {
      state.housekeepers.forEach(housekeeper => {
        housekeeper.assignedRooms = [];
      });
    }
  },
});

export const { assignRoomToHousekeeper, clearAssignments, resetAssignments } = housekeepersSlice.actions;
export default housekeepersSlice.reducer;
