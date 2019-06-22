interface ICamera {
  id: number;
  deviceNo: number;
}

interface IVehicle {
  id: number;
  name: string;
}

interface ICameraAssignment {
  id: number;
  cameraId: number;
  vehicleId: number;
  dateCreated: Date;
  deleted: boolean;
}
