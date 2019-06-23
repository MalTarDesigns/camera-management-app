import { Component, OnInit } from '@angular/core';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assignment-create',
  templateUrl: './assignment-create.component.html',
  styleUrls: ['./assignment-create.component.scss']
})
export class AssignmentCreateComponent implements OnInit {
  createAssignmentFormGroup: FormGroup;
  assignment: ICameraAssignment;
  cameras: Observable<any>;
  vehicles: Observable<any>;
  private cameraIds: any;
  private vehicleIds: any;
  private assignmentId: number;
  private mode = 'create';

  constructor(
    private fb: FormBuilder,
    private cameraAssignmentService: CameraAssignmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.createAssignmentFormGroup = this.fb.group({
      cameraId: ['', Validators.required],
      vehicleId: ['', Validators.required]
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('assignmentId')) {
        this.mode = 'edit';
        this.assignmentId = parseInt(paramMap.get('assignmentId'), null);
        // Get Assignment by id
        this.cameraAssignmentService.getAssignment(this.assignmentId).subscribe(
          (assignment: any) => {
            this.assignment = {
              id: assignment.id,
              cameraId: assignment.cameraId,
              vehicleId: assignment.vehicleId,
              dateCreated: assignment.dateCreated,
              deleted: assignment.deleted
            };
            this.createAssignmentFormGroup.setValue({
              cameraId: this.assignment.cameraId,
              vehicleId: this.assignment.vehicleId
            });
          },
          (err: HttpErrorResponse) => console.error(err)
        ); // unsubscription is handled by angular httpClient
      } else {
        this.mode = 'create';
        this.assignmentId = null;
      }
    });

    // Get all active assignment
    this.cameraAssignmentService.getAssignments().subscribe(
      (assignments: any) => {
        const activeAssignments = assignments.filter(
          assignment => assignment.deleted === false
        );
        this.cameraIds = activeAssignments.map(
          assignment => assignment.cameraId
        );
        this.vehicleIds = activeAssignments.map(
          assignment => assignment.vehicleId
        );
      },
      (err: HttpErrorResponse) => console.error(err)
    );

    this.cameras = this.cameraAssignmentService.getCameras();
    this.vehicles = this.cameraAssignmentService.getVehicles();
  }

  onSubmit() {
    const form = this.createAssignmentFormGroup;
    const cameraAssignment: ICameraAssignment = {
      id: Math.floor(Math.random() * 101),
      cameraId: form.value.cameraId,
      vehicleId: form.value.vehicleId,
      dateCreated: new Date(),
      deleted: false
    };

    const assignmentExists = this.existingAssignmentCheck(cameraAssignment);

    if (assignmentExists) {
      return;
    }

    if (this.mode === 'create') {
      this.createAssignment(cameraAssignment);
    } else {
      this.updateAssignment(cameraAssignment);
    }
  }

  private createAssignment(cameraAssignment: ICameraAssignment) {
    this.cameraAssignmentService.createAssignment(cameraAssignment).subscribe(
      res => {
        this.router.navigate(['/']);
        console.log('Assignment created');
      },
      (err: HttpErrorResponse) => console.error(err)
    );
  }

  private updateAssignment(assignment: ICameraAssignment) {
    const newAssignment: ICameraAssignment = {
      id: this.assignmentId,
      cameraId: assignment.cameraId,
      vehicleId: assignment.vehicleId,
      dateCreated: assignment.dateCreated,
      deleted: assignment.deleted
    };

    this.cameraAssignmentService.updateAssignment(newAssignment).subscribe(
      res => {
        this.router.navigate(['/']);
        console.log('Assignment updated');
      },
      (err: HttpErrorResponse) => console.error(err)
    );
  }

  private existingAssignmentCheck(
    cameraAssignment: ICameraAssignment
  ): boolean {
    const cameraExists = this.cameraIds.includes(cameraAssignment.cameraId);
    const vehicleExists = this.vehicleIds.includes(cameraAssignment.vehicleId);

    const form = this.createAssignmentFormGroup;
    const formCameraId = form.value.cameraId;
    const formVehicleId = form.value.vehicleId;

    let currentCamera: boolean;
    let currentVehicle: boolean;

    if (this.assignment) {
      if (formCameraId === this.assignment.cameraId) {
        currentCamera = true;
      }
      if (formVehicleId === this.assignment.vehicleId) {
        currentVehicle = true;
      }
    }

    if (cameraExists && !currentCamera) {
      alert(
        'Camera already has an existing assignment. Please select another camera.'
      );
      return true;
    } else if (vehicleExists && !currentVehicle) {
      alert(
        'Vehicle already has an existing assignment. Please select another vehicle.'
      );
      return true;
    }

    return false;
  }
}
