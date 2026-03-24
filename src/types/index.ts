export interface Room {
  id: string;
  floor: number;
  entrance: number;
  number: number;
  type: string;
  designation: string;
  capacity: number; // Corresponds to the number of beds/people
  status: 'clean' | 'dirty' | 'assigned';
  assignedTo: string | null;
}

export interface Housekeeper {
  id: string;
  name: string;
  workloadCapacity: number;
  assignedRooms: string[];
  color: string;
}
