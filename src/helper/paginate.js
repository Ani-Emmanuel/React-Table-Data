export function Paginate(items, currentPage, pages) {
  const startingIndex = (currentPage - 1) * (pages - 1);
  const movies = items.map(element => element).splice(startingIndex, (pages - 1))
  return movies;
}

