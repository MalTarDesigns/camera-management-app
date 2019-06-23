import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CameraAssignmentService {
  SERVER_URL = 'http://localhost:8080/api/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getAssignments() {
    return this.http.get(this.SERVER_URL + 'cameraAssignments');
  }

  getCameras() {
    return this.http.get(this.SERVER_URL + 'cameras');
  }

  getVehicles() {
    return this.http.get(this.SERVER_URL + 'vehicles');
  }

  getAssignment(assignmentId) {
    return this.http.get(
      `${this.SERVER_URL + 'cameraAssignments'}/${assignmentId}`
    );
  }

  createAssignment(assignment: ICameraAssignment) {
    return this.http.post(
      `${this.SERVER_URL + 'cameraAssignments'}`,
      assignment
    );
  }

  deleteAssignment(assignmentId: number) {
    return this.http.delete(
      `${this.SERVER_URL + 'cameraAssignments'}/${assignmentId}`
    );
  }

  updateAssignment(assignment: ICameraAssignment) {
    return this.http.put(
      `${this.SERVER_URL + 'cameraAssignments'}/${assignment.id}`,
      assignment,
      this.httpOptions
    );
  }
}
