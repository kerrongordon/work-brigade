import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteFormComponent } from './delete-form.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [DeleteFormComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [DeleteFormComponent]
})
export class DeleteFormModule { }
