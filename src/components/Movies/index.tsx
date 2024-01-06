import { FlatList, StyleSheet, Text, View } from 'react-native';
import { GenresType, Movie, YearWiseMovies } from '../../types';
import { MovieCard } from '../MovieCard';

interface MoviesProps {
  movies: YearWiseMovies;
  genres: GenresType[];
}

export const Movies: React.FC<MoviesProps> = ({ movies, genres }: MoviesProps) => {
  const years = Object.keys(movies);

  const renderMovieCard = ({ item }: { item: Movie }) => <MovieCard movie={item} genres={genres} />;
  return (
    <View>
      {years.map((year, index) => (
        <View key={`${year}-${index}`}>
          <Text style={styles.yearHeader}>{year}</Text>
          <FlatList data={movies[year]} numColumns={2} keyExtractor={(item, movieIndex) => `${year}-${movieIndex}`} renderItem={({ item }) => renderMovieCard({ item })} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  yearHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 10,
  },
});
