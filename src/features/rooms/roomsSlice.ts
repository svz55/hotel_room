import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Room } from '@/types';

interface RoomsState {
  rooms: Room[];
}

const generateRooms = (): Room[] => {
  const rooms: Room[] = [];
  const floors = 7;
  const entrances = 3;
  const roomsPerEntrancePerFloor = 5; // 5 номеров на этаже в каждом подъезде

  const roomTypes = [
    { type: 'Студия', capacity: 1, designation: 'Студия 1м' },
    { type: 'ПК', capacity: 2, designation: 'ПК-2' },
    { type: 'ПК', capacity: 4, designation: 'ПК-4' },
    { type: 'ПК', capacity: 5, designation: 'ПК-5' },
    { type: 'ПК', capacity: 6, designation: 'ПК-6' },
  ];

  for (let floor = 1; floor <= floors; floor++) {
    for (let entrance = 1; entrance <= entrances; entrance++) {
      for (let i = 0; i < roomsPerEntrancePerFloor; i++) {
        const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
        const roomNumber = floor * 100 + (entrance - 1) * roomsPerEntrancePerFloor + i + 1;

        const room: Room = {
          id: `${floor}-${entrance}-${roomNumber}`,
          floor,
          entrance,
          number: roomNumber,
          ...roomType,
          status: Math.random() > 0.5 ? 'clean' : 'dirty',
          assignedTo: null,
        };
        rooms.push(room);
      }
    }
  }
  return rooms;
};

const initialState: RoomsState = {
  rooms: generateRooms(),
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