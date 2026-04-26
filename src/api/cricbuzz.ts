import axios from 'axios';

const api = axios.create({
  baseURL: '/api/mcenter', // Proxied via Vite to cricbuzz.com
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getMatchDetails = async (id: string) => {
  // We combine the endpoints here to return a single object to the UI
  const [live, comm, views] = await Promise.all([
    api.get(`/livescore/${id}`),
    api.get(`/comm/${id}`),
    api.get(`/views-counter/${id}`)
  ]);

  return {
    ...live.data,
    commentary: comm.data.matchCommentary,
    viewCount: views.data.count || 0
  };
};

export const getActiveMatches = async () => {
  const { data } = await api.get('/v1/index');
  return data; 
};