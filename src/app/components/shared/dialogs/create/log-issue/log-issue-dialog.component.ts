import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuite, TestModule, TestCase } from '@models';
import { DialogType, Priority } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    payload: TestCase;
}

@Component({
    selector: 'log-issue-dialog',
    templateUrl: './log-issue-dialog.component.html',
})
export class LogIssueDialogComponent {
    testSuiteId: number;
    title: string;
    priorityOptions = Priority;
    logIssueForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<LogIssueDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.createIssueForm();
        this.setIssueForm(data.payload);
    }

    createIssueForm() {
        this.logIssueForm = this.fb.group({
            bugId: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]
        })
    }


    setIssueForm(values) {
        this.logIssueForm.setValue({
            bugId: values.bugId
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
