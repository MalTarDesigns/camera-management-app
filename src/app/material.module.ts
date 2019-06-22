import { NgModule } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import * as fromMaterial from '@angular/material';

@NgModule({
  exports: [
    // FlexLayoutModule,
    fromMaterial.MatButtonModule,
    fromMaterial.MatTableModule,
    fromMaterial.MatCardModule,
    // fromMaterial.MatMenuModule,
    fromMaterial.MatToolbarModule,
    // fromMaterial.MatIconModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatSelectModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatPaginatorModule
  ],
  imports: [
    // FlexLayoutModule,
    fromMaterial.MatButtonModule,
    fromMaterial.MatTableModule,
    fromMaterial.MatCardModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatSelectModule,
    fromMaterial.MatInputModule,
    // fromMaterial.MatMenuModule,
    fromMaterial.MatToolbarModule,
    // fromMaterial.MatIconModule,
    fromMaterial.MatFormFieldModule,
    fromMaterial.MatInputModule,
    fromMaterial.MatPaginatorModule
  ]
})
export class MaterialModule {}
