import { EventsModule } from './events.module';

describe('EventsModule', () => {
  let eventModule: EventsModule;

  beforeEach(() => {
    eventModule = new EventsModule();
  });

  it('should create an instance', () => {
    expect(eventModule).toBeTruthy();
  });
});
