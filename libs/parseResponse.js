export default function parseResponse(response) {
  if (typeof response === 'string') {
    return JSON.parse(response);
  }
  return response;
}