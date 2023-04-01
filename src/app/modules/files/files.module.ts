import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilesComponent } from './components/files/files.component';
import { FilesRoutingModule } from './files.routing';
// PrimeNG modules
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TreeModule } from 'primeng/tree';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FilesRoutingModule,
    InputTextModule,
    TreeModule,
    ButtonModule,
    ProgressSpinnerModule,
  ],
  exports: [FilesComponent],
})
export class FilesModule {}
