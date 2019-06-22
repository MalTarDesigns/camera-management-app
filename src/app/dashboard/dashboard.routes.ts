import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentListComponent } from './components/assignment-list/assignment-list.component';
import { AssignmentCreateComponent } from './components/assignment-create/assignment-create.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentListComponent
  },
  {
    path: 'create',
    component: AssignmentCreateComponent
  },
  {
    path: 'edit/:assignmentId',
    component: AssignmentCreateComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutes {}
