import { NgModule } from '@angular/core';
import * as fromMaterial from '@angular/material';

@NgModule({
  exports: [
    fromMaterial.MatButtonModule,
    fromMaterial.MatTableModule,
    fromMaterial.MatCardModule,
    fromMaterial.MatToolbarModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatSelectModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatPaginatorModule
  ],
  imports: [
    fromMaterial.MatButtonModule,
    fromMaterial.MatTableModule,
    fromMaterial.MatCardModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatSelectModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatToolbarModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatPaginatorModule
  ]
})
export class MaterialModule {}
