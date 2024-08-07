import { Card, Title, BarChart, LineChart } from "@tremor/react";

function formatCurrency(amount) {
  return amount ? amount.toLocaleString('el-GR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }) : '-';
}
const CompanyCharts = ({ data2022, data2023 }) => {
  const publicDebtData = [
    {
      year: "2022",
      "Προς Εφορία": data2022?.debtToDOY,
      "Προς Τελωνεία": data2022?.debtToCustoms,
      "Συνεισπραττόμενα Δημοσίου": data2022?.coCollectedPublic,
    },
    {
      year: "2023",
      "Προς Εφορία": data2023?.debtToDOY,
      "Προς Τελωνεία": data2023?.debtToCustoms,
      "Συνεισπραττόμενα Δημοσίου": data2023?.coCollectedPublic,
    },
  ];

  const efkaDebtData = [
    {
      year: "2022",
      "Προς ΕΦΚΑ": data2022?.debtToEFKA,
      "Συνεισπραττόμενα ΕΦΚΑ": data2022?.coCollectedEFKA,
    },
    {
      year: "2023",
      "Προς ΕΦΚΑ": data2023?.debtToEFKA,
      "Συνεισπραττόμενα ΕΦΚΑ": data2023?.coCollectedEFKA,
    },
  ];

  const totalDebtData = [
    {
      year: "2022",
      "Χρέη Δημοσίου": data2022?.totalPublic,
      "Χρέη ΕΦΚΑ": data2022?.totalEFKA,
      "Συνολικά Χρέη": data2022?.totalPublic + data2022?.totalEFKA,
    },
    {
      year: "2023",
      "Χρέη Δημοσίου": data2023?.totalPublic,
      "Χρέη ΕΦΚΑ": data2023?.totalEFKA,
      "Συνολικά Χρέη": data2023?.totalPublic + data2023?.totalEFKA,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <Card>
        <Title>Ανάλυση Χρεών Προς Δημόσιο</Title>
        <BarChart
          className="mt-6"
          data={publicDebtData}
          index="year"
          categories={["Προς Εφορία", "Προς Τελωνεία", "Συνεισπραττόμενα Δημοσίου"]}
          colors={["blue", "teal", "amber"]}
          valueFormatter={(number) =>
            `${formatCurrency(number)}`
          }
          yAxisWidth={48}
        />
      </Card>

      <Card>
        <Title>Ανάλυση Χρεών Προς ΕΦΚΑ</Title>
        <BarChart
          className="mt-6"
          data={efkaDebtData}
          index="year"
          categories={["Προς ΕΦΚΑ", "Συνεισπραττόμενα ΕΦΚΑ"]}
          colors={["indigo", "violet"]}
          valueFormatter={(number) =>
           `${formatCurrency(number)}`
          }
          yAxisWidth={48}
        />
      </Card>

      <Card className="col-span-1 sm:col-span-2">
        <Title>Πορεία Συνολικού Χρέους</Title>
        <LineChart
          className="mt-6"
          data={totalDebtData}
          index="year"
          categories={["Χρέη Δημοσίου", "Χρέη ΕΦΚΑ", "Συνολικά Χρέη"]}
          colors={["emerald", "rose", "blue"]}
          valueFormatter={(number) =>
          `${formatCurrency(number)}`
          }
          yAxisWidth={48}
        />
      </Card>
    </div>
  );
};

export default CompanyCharts;
