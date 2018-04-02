import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuitesService, HandleErrorService } from '@services';
import { TestSuite, TestRun } from '@models';
import { DialogType } from './../../../../../enums';
import { ToastrService } from 'ngx-toastr';

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
        private toastr: ToastrService,
        private handleErrorService: HandleErrorService,
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
            }, error => {
                this.handleErrorService.handleError(error);
            });
    }

    createTestRunForm() {
        this.testRunForm = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            testSuiteId: null,
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
