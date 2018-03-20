import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuite } from '@models';
import { DialogType } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    payload?: TestSuite;
}

@Component({
    selector: 'create-test-suite-dialog',
    templateUrl: './create-test-suite-dialog.component.html',
})
export class CreateTestSuiteDialogComponent {
    title: string;
    type: DialogType;
    testSuiteForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateTestSuiteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.type = data.type;
        this.createTestSuiteForm();
    }

    createTestSuiteForm() {
        this.testSuiteForm = this.fb.group({
            name: null
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
