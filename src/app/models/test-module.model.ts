import { TestCase, TestResult, Base } from "@models";

export class TestModule extends Base {
    id: number;
    testSuiteId?: number;
    name: string;
    testCases: TestCase[];
    testResults: TestResult[];
}