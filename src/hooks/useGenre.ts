interface ValueData {
    id: number;
    name: string;
    genres: [];
  }
  
  const useGenre = (value: ValueData[]): string => {
    if (value.length < 1) return '';
    const genreIds = value.map((g) => g.id);
    return genreIds.reduce((acc, curr) => acc + ',' + curr.toString(), '');
  };
  
  export default useGenre;
  
