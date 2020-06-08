import { CollaborateModule } from './collaborate.module';

describe('CollaborateModule', () => {
  let collaborateModule: CollaborateModule;

  beforeEach(() => {
    collaborateModule = new CollaborateModule();
  });

  it('should create an instance', () => {
    expect(collaborateModule).toBeTruthy();
  });
});
