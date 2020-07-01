
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
