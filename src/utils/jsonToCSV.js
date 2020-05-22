import Papa from 'papaparse';

export default function jsonToCSV(collection) {
  if (!collection.length) return '';
  return Papa.unparse(collection);
}
