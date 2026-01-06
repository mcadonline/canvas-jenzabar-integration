import fetch from 'isomorphic-fetch';
import settings from '../../settings.js';

const { error } = console;
const { token, hostname } = settings.canvas;

export default async (url = '', data = {}, config) => {
  const baseUrl = `https://${hostname}/api/v1`;
  const headers = { 
    Authorization: `Bearer ${token}`,
    "User-Agent": "MCADCanvasIntegration/1.0.0"
  };

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      headers,
      method: 'POST',
      body: data,
      ...config,
    });
    const payload = await res.json();
    return payload;
  } catch (err) {
    error(err.message);
    throw err;
  }
};
