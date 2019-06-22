import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatPaginator } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = [
    'id',
    'cameraDevice',
    'vehicleName',
    'dateCreated',
    'actions'
  ];
  dataSource = new MatTableDataSource();
  private cameras: any;
  private vehicles: any;

  constructor(private cameraAssignmentService: CameraAssignmentService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.cameraAssignmentService.getCameras().subscribe(
      cameras => {
        this.cameras = cameras;
      },
      (err: HttpErrorResponse) => console.error(err)
    );

    this.cameraAssignmentService.getVehicles().subscribe(
      vehicles => {
        this.vehicles = vehicles;
      },
      (err: HttpErrorResponse) => console.error(err)
    );
    this.getAllAssignments();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllAssignments() {
    this.cameraAssignmentService.getAssignments().subscribe(
      (data: any[]) => {
        const activeAssignments = data
          .filter(assignment => assignment.deleted === false)
          .map(a => {
            this.vehicles.map(vehicle => {
              if (a.vehicleId === vehicle.id) {
                a.vehicleName = vehicle.name;
              }
            });
            this.cameras.map(camera => {
              if (a.cameraId === camera.id) {
                a.cameraDevice = camera.deviceNo;
              }
            });
            return a;
          });
        console.log(activeAssignments);
        this.dataSource.data = activeAssignments;
      },
      (err: HttpErrorResponse) => console.error(err)
    );
  }

  createAssignment(assignment: ICameraAssignment) {
    this.cameraAssignmentService.createAssignment(assignment).subscribe(
      res => {
        console.log('Assignment created');
      },
      (err: HttpErrorResponse) => console.error(err)
    );
  }

  // Set delete flag to selected assignment
  deleteAssignment(assignment: ICameraAssignment) {
    assignment.deleted = true;
    const c = confirm('Are you sure you want to delete this assignment?');
    if (c === true) {
      this.cameraAssignmentService.updateAssignment(assignment).subscribe(
        res => {
          this.getAllAssignments();
          console.log('Assignment updated: ', res);
        },
        (err: HttpErrorResponse) => console.error(err)
      );
      // this.cameraAssignmentService
      //   .deleteAssignment(assignmentId)
      //   .subscribe(res => {
      //     console.log('Assignment deleted: ', res);
      //     this.deleteRowDataTable(
      //       assignmentId,
      //       'id',
      //       this.paginator,
      //       this.dataSource
      //     );
      //   });
    } else {
      return;
    }
  }

  //// Delete row from data table.
  // private deleteRowDataTable(
  //   recordId: number,
  //   idColumn: string,
  //   paginator: any,
  //   dataSource: any
  // ) {
  //   const dsData = dataSource.data;
  //   const itemIndex = dsData.findIndex(obj => obj[idColumn] === recordId);
  //   dataSource.data.splice(itemIndex, 1);
  //   dataSource.paginator = paginator;
  // }
}
