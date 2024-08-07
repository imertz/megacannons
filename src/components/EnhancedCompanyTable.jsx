import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  Title,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TextInput,
  Select,
  SelectItem,
  Badge,
  Bold,
} from "@tremor/react";
import { ArrowUpDown, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { OramaClient } from "@oramacloud/client";

const EnhancedCompanyTable = ({ year }) => {
  const [sortColumn, setSortColumn] = useState("totalPublic");
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [deferredSearchTerm, setDeferredSearchTerm] = useState("");
  const [debtFilter, setDebtFilter] = useState("all");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 50;

  const client = new OramaClient({
    endpoint: 'https://cloud.orama.run/v1/indexes/nomika2023-qtw735',
    api_key: 'iHhGT92IYaCRjJ7ibbmK8xJYOJ0AtHPY'
  });

  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4 mb-4 flex-wrap gap-4">
      <Badge icon={ShieldCheck} color='emerald'><Bold>{totalItems}</Bold> συνολικά αποτελέσματα</Badge>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 border rounded-full disabled:opacity-50"
        >
          <ChevronLeft size={20} />
        </button>
        <span>
          Σελίδα {currentPage} από {totalPages}
        </span>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-full disabled:opacity-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        setDeferredSearchTerm(searchTerm);
      } else {
        setDeferredSearchTerm("");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const fetchData = useCallback(async () => {
    const cacheKey = `${deferredSearchTerm}-${debtFilter}-${sortColumn}-${sortDirection}-${currentPage}`;
    if (cache[cacheKey]) {
      setCompanies(cache[cacheKey].companies);
      setTotalItems(cache[cacheKey].count);
      return;
    }

    setLoading(true);
    try {
      const searchParams = {
        term: deferredSearchTerm,
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        sortBy: {
          property: sortColumn,
          order: sortDirection.toUpperCase()
        },
        mode: 'fulltext'
      };

      if (debtFilter !== 'all') {
        searchParams.where = {
          totalPublic: debtFilter === 'high' ? { gt: 1000000000 } :
                       debtFilter === 'medium' ? { gt: 500000000, lte: 1000000000 } :
                       { lte: 500000000 }
        };
      }

      const results = await client.search(searchParams);
      const newCompanies = results.hits.map(hit => hit.document);
      setCompanies(newCompanies);
      setTotalItems(results.count);
      setCache(prevCache => ({ ...prevCache, [cacheKey]: { companies: newCompanies, count: results.count } }));
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  }, [deferredSearchTerm, debtFilter, sortColumn, sortDirection, currentPage, client]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (amount) => {
    const inThousands = amount ;
    return new Intl.NumberFormat("el-GR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inThousands);
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="flex justify-between items-center mt-4 mb-4">
        <TextInput
          placeholder="Αναζήτηση (με Επωνυμία ή ΑΦΜ)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        />
        {/* <Select value={debtFilter} onValueChange={setDebtFilter}>
          <SelectItem value="all">All Debts</SelectItem>
          <SelectItem value="high">High Debt (1B)</SelectItem>
          <SelectItem value="medium">Medium Debt (500M-1B)</SelectItem>
          <SelectItem value="low">Low Debt (500M)</SelectItem>
        </Select> */}
      </div>
      <PaginationControls />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              className="w-1/2"
              
            >
              Επωνυμία
            </TableHeaderCell>
            <TableHeaderCell
              className="cursor-pointer w-1/4"
              onClick={() => handleSort("totalPublic")}
            >
              Σύν. Οφειλών Δημοσίου<ArrowUpDown className="inline" size={16} />
            </TableHeaderCell>
            <TableHeaderCell
              className="cursor-pointer w-1/4"
              onClick={() => handleSort("totalEFKA")}
            >
              Σύν. Οφειλών ΕΦΚΑ <ArrowUpDown className="inline" size={16} />
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell className="max-w-72">
                <a
                  href={`/company/${company.afm}`}
                  className="text-blue-500 hover:underline truncate block max-w-full"
                  title={company.name}
                >
                  {company.name}
                </a>
              </TableCell>
              <TableCell>{formatCurrency(company.totalPublic)}</TableCell>
              <TableCell>{formatCurrency(company.totalEFKA)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {loading && <div className="mt-4 text-center">Loading more results...</div>}
      <PaginationControls />
    </>
  );
};

export default EnhancedCompanyTable;