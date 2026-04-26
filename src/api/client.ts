import axios from 'axios';

const api = axios.create({
  baseURL: '/api/mcenter',
  headers: {
    Accept: 'application/json',
  },
});

const normalizePayload = (payload: any) => payload?.data ?? payload;

/**
 * Fetch match details from the separate Cricbuzz endpoints.
 */
export const getMatchFullData = async (matchId: string): Promise<any> => {
  try {
    const now = Date.now();
    const [liveRes, commRes, viewsRes] = await Promise.all([
      api.get(`/livescore/${matchId}`, {
        params: { t: now },
        headers: { 'Cache-Control': 'no-cache' },
      }),
      api.get(`/comm/${matchId}`, {
        params: { t: now + 1 },
        headers: { 'Cache-Control': 'no-cache' },
      }),
      api.get(`/views-counter/${matchId}`, {
        params: { t: now + 2 },
        headers: { 'Cache-Control': 'no-cache' },
      }),
    ]);

    const liveData = normalizePayload(liveRes.data);
    const commData = normalizePayload(commRes.data);
    const viewsData = normalizePayload(viewsRes.data);

    const matchHeader = commData?.matchHeader || liveData?.matchHeader || {};
    const miniscore = liveData?.miniscore || commData?.miniscore || commData?.livescore?.miniscore || {};
    const matchCommentary = commData?.matchCommentary || commData?.commentary?.matchCommentary || {};

    return {
      matchId,
      state: matchHeader.state || miniscore?.matchScoreDetails?.state || 'preview',
      status: matchHeader.status || miniscore?.status || 'Match not started',
      matchHeader,
      miniscore,
      matchCommentary,
      views: viewsData || commData?.views || {},
    };
  } catch (error) {
    console.error('API Error while fetching match data:', error);
    throw error;
  }
};

/**
 * Scrapes the live score index page to find active match IDs.
 */
export const getActiveMatches = async () => {
  try {
    const { data } = await axios.get('/api/live-matches-index');
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, 'text/html');
    const matchLinks = doc.querySelectorAll('a[href^="/live-cricket-scores/"]');

    const extractedMatches: Array<{ id: string; title: string; status: string }> = [];
    const seenIds = new Set<string>();

    matchLinks.forEach((link) => {
      const href = link.getAttribute('href');
      const id = href?.split('/')[2];
      const title = link.getAttribute('title') || link.textContent || 'Unknown Match';

      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        extractedMatches.push({
          id,
          title: title.replace(' - Complete', '').replace(' - Live', ''),
          status: title.includes('Won') ? 'Completed' : 'Live Now',
        });
      }
    });

    return extractedMatches;
  } catch (error) {
    console.error('Could not fetch live matches:', error);
    throw error;
  }
};
