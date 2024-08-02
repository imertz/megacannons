let html;
function parseDebtTable(htmlContent) {
  // Function to extract table content
  function extractTableContent(html) {
    const tableStart = html.indexOf('<table id="debtors"');
    const tableEnd = html.indexOf('</table>', tableStart);
    return html.slice(tableStart, tableEnd + 8);
  }

  // Function to parse a row of data
  function parseRow(row) {
    const cells = row.match(/<td[^>]*>(.*?)<\/td>/g);
    if (!cells || cells.length !== 10) return null;

    const parseNumber = (str) => parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0;

    return {
      taxId: cells[0].replace(/<[^>]+>/g, '').trim(),
      name: cells[1].replace(/<[^>]+>/g, '').trim(),
      debtToTaxOffices: parseNumber(cells[2]),
      debtToCustoms: parseNumber(cells[3]),
      coCollectedGovernment: parseNumber(cells[4]),
      totalGovernmentDebt: parseNumber(cells[5]),
      debtToEfka: parseNumber(cells[6]),
      coCollectedEfka: parseNumber(cells[7]),
      totalEfkaDebt: parseNumber(cells[8]),
      remarks: cells[9].replace(/<[^>]+>/g, '').trim()
    };
  }

  // Extract table content
  const tableContent = extractTableContent(htmlContent);

  // Extract rows
  const rows = tableContent.match(/<tr>[\s\S]*?<\/tr>/g);

  // Parse each row and filter out null results
  const debtData = rows
    .slice(1) // Skip header row
    .map(parseRow)
    .filter(row => row !== null);

  // Return the debt data as a JSON string
  return JSON.stringify(debtData, null, 2);
}
// Usage example:
// const jsonData = parseDebtTable(htmlContent);
// console.log(jsonData);
async function getHtml() {
  if (!html) {
    html = await fetch('https://www.aade.gr/dl_assets/dos/ofeilfp2024_3_utf8.html').then(res => res.text());
  }
  return html;
}

async function main() {
  const htmlContent = await getHtml();
  const jsonData = parseDebtTable(htmlContent);
  console.log(jsonData);
}

main();
