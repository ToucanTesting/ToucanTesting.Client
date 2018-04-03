import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestIssue } from '@models';
import { DialogType, Priority } from './../../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
    payload: TestIssue;
}

@Component({
    selector: 'log-issue-dialog',
    templateUrl: './log-issue-dialog.component.html',
})
export class LogIssueDialogComponent {
    title: string;
    priorityOptions = Priority;
    logIssueForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<LogIssueDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.createIssueForm();
        if (data.payload) {
            this.setIssueForm(data.payload);
        }
    }

    createIssueForm() {
        this.logIssueForm = this.fb.group({
            reference: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
            description: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])]
        })
    }

    setIssueForm(values) {
        this.logIssueForm.setValue({
            reference: values.reference,
            description: values.description
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
