// File: src/pages/api/companies.js
import companies2022 from '../../data/nomika_2022.json';
import companies2023 from '../../data/nomika_2023.json';

export async function get({ request }) {
  const url = new URL(request.url);
  const year = url.searchParams.get('year') || '2023';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '50');
  const sortBy = url.searchParams.get('sortBy') || 'name';
  const sortOrder = url.searchParams.get('sortOrder') || 'asc';
  const search = url.searchParams.get('search') || '';
  const debtFilter = url.searchParams.get('debtFilter') || 'all';

  const companies = year === '2022' ? companies2022 : companies2023;

  // Filter
  let filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(search.toLowerCase()) &&
    (debtFilter === 'all' ||
      (debtFilter === 'high' && company.totalPublic > 1000000000) ||
      (debtFilter === 'medium' && company.totalPublic > 500000000 && company.totalPublic <= 1000000000) ||
      (debtFilter === 'low' && company.totalPublic <= 500000000))
  );

  // Sort
  filteredCompanies.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  return new Response(JSON.stringify({
    companies: paginatedCompanies,
    totalPages: Math.ceil(filteredCompanies.length / limit),
    totalItems: filteredCompanies.length
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}