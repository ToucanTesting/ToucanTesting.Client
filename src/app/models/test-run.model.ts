import { Base, TestSuite } from '@models';

export class TestRun extends Base {
    id: number;
    name: string;
    testSuite: TestSuite;
    testSuiteId?: number;
}
