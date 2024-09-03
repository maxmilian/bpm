import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import SearchBar from '../components/SearchBar/SearchBar';
import FormList from '../components/FormList/FormList';

export default function SearchForms() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (searchTerm: string) => {
    const res = await fetch(`/api/forms/search?q=${searchTerm}`);
    const data = await res.json();
    setSearchResults(data);
  };

  return (
    <Layout>
      <h1>搜索表單</h1>
      <SearchBar onSearch={handleSearch} />
      <FormList forms={searchResults} />
    </Layout>
  );
}