export class Event {
  id: number;
  eventName: string;
  eventSubject: string;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: null | string;
  displayName: null | string;
  fromAddressId: number;
  replyAddressId: number;
  eventEndTime: null | string;
  location: string;
  eventBody: null | string;
  isDeleted: boolean;
  deleterUserId: null | number;
  deletionTime: null | string;
  lastModificationTime: null | string;
  lastModifierUserId: null | number;
  creationTime: string;
  creatorUserId: null | number;
}
