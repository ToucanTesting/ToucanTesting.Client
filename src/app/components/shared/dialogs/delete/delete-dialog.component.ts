import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuite, TestModule, TestCase } from '@models';
import { DialogType, Priority } from './../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    isConfirmed: boolean;
}

@Component({
    selector: 'delete-dialog',
    templateUrl: 'delete-dialog.component.html',
})
export class DeleteDialogComponent {
    title: string;

    constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
