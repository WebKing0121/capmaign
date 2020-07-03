import { ContentModule } from './content.module';

describe('ContentModule', () => {
  let automationModule: ContentModule;

  beforeEach(() => {
    automationModule = new ContentModule();
  });

  it('should create an instance', () => {
    expect(automationModule).toBeTruthy();
  });
});
