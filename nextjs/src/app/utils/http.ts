export const fetcher = (url: string) => fetch(`http://localhost:3001${url}`).then((res) => res.json())
