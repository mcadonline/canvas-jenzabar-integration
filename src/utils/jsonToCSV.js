const toCSVString = arr => `"${arr.join('","')}"`;

export default function jsonToCSV(collection) {
  if (!collection.length) return '';

  // assume first obj is complete
  const headers = Object.keys(collection[0]);
  const records = collection.map(record => headers.map(header => record[header] || null));

  return [headers, ...records].map(toCSVString).join('\n');
}
