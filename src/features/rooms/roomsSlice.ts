import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Room } from '@/types';

interface RoomsState {
  rooms: Room[];
}

const initialState: RoomsState = {
  rooms: [
    // Floor 1
    { id: '101', floor: 1, number: 1, capacity: 1, status: 'clean', assignedTo: null },
    { id: '102', floor: 1, number: 2, capacity: 2, status: 'dirty', assignedTo: null },
    { id: '103', floor: 1, number: 3, capacity: 3, status: 'clean', assignedTo: null },
    { id: '104', floor: 1, number: 4, capacity: 4, status: 'dirty', assignedTo: null },
    { id: '105', floor: 1, number: 5, capacity: 5, status: 'clean', assignedTo: null },

    // Floor 2
    { id: '201', floor: 2, number: 1, capacity: 1, status: 'dirty', assignedTo: null },
    { id: '202', floor: 2, number: 2, capacity: 2, status: 'dirty', assignedTo: null },
    { id: '203', floor: 2, number: 3, capacity: 3, status: 'dirty', assignedTo: null },
    { id: '204', floor: 2, number: 4, capacity: 4, status: 'clean', assignedTo: null },
    { id: '205', floor: 2, number: 5, capacity: 5, status: 'clean', assignedTo: null },

    // Floor 3
    { id: '301', floor: 3, number: 1, capacity: 1, status: 'clean', assignedTo: null },
    { id: '302', floor: 3, number: 2, capacity: 2, status: 'dirty', assignedTo: null },
    { id: '303', floor: 3, number: 3, capacity: 3, status: 'clean', assignedTo: null },
    { id: '304', floor: 3, number: 4, capacity: 4, status: 'dirty', assignedTo: null },
    { id: '305', floor: 3, number: 5, capacity: 5, status: 'clean', assignedTo: null },

    // Floor 4
    { id: '401', floor: 4, number: 1, capacity: 1, status: 'dirty', assignedTo: null },
    { id: '402', floor: 4, number: 2, capacity: 2, status: 'clean', assignedTo: null },
    { id: '403', floor: 4, number: 3, capacity: 3, status: 'dirty', assignedTo: null },
    { id: '404', floor: 4, number: 4, capacity: 4, status: 'clean', assignedTo: null },
    { id: '405', floor: 4, number: 5, capacity: 5, status: 'dirty', assignedTo: null },

    // Floor 5
    { id: '501', floor: 5, number: 1, capacity: 1, status: 'clean', assignedTo: null },
    { id: '502', floor: 5, number: 2, capacity: 2, status: 'dirty', assignedTo: null },
    { id: '503', floor: 5, number: 3, capacity: 3, status: 'clean', assignedTo: null },
    { id: '504', floor: 5, number: 4, capacity: 4, status: 'dirty', assignedTo: null },
    { id: '505', floor: 5, number: 5, capacity: 5, status: 'clean', assignedTo: null },
  ].map(room => ({ ...room, assignedTo: null })),
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    updateRoomStatus(state, action: PayloadAction<{ id: string; status: Room['status']; assignedTo?: string | null }>) {
      const { id, status, assignedTo } = action.payload;
      const room = state.rooms.find((r) => r.id === id);
      if (room) {
        room.status = status;
        if (assignedTo !== undefined) {
          room.assignedTo = assignedTo;
        }
      }
    },
    markRoomsAsDirty(state, action: PayloadAction<string[]>) {
      action.payload.forEach(id => {
        const room = state.rooms.find(r => r.id === id);
        if (room) {
          room.status = 'dirty';
          room.assignedTo = null;
        }
      });
    },
    toggleRoomStatus(state, action: PayloadAction<string>) {
      const room = state.rooms.find((r) => r.id === action.payload);
      if (room && room.status !== 'assigned') {
        room.status = room.status === 'clean' ? 'dirty' : 'clean';
        if (room.status === 'dirty') {
          room.assignedTo = null;
        }
      }
    },
    resetRooms(state) {
      state.rooms.forEach(room => {
        room.status = 'clean';
        room.assignedTo = null;
      });
    }
  },
});

export const { updateRoomStatus, markRoomsAsDirty, toggleRoomStatus, resetRooms } = roomsSlice.actions;
export default roomsSlice.reducer;