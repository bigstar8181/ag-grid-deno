import { pasteTrades } from '../actions/cars';

const mockTrade = {
  id: '0',
  entryId: '0'
};
describe('cars actions test suite', () => {
  it('car paste', () => {
    expect(pasteTrades([mockTrade])).toMatchSnapshot();
  });
});
