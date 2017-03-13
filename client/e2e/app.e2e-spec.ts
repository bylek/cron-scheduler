import { CronPage } from './app.po';

describe('cron App', () => {
  let page: CronPage;

  beforeEach(() => {
    page = new CronPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
