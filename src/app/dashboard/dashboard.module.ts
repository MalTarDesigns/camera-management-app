import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { AssignmentCreateComponent } from './components/assignment-create/assignment-create.component';
import { DashboardRoutes } from './dashboard.routes';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssignmentListComponent, AssignmentCreateComponent],
  imports: [
    CommonModule,
    DashboardRoutes,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule {}
