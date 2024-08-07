import React from 'react';
import { Card, DonutChart, List, ListItem, Title } from '@tremor/react';

const data = [
  {
    "mainKadDesc": "ΥΠΗΡΕΣΙΕΣ ΧΡΗΜΑΤΙΣΤΗ Η ΜΕΣΙΤΗ ΧΡΗΜΑΤΙΣΤΗΡΙΟΥ ΑΞΙΩΝ",
    "totalPublic": 13840244792.32,
    "totalEFKA": 531372.66,
    "total": 13840776164.98,
    "count": 4
  },
  {
    "mainKadDesc": "ΥΠΗΡΕΣΙΕΣ ΠΡΟΓΡΑΜΜΑΤΙΣΜΕΝΩΝ ΕΝΑΕΡΙΩΝ ΜΕΤΑΦΟΡΩΝ ΕΠΙΒΑΤΩΝ",
    "totalPublic": 2374584441.37,
    "totalEFKA": 0,
    "total": 2374584441.37,
    "count": 1
  },
  {
    "mainKadDesc": "ΧΟΝΔΡΙΚΟ ΕΜΠΟΡΙΟ ΣΥΣΚΕΥΩΝ ΚΙΝΗΤΗΣ ΤΗΛΕΦΩΝΙΑΣ ΚΑΙ ΑΝΤΑΛΛΑΚΤΙΚΩΝ ΤΟΥΣ",
    "totalPublic": 2249635193.1899996,
    "totalEFKA": 0,
    "total": 2249635193.1899996,
    "count": 11
  },
  {
    "mainKadDesc": "ΚΑΤΑΣΚΕΥΗ ΜΕΡΩΝ ΚΑΙ ΕΞΑΡΤΗΜΑΤΩΝ Π.Δ.Κ.Α., ΓΙΑ ΜΗΧΑΝΟΚΙΝΗΤΑ ΟΧΗΜΑΤΑ",
    "totalPublic": 1268580191.81,
    "totalEFKA": 3420857.06,
    "total": 1272001048.87,
    "count": 2
  },
  {
    "mainKadDesc": "ΝΑΥΠΗΓΗΣΗ ΠΛΟΙΩΝ ΚΑΙ ΠΛΩΤΩΝ ΚΑΤΑΣΚΕΥΩΝ",
    "totalPublic": 974881745.6800001,
    "totalEFKA": 60466642.22,
    "total": 1035348387.9,
    "count": 7
  },
  {
    "mainKadDesc": "ΥΠΗΡΕΣΙΕΣ ΔΙΚΤΥΟΥ ΤΗΛΕΟΡΑΣΗΣ ΕΘΝΙΚΗΣ ΕΜΒΕΛΕΙΑΣ, ΕΚΤΟΣ ΑΠΟ ΤΙΣ ΔΡΑΣΤΗΡΙΟΤΗΤΕΣ ΕΜΠΟΡΙΚΟΥ ΧΑΡΑΚΤΗΡΑ",
    "totalPublic": 562892109.0799999,
    "totalEFKA": 30387546.47,
    "total": 593279655.55,
    "count": 2
  },
  {
    "mainKadDesc": "ΑΣΦΑΛΕΙΕΣ ΕΚΤΟΣ ΑΠΟ ΤΙΣ ΑΣΦΑΛΕΙΕΣ ΖΩΗΣ",
    "totalPublic": 534604230.95,
    "totalEFKA": 7171493.559999999,
    "total": 541775724.51,
    "count": 8
  },
  {
    "mainKadDesc": "ΧΟΝΔΡΙΚΟ ΕΜΠΟΡΙΟ ΑΛΛΩΝ ΥΓΡΩΝ ΚΑΙ ΑΕΡΙΩΝ ΚΑΥΣΙΜΩΝ ΚΑΙ ΣΥΝΑΦΩΝ ΠΡΟΪΟΝΤΩΝ",
    "totalPublic": 420261051.07,
    "totalEFKA": 311960.61,
    "total": 420573011.68,
    "count": 4
  },
  {
    "mainKadDesc": "ΧΟΝΔΡΙΚΟ ΕΜΠΟΡΙΟ ΗΛΕΚΤΡΟΝΙΚΩΝ ΥΠΟΛΟΓΙΣΤΩΝ, ΠΕΡΙΦΕΡΕΙΑΚΟΥ ΕΞΟΠΛΙΣΜΟΥ ΥΠΟΛΟΓΙΣΤΩΝ ΚΑΙ ΛΟΓΙΣΜΙΚΟΥ",
    "totalPublic": 406870891.01,
    "totalEFKA": 8920222.55,
    "total": 415791113.55999994,
    "count": 36
  },
  {
    "mainKadDesc": "ΥΠΗΡΕΣΙΕΣ ΠΡΟΒΟΛΗΣ ΑΘΛΗΤΙΚΩΝ ΕΚΔΗΛΩΣΕΩΝ ΚΑΙ ΨΥΧΑΓΩΓΙΚΩΝ ΑΘΛΗΤΙΚΩΝ ΕΚΔΗΛΩΣΕΩΝ",
    "totalPublic": 402737783.72,
    "totalEFKA": 4589420.25,
    "total": 407327203.96999997,
    "count": 4
  }
];

const colors = [
  'cyan', 'blue', 'indigo', 'violet', 'fuchsia',
  'pink', 'rose', 'orange', 'amber', 'yellow'
];

const valueFormatter = (number) => 
  `€${Intl.NumberFormat('el-GR').format(number.toFixed(0))}`;

const TopTenDonutChart = () => {
  const totalSum = data.reduce((sum, item) => sum + item.total, 0);
  
  const chartData = data.map((item, index) => ({
    name: item.mainKadDesc.length > 45 ? item.mainKadDesc.substring(0, 45) + '...' : item.mainKadDesc,
    value: item.total,
    share: ((item.total / totalSum) * 100).toFixed(1) + '%',
    color: `bg-${colors[index]}-500`,
    count: item.count
  }));

  return (
    <Card className="max-w-lg mx-auto">
      <Title>Οι 10 Κορυφαίοι ΚΑΔ σε Συνολικά Χρέη</Title>
      <DonutChart
        className="mt-6"
        data={chartData}
        category="value"
        index="name"
        valueFormatter={valueFormatter}
        colors={colors}
      />
      <Title className="mt-8">Λεπτομέρειες Δραστηριοποίησης</Title>
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
              <span className="rounded-tremor-small bg-tremor-background-subtle px-1.5 py-0.5 text-tremor-label font-medium">
                Συν:{item.count}
              </span>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default TopTenDonutChart;