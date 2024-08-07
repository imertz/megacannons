import React from 'react';
import { Card, DonutChart, List, ListItem, Title } from '@tremor/react';

const data = [
  {
    "area": "ΑΘΗΝΑ",
    "count": 2963,
    "totalPublic": 34109486434.61001,
    "totalEFKA": 1658228383.850001,
    "total": 35767714818.45987
  },
  {
    "area": "ΧΑΛΑΝΔΡΙ",
    "count": 276,
    "totalPublic": 2833051721.3900046,
    "totalEFKA": 105049457.80000001,
    "total": 2938101179.190001
  },
  {
    "area": "ΕΥΟΣΜΟΣ ΘΕΣΣΑΛΟΝΙΚΗΣ",
    "count": 61,
    "totalPublic": 1348904848.7799995,
    "totalEFKA": 13067325.080000002,
    "total": 1361972173.8599992
  },
  {
    "area": "ΑΛΙΜΟΣ",
    "count": 109,
    "totalPublic": 1365549391.310001,
    "totalEFKA": 109420089.66000001,
    "total": 1474969480.970001
  },
  {
    "area": "ΠΕΙΡΑΙΑΣ",
    "count": 755,
    "totalPublic": 5260881223.979992,
    "totalEFKA": 420654678.8999999,
    "total": 5681535902.880001
  },
  {
    "area": "ΧΑΙΔΑΡΙ",
    "count": 73,
    "totalPublic": 1131788929.1599998,
    "totalEFKA": 89191275.08999996,
    "total": 1220980204.25
  },
  {
    "area": "ΑΓ ΑΝΑΡΓΥΡΟΙ",
    "count": 60,
    "totalPublic": 1345997703.2000003,
    "totalEFKA": 18414988.49,
    "total": 1364412691.6900003
  },
  {
    "area": "ΜΕΓΑΡΑ",
    "count": 31,
    "totalPublic": 1320704862.1000004,
    "totalEFKA": 8130096.1,
    "total": 1328834958.2000005
  },
  {
    "area": "ΘΕΣΣΑΛΟΝΙΚΗ",
    "count": 1143,
    "totalPublic": 6657485033.110003,
    "totalEFKA": 449249275.7300004,
    "total": 7106734308.839999
  },
  {
    "area": "ΠΕΡΙΣΤΕΡΙ",
    "count": 363,
    "totalPublic": 1703173501.3800008,
    "totalEFKA": 181337028.7300002,
    "total": 1884510530.1100008
  }
];

const colors = [
  'cyan', 'blue', 'indigo', 'violet', 'fuchsia',
  'pink', 'rose', 'orange', 'amber', 'yellow'
];

const valueFormatter = (number) => 
  `€${Intl.NumberFormat('el-GR').format(number.toFixed(0))}`;

const AreaDonutChart = () => {
  const totalSum = data.reduce((sum, item) => sum + item.total, 0);
  
  const chartData = data.map((item, index) => ({
    name: item.area,
    value: item.total,
    count: item.count,
    share: ((item.total / totalSum) * 100).toFixed(1) + '%',
    color: `bg-${colors[index]}-500`
  }));

  return (
    <Card className="max-w-md mx-auto">
      <Title>Κατανομή Ανά Δήμο</Title>
      <DonutChart
        className="mt-6"
        data={chartData}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={colors}
      />
      <Title className="mt-8">Λεπτομέρειες</Title>
      <List className="mt-4">
        {chartData.map((item) => (
          <ListItem key={item.name} className="space-x-2">
            <div className="flex items-center space-x-2 truncate">
              <span
                className={`${item.color} h-2.5 w-2.5 rounded-sm`}
                aria-hidden={true}
              />
              <span className="truncate">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">
                {valueFormatter(item.value)}
              </span>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium">
                {item.share}
              </span>
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium">                (Συν:{item.count})
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default AreaDonutChart;