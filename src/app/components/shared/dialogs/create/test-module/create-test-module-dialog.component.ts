import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestModule } from '@models';
import { DialogType } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    testModule?: TestModule;
}

@Component({
    selector: 'create-test-module-dialog',
    templateUrl: './create-test-module-dialog.component.html',
})
export class CreateTestModuleDialogComponent {
    title: string;
    type: DialogType;
    testModule: TestModule;
    testModuleForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateTestModuleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.type = data.type;
        this.createTestModuleForm();
        if (data.testModule) {
            this.testModule = data.testModule;
            this.setTestModuleForm(data.testModule);
        }

    }

    createTestModuleForm() {
        this.testModuleForm = this.fb.group({
            name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]
        });
    }

    setTestModuleForm(values) {
        this.testModuleForm.setValue({
            name: values.name
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
