import { Component, Inject } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TestSuitesService } from '@services';
import { TestSuite, TestModule, TestCase } from '@models';
import { DialogType, Priority } from './../../../../enums';

interface IDialogData {
    title: string;
    type: DialogType;
}

@Component({
    selector: 'create-dialog',
    templateUrl: 'create-dialog.component.html',
})
export class CreateDialog {
    title: string;
    type: DialogType;
    payload: any;
    testSuites: TestSuite[];
    priorityOptions = Priority;

    constructor(
        private testSuitesService: TestSuitesService,
        public dialogRef: MatDialogRef<CreateDialog>,
        @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
        this.title = data.title;
        this.type = data.type;
        this.payload = {};
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.priorityOptions
        if (this.type === 'test-run') {
            this.testSuitesService
                .getTestSuites()
                .subscribe(testSuites => {
                    this.testSuites = testSuites;
                });
        }
    }

}