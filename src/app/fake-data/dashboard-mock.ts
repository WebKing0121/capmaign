import { BounceEmail, TopPerformingCampaign } from '@app-core/models/dashboard';

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
        show: false,
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
        show: false,
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
        show: false,
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
