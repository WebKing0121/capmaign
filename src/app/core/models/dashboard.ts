
export class BounceEmail {
  id: string;
  bounceType: string;
  emailAddress: string;
  messageId: string;
  subBounceType: string;
  // TODO: Remove later
  [name: string]: any;
}

export class TopPerformingCampaign {
  id: string;
  name: string;
  dateTime: string;
  sent: number;
  open: number;
  clicks: number;
  bounces: number;
  unsubscribe: number;
  // TODO: Remove later
  [name: string]: any;
}

export class RecentEvnet {
  id: string;
  name: string;
  dateTime: string;
  invited: number;
  registered: number;
  atteendees: number;
  feedback: string;
  unsubscribe: string;
  [name: string]: any;
}

export class RegistrationByCountry {
  id: string;
  country: string;
  sessions: number;
  pageviews: number;
}

export class RecentRegistration {
  id: string;
  name: string;
  phone: string;
  email: string;
  registered: string;
  registeredDate: string;
  source: string;
}
