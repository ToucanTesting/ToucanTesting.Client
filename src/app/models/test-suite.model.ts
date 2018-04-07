import { Base, TestModule } from '@models';

export class TestSuite extends Base {
    id: number;
    name: string;
    testModules: TestModule[];
}
