import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'kgp-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteFormComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<DeleteFormComponent>) { }

  ngOnInit() {
  }

  delete() {
    return this.bottomSheetRef.dismiss(true);
  }

}
