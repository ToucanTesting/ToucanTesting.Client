import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuitesService } from '@services';
import { TestSuite, TestRun } from '@models';
import { DialogType } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    payload?: TestRun;
}

@Component({
    selector: 'create-test-run-dialog',
    templateUrl: './create-test-run-dialog.component.html',
})
export class CreateTestRunDialogComponent {
    title: string;
    type: DialogType;
    testSuites: TestSuite[];
    testRunForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private testSuitesService: TestSuitesService,
        public dialogRef: MatDialogRef<CreateTestRunDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.type = data.type;
        this.createTestRunForm();
    }

    ngOnInit() {
        this.testSuitesService
            .getTestSuites()
            .subscribe(testSuites => {
                this.testSuites = testSuites;
            });
    }

    createTestRunForm() {
        this.testRunForm = this.fb.group({
            name: null,
            testSuiteId: null,
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
