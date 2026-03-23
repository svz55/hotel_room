export interface Room {
  id: string;
  floor: number;
  number: number;
  capacity: number;
  status: 'clean' | 'dirty' | 'assigned';
  assignedTo?: string | null;
}

export interface Housekeeper {
  id: string;
  name: string;
  workloadCapacity: number;
  assignedRooms: string[];
  color: string;
}
