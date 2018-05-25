import { FilterPipe } from './filter.pipe';
import { TestCase } from '@models';

describe('FilterPipe', () => {
  let items: any[];
  let filterPipe: FilterPipe;

  beforeEach(() => {
    filterPipe = new FilterPipe();
    items = [
      {
        description: 'One'
      },
      {
        description: 'Two'
      },
      {
        description: 'Three'
      },
      {
        description: 'Four'
      }
    ]
  })

  it('Returns One Item From The List', () => {
    const result = filterPipe.transform(items, 'One');

    expect(result.length).toEqual(1);
  });

  it('Find Item With Matching Description', () => {
    const result = filterPipe.transform(items, 'One')[0].description;

    expect(result).toBe('One');
  });

  it('Find Items with "o"', () => {
    const result = filterPipe.transform(items, 'o');

    expect(result).toContain({ description: 'One' });
    expect(result).toContain({ description: 'Two' });
    expect(result).toContain({ description: 'Four' });
  });

  it('Find With All Lowercase', () => {
    const result = filterPipe.transform(items, 'two')[0].description;

    expect(result).toBe('Two');
  });

  it('Find With All Uppercase', () => {
    const result = filterPipe.transform(items, 'TWO')[0].description;

    expect(result).toBe('Two');
  });
});
