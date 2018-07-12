import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestModulesService, HandleErrorService, TestCasesService } from '@services';
import { TestModule, TestCase } from '@models';
import { DialogType, Priority } from './../../../../../enums';
import { ToastrService } from 'ngx-toastr';

interface IDialogData {
    title: string;
    type: DialogType;
    testModule: TestModule;
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
    testModule: TestModule;
    priorityOptions = Priority;
    testCaseForm: FormGroup;

    constructor(
        private toastr: ToastrService,
        private handleErrorService: HandleErrorService,
        private fb: FormBuilder,
        private testModulesService: TestModulesService,
        private testCasesService: TestCasesService,
        public dialogRef: MatDialogRef<CreateTestCaseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.testModule = data.testModule;
        this.createTestCaseForm();
        if (data.payload) {
            this.setTestCaseForm(data.payload);
        }
        this.testSuiteId = (data.testSuiteId) ? data.testSuiteId : null;
    }

    testCaseUniqueValidator(descriptionKey: string, testModule: TestModule) {
        return (group: FormGroup) => {
            let editingId = (this.data.payload) ? this.data.payload.id : null;
            let descriptionInput = group.controls[descriptionKey];
            const testCase = testModule.testCases.find(c => c.description === descriptionInput.value);
            
            if (!!testCase && testCase.isEnabled && testCase.id !== editingId) {
                return descriptionInput.setErrors({ testCaseUnique: true });
            }
            return null;
        };
    }

    createTestCaseForm() {
        this.testCaseForm = this.fb.group({
            testModuleId: null,
            description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            lastTested: null,
            automationId: [null, Validators.compose([Validators.minLength(4), Validators.maxLength(4)])],
            isAutomated: false,
            hasCriteria: false,
            priority: Priority.Low
        }, { validator: this.testCaseUniqueValidator('description', this.testModule) })
    }

    setTestCaseForm(values) {
        this.testCaseForm.setValue({
            testModuleId: values.testModuleId,
            description: values.description,
            lastTested: (values.lastTested) ? new Date(values.lastTested) : null,
            automationId: values.automationId,
            isAutomated: values.isAutomated,
            hasCriteria: values.hasCriteria,
            priority: values.priority
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    async ngOnInit() {
        if (this.testSuiteId) {
            this.testModulesService
                .getTestModules(this.testSuiteId)
                .subscribe(testModules => {
                    this.testModules = testModules;
                }, error => {
                    this.handleErrorService.handleError(error);
                });
        }

        if (this.testModule.testCases.length === 0) {
            this.testModule.testCases = await this.testCasesService.getTestCases(this.testModule).toPromise();
        }
    }

}
