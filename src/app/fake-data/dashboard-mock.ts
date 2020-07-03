import {
  BounceEmail,
  TopPerformingCampaign,
  RecentEvnet,
  RegistrationByCountry,
  RecentRegistration,
  GoogleLead
} from '@app-core/models/dashboard';

export const BounceEmailMockData: BounceEmail[] = [
  {
    id: '0',
    bounceType: 'Permanent',
    emailAddress: 'demo@demo.com',
    messageId: '010001618f22fb60-a1f938d6-5e91-439c-af2c-dc311a4d5768-000000',
    subBounceType: 'Suppressed'
  },
  {
    id: '2',
    bounceType: 'Permanent',
    emailAddress: 'kkulkarni@campaigntocash.com	',
    messageId: '010001618f22fb60-a1f938d6-5e91-439c-af2c-dc311a4d5768-000000',
    subBounceType: 'General'
  },
  {
    id: '3',
    bounceType: 'Permanent',
    emailAddress: 'kkulkarni@campaigntocash.com	',
    messageId: '010001618f22fb60-a1f938d6-5e91-439c-af2c-dc311a4d5768-000000',
    subBounceType: 'Suppressed'
  },
  {
    id: '4',
    bounceType: 'Permanent',
    emailAddress: '1kulkarni@campaigntocash.com',
    messageId: '010001618f22fb60-a1f938d6-5e91-439c-af2c-dc311a4d5768-000000',
    subBounceType: 'General'
  },
  {
    id: '5',
    bounceType: 'Permanent',
    emailAddress: 'gangadharmandala@yahoo.com',
    messageId: '010001618f22fb60-a1f938d6-5e91-439c-af2c-dc311a4d5768-000000',
    subBounceType: 'Suppressed'
  },
  {
    id: '6',
    bounceType: 'Permanent',
    emailAddress: 'venu_akkala@yahoo.co.in	',
    messageId: '010001618f22fb60-a1f938d6-5e91-439c-af2c-dc311a4d5768-000000',
    subBounceType: 'Suppressed'
  }
];

export const TopPerformingCampaignsMockData: TopPerformingCampaign[] = [
  {
    id: '0',
    name: 'Lipstick',
    dateTime: '2020/06/15 15:22:58',
    sent: 9,
    open: 4,
    clicks: 2,
    bounces: 3,
    unsubscribe: 1
  },
  {
    id: '1',
    name: 'Samir Camp',
    dateTime: '2020/06/17 15:22:58',
    sent: 3,
    open: 4,
    clicks: 1,
    bounces: 2,
    unsubscribe: 1
  }
];

