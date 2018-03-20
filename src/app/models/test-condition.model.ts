import { Priority } from "../enums";
import { Base } from "@models";

export class TestCondition extends Base {
    id: number;
    testCaseId?: number;
    description: string;
    isEditing?: boolean;
};
