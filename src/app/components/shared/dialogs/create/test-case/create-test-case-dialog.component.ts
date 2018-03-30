import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuitesService, TestModulesService } from '@services';
import { TestSuite, TestModule, TestCase } from '@models';
import { DialogType, Priority } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    payload?: TestCase;
    testSuiteId?: number;
}

@Component({
    selector: 'create-test-case-dialog',
    templateUrl: './create-test-case-dialog.component.html',
})
export class CreateTestCaseDialogComponent {
    testSuiteId: number;
    testModules: TestModule[];
    title: string;
    priorityOptions = Priority;
    testCaseForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private testModulesService: TestModulesService,
        public dialogRef: MatDialogRef<CreateTestCaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.createTestCaseForm();
        if (data.payload) {
            this.setTestCaseForm(data.payload);
        }
        this.testSuiteId = (data.testSuiteId) ? data.testSuiteId : null;
    }

    createTestCaseForm() {
        this.testCaseForm = this.fb.group({
            testModuleId: null,
            description: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
            isAutomated: false,
            priority: Priority.Low
        })
    }


    setTestCaseForm(values) {
        this.testCaseForm.setValue({
            testModuleId: values.testModuleId,
            description: values.description,
            isAutomated: values.isAutomated,
            priority: values.priority
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        if (this.testSuiteId) {
            this.testModulesService
                .getTestModules(this.testSuiteId)
                .subscribe(testModules => {
                    this.testModules = testModules;
                });
        }
    }

}
