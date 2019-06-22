import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const cameraAssignments = [
      {
        id: 1,
        cameraId: 11,
        vehicleId: 111,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 2,
        cameraId: 22,
        vehicleId: 222,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 3,
        cameraId: 33,
        vehicleId: 333,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 4,
        cameraId: 44,
        vehicleId: 444,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 5,
        cameraId: 55,
        vehicleId: 555,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 6,
        cameraId: 66,
        vehicleId: 666,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 7,
        cameraId: 77,
        vehicleId: 777,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 8,
        cameraId: 88,
        vehicleId: 888,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 9,
        cameraId: 99,
        vehicleId: 999,
        dateCreated: new Date(2019, 4, 24),
        deleted: false
      },
      {
        id: 10,
        cameraId: 1010,
        vehicleId: 101010,
        dateCreated: new Date(2019, 4, 24),
        deleted: true
      }
    ];

    const cameras = [
      {
        id: 11,
        deviceNo: 12343
      },
      {
        id: 22,
        deviceNo: 14527
      },
      {
        id: 33,
        deviceNo: 14724
      },
      {
        id: 44,
        deviceNo: 12473
      },
      {
        id: 55,
        deviceNo: 14323
      },
      {
        id: 66,
        deviceNo: 13523
      },
      {
        id: 77,
        deviceNo: 12253
      },
      {
        id: 88,
        deviceNo: 91263
      },
      {
        id: 99,
        deviceNo: 45263
      },
      {
        id: 1010,
        deviceNo: 48763
      },
      {
        id: 1111,
        deviceNo: 45678
      }
    ];

    const vehicles = [
      {
        id: 111,
        name: 'sprinter'
      },
      {
        id: 222,
        name: 'honda'
      },
      {
        id: 333,
        name: 'murano'
      },
      {
        id: 444,
        name: 'jeep'
      },
      {
        id: 555,
        name: 'altima'
      },
      {
        id: 666,
        name: 'rouge'
      },
      {
        id: 777,
        name: 'acura'
      },
      {
        id: 888,
        name: 'mercedes'
      },
      {
        id: 999,
        name: 'audi'
      },
      {
        id: 101010,
        name: 'suburban'
      },
      {
        id: 111111,
        name: 'new car'
      }
    ];

    return {
      cameraAssignments,
      cameras,
      vehicles
    };
  }
}
