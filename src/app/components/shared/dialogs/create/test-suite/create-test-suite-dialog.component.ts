import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuite } from '@models';
import { DialogType } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    testSuite?: TestSuite;
}

@Component({
    selector: 'create-test-suite-dialog',
    templateUrl: './create-test-suite-dialog.component.html',
})
export class CreateTestSuiteDialogComponent {
    testSuite: TestSuite;
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
        if (data.testSuite) {
            this.testSuite = data.testSuite;
            this.setTestSuiteForm(data.testSuite);
        }
    }

    createTestSuiteForm() {
        this.testSuiteForm = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]
        });
    }

    setTestSuiteForm(values) {
        this.testSuiteForm.setValue({
            name: values.name
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
