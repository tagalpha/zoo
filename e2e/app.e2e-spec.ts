import { AppZooPage } from './app.po';

describe('app-zoo App', () => {
  let page: AppZooPage;

  beforeEach(() => {
    page = new AppZooPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
