import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CameraAssignmentService } from '../../services/camera-assignment.service';
import { MatPaginator } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.scss']
})
export class AssignmentListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns = [
    'id',
    'cameraDeviceNo',
    'vehicleName',
    'dateCreated',
    'actions'
  ];
  dataSource = new MatTableDataSource();
  private cameras: any;
  private vehicles: any;

  private cameraDeviceNoFilter = new FormControl();
  private vehicleNameFilter = new FormControl();
  private filterValues = { cameraDeviceNo: '', vehicleName: '' };
  private unsubscribe$ = new Subject();

  constructor(private cameraAssignmentService: CameraAssignmentService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.cameraDeviceNoFilter.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.filterValues.cameraDeviceNo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.vehicleNameFilter.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.filterValues.vehicleName = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    // custom filterPredicate function
    this.dataSource.filterPredicate = this.createFilter();

    this.cameraAssignmentService
      .getCameras()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        cameras => {
          this.cameras = cameras;
        },
        (err: HttpErrorResponse) => console.error(err)
      );

    this.cameraAssignmentService
      .getVehicles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        vehicles => {
          this.vehicles = vehicles;
        },
        (err: HttpErrorResponse) => console.error(err)
      );

    this.getAllAssignments();
  }

  // Set delete flag to selected assignment
  deleteAssignment(assignment: ICameraAssignment) {
    assignment.deleted = true;
    const c = confirm('Are you sure you want to delete this assignment?');
    if (c === true) {
      this.cameraAssignmentService
        .updateAssignment(assignment)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          res => {
            this.getAllAssignments();
            console.log('Assignment updated with delete flag');
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

  private createFilter() {
    const filterFunction = (data, filter): boolean => {
      const searchTerms = JSON.parse(filter);
      return (
        data.cameraDeviceNo.toString().indexOf(searchTerms.cameraDeviceNo) !==
          -1 && data.vehicleName.indexOf(searchTerms.vehicleName) !== -1
      );
    };
    return filterFunction;
  }

  private getAllAssignments() {
    this.cameraAssignmentService
      .getAssignments()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
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
                  a.cameraDeviceNo = camera.deviceNo;
                }
              });
              return a;
            });
          this.dataSource.data = activeAssignments;
        },
        (err: HttpErrorResponse) => console.error(err)
      );
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
