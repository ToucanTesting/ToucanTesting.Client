import { Priority } from "../enums";
import { Base } from "@models";

export class TestAction extends Base {
    id: number;
    testCaseId?: number;
    description: string;
}