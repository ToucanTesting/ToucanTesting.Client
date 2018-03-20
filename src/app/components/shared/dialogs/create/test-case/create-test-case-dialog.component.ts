import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuitesService } from '@services';
import { TestSuite, TestModule, TestCase } from '@models';
import { DialogType, Priority } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    payload?: TestCase;
}

@Component({
    selector: 'create-test-case-dialog',
    templateUrl: './create-test-case-dialog.component.html',
})
export class CreateTestCaseDialogComponent {
    title: string;
    type: DialogType;
    testSuites: TestSuite[];
    priorityOptions = Priority;
    testCaseForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private testSuitesService: TestSuitesService,
        public dialogRef: MatDialogRef<CreateTestCaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.type = data.type;
        this.createTestCaseForm();
        if (data.payload) { this.setTestCaseForm(data.payload); }
    }

    createTestCaseForm() {
        this.testCaseForm = this.fb.group({
            description: '',
            isAutomated: false,
            priority: 0,
            bugId: null
        })
    }

    printTestCase(testCase) {
        console.log(testCase);
    }

    setTestCaseForm(values) {
        this.testCaseForm.setValue({
            description: values.description,
            isAutomated: values.isAutomated,
            priority: values.priority,
            bugId: values.bugId
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        if (this.type === 'test-run') {
            this.testSuitesService
                .getTestSuites()
                .subscribe(testSuites => {
                    this.testSuites = testSuites;
                });
        }
    }

}
