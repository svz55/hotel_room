import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '../features/rooms/roomsSlice';
import housekeepersReducer from '../features/housekeepers/housekeepersSlice';
import assignmentsReducer from '../features/assignments/assignmentsSlice';

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    housekeepers: housekeepersReducer,
    assignments: assignmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