export class EmailDashCrm {
  public static TopPerformingCampaignData = {
    chart: {
      height: 317,
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#64b5f6', '#1976d2', '#ef6c00', '#ffd54f', '#455a64'],
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    series: [{
      name: 'Sent',
      data: [TopPerformingCampaignsMockData[0].sent, TopPerformingCampaignsMockData[1].sent],
    }, {
      name: 'Open',
      data: [TopPerformingCampaignsMockData[0].open, TopPerformingCampaignsMockData[1].open],
    }, {
      name: 'Clicks',
      data: [TopPerformingCampaignsMockData[0].clicks, TopPerformingCampaignsMockData[1].clicks],
    }, {
      name: 'Bounce',
      data: [TopPerformingCampaignsMockData[0].bounces, TopPerformingCampaignsMockData[1].bounces],
    }, {
      name: 'Unsubscribe',
      data: [TopPerformingCampaignsMockData[0].unsubscribe, TopPerformingCampaignsMockData[1].unsubscribe],
    }],
    grid: {
      borderColor: '#e2e5e829',
    },
    xaxis: {
      categories: ['Lipstick', 'Samir Campaign'],
    },
    fill: {
      opacity: 0.85
    },
    tooltip: {
      marker: {
        show: false
      },
      y: {
        formatter: (val) => {
          return '' + val;
        }
      }
    }
  };

  public static SubscribersData = {
    chart: {
      height: 317,
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#64b5f6'],
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    series: [
      {
        data: [17, 2, 1, 1],
      }
    ],
    grid: {
      borderColor: '#e2e5e829',
    },
    xaxis: {
      categories: ['9-Jun', '17-Jun', '19-Jun', '22-Jun'],
    },
    fill: {
      opacity: 0.85
    },
    tooltip: {
      marker: {
        show: false
      },
      y: {
        formatter: (val) => {
          return '' + val;
        }
      }
    }
  };

  public static UnsubscribersData = {
    chart: {
      height: 317,
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#ffd54f'],
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    series: [
      {
        data: [1, 0, 0, 0],
      }
    ],
    grid: {
      borderColor: '#e2e5e829',
    },
    xaxis: {
      categories: ['9-Jun', '17-Jun', '19-Jun', '22-Jun'],
    },
    fill: {
      opacity: 0.85
    },
    tooltip: {
      marker: {
        show: false
      },
      y: {
        formatter: (val) => {
          return '' + val;
        }
      }
    }
  };
}

export class MobileDashCrm {
  public static TopPerformingMobileData = {
    chart: {
      height: 317,
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#64b5f6', '#1976d2'],
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    series: [{
      name: 'Open',
      data: [0, 1, 3, 2, 5, 7, 9],
    }, {
      name: 'Click',
      data: [0, 0, 0, 1, 1, 0, 0],
    }],
    grid: {
      borderColor: '#e2e5e829',
    },
    xaxis: {
      categories: [
        '11 April Event',
        '11 April Event',
        'Demo SMS',
        'EventQA1',
        'Summer Del-Goa 10 %offer',
        'test',
        'Website analysis campaign'
      ],
    },
    fill: {
      opacity: 0.85
    },
    tooltip: {
      marker: {
        show: false
      },
      y: {
        formatter: (val) => {
          return '' + val;
        }
      }
    }
  };
}

export const RecentEvnetMockData: RecentEvnet[] = [
  {
    id: '0',
    name: 'Webinar Event for Demo',
    dateTime: 'Nov 19th 2018 9:50:00 am',
    invited: 5,
    registered: 2,
    atteendees: 2,
    feedback: '',
    unsubscribe: ''
  },
  {
    id: '1',
    name: 'EventUATQA',
    dateTime: 'Nov 20th 2018 1:50:00 am',
    invited: 10,
    registered: 3,
    atteendees: 3,
    feedback: '',
    unsubscribe: ''
  },
  {
    id: '2',
    name: 'Event campaign UA 2',
    dateTime: 'Dec 21th 2018 5:50:00 am',
    invited: 8,
    registered: 4,
    atteendees: 4,
    feedback: '',
    unsubscribe: ''
  },
  {
    id: '3',
    name: 'Event campaign UA 1',
    dateTime: 'Dec 22th 2018 6:50:00 am',
    invited: 20,
    registered: 10,
    atteendees: 10,
    feedback: '',
    unsubscribe: ''
  },
  {
    id: '4',
    name: 'test Uat Event',
    dateTime: 'Dec 23th 2018 7:50:00 am',
    invited: 12,
    registered: 9,
    atteendees: 9,
    feedback: '',
    unsubscribe: ''
  },
];

export class EventDashCrm {
  public static EngagementDrivingChannelsData = {
    chart: {
      height: 400,
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['rgb(0, 168, 232)', '#ff0000'],
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    series: [{
      name: 'Registered',
      data: [110, 100, 50, 50, 20, 45, 85],
    }, {
      name: 'Attendees',
      data: [220, 350, 100, 90, 75, 125, 230],
    }],
    grid: {
      borderColor: '#e2e5e829',
    },
    xaxis: {
      categories: [],
    },
    fill: {
      opacity: 0.85
    },
    tooltip: {
      marker: {
        show: false
      },
      y: {
        formatter: (val) => {
          return '' + val;
        }
      }
    }
  };

  public static InvitedRegistrationsData = {
    chart: {
      stacked: true,
      height: 400,
      type: 'bar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#1976d2', '#64b5f6'],
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent']
    },
    series: [{
      name: 'Registrations',
      data: [1, 2, 0, 1, 6, 2, 1, 4],
    }, {
      name: 'Invited',
      data: [0, 5, 14, 5, 11, 20, 5, 8],
    }],
    grid: {
      borderColor: '#e2e5e829',
    },
    xaxis: {
      categories: [],
    },
    fill: {
      opacity: 0.85
    },
    tooltip: {
      marker: {
        show: false
      },
      y: {
        formatter: (val) => {
          return '' + val;
        }
      }
    }
  };
}

export const RegistrationByCountryMockData: RegistrationByCountry[] = [
  {
    id: '0',
    country: 'Canada',
    sessions: 670,
    pageviews: 300
  },
  {
    id: '1',
    country: 'India',
    sessions: 165,
    pageviews: 120
  },
  {
    id: '2',
    country: 'USA',
    sessions: 355,
    pageviews: 400
  },
  {
    id: '3',
    country: 'Canada',
    sessions: 670,
    pageviews: 300
  },
  {
    id: '4',
    country: 'India',
    sessions: 165,
    pageviews: 120
  },
  {
    id: '5',
    country: 'USA',
    sessions: 355,
    pageviews: 400
  },
  {
    id: '6',
    country: 'Canada',
    sessions: 670,
    pageviews: 300
  }
];

export const RecentRegistrationMockData: RecentRegistration[] = [
  {
    id: '0',
    name: 'John Doe',
    phone: '8806940077',
    email: 'ajay.kumar@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/24/2020 10:18:59 AM',
    source: ''
  },
  {
    id: '1',
    name: 'Urvashi Arora',
    phone: '919028492684',
    email: 'uarora@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/10/2020 11:24:24 AM	',
    source: ''
  },
  {
    id: '2',
    name: 'Prasad Undale',
    phone: '8806940077',
    email: 'ajay.kumar@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/24/2020 10:18:59 AM',
    source: ''
  },
  {
    id: '3',
    name: 'Manoj Ladha',
    phone: '919028492684',
    email: 'uarora@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/10/2020 11:24:24 AM	',
    source: ''
  },
  {
    id: '4',
    name: 'Samir Sahu',
    phone: '8806940077',
    email: 'ajay.kumar@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/24/2020 10:18:59 AM',
    source: ''
  },
  {
    id: '5',
    name: 'Nilesh Kurne',
    phone: '919028492684',
    email: 'nilesh.kurne@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/10/2020 11:24:24 AM	',
    source: ''
  },
  {
    id: '6',
    name: 'Urvashi Arora',
    phone: '8806940077',
    email: 'uarora@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/24/2020 10:18:59 AM',
    source: ''
  },
  {
    id: '7',
    name: 'Nilesh Kurne',
    phone: '919028492684',
    email: 'nilesh.kurne@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/10/2020 11:24:24 AM	',
    source: ''
  },
  {
    id: '8',
    name: 'Prasad Undale',
    phone: '8806940077',
    email: 'pundale@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/24/2020 10:18:59 AM',
    source: ''
  },
  {
    id: '9',
    name: 'Urvashi Arora',
    phone: '919028492684',
    email: 'uarora@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/10/2020 11:24:24 AM	',
    source: ''
  },
  {
    id: '10',
    name: 'John Doe',
    phone: '8806940077',
    email: 'ajay.kumar@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/24/2020 10:18:59 AM',
    source: ''
  },
  {
    id: '11',
    name: 'Urvashi Arora',
    phone: '919028492684',
    email: 'uarora@campaigntocash.com',
    registered: 'C2CWebinar2020',
    registeredDate: '4/10/2020 11:24:24 AM	',
    source: ''
  },
];

export const GoogleLeadMockData: GoogleLead[] = [
  {
    id: '0',
    name: 'C2C WebSite',
    title: 'C2CWeb2020',
    views: 200,
    source: 'dkdkeidkkdjskj',
    timeOnPage: '20hr 30min',
    firstName: 'Samir',
    lastName: 'Sahu',
    email: 'samir.sahu@camapaigntocash.com'
  },
  {
    id: '1',
    name: 'Camp',
    title: 'C2CWeb2020',
    views: 150,
    source: 'dkdkeidkkdjskj',
    timeOnPage: '10hr 30min',
    firstName: 'Jack',
    lastName: '',
    email: 'samir.sahu@camapaigntocash.com'
  },
  {
    id: '3',
    name: 'C2C WebSite',
    title: 'C2CWeb2020',
    views: 200,
    source: 'dkdkeidkkdjskj',
    timeOnPage: '20hr 30min',
    firstName: 'Tom',
    lastName: '',
    email: 'samir.sahu@camapaigntocash.com'
  }
];
