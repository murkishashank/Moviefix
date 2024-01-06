import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GenresType, Movie } from '../../types';
import { getImageUrl } from '../../utils/common';

interface MovieCardProps {
  movie: Movie;
  genres: GenresType[];
}

export const MovieCard = ({ movie, genres }: MovieCardProps) => {
  const getGenresNames = (genreIds: number[]): string[] => {
    return genreIds.map(genreId => {
      const foundGenre = genres.find(({ id }) => id === genreId);
      return foundGenre ? foundGenre.name : '';
    });
  };

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <Image source={{ uri: getImageUrl(movie.poster_path) }} style={styles.movieImage} />
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={styles.genre}>{getGenresNames(movie.genre_ids).join(', ')}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {movie.overview}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    overflow: 'hidden', // Ensure that the borderRadius works properly
  },
  movieImage: {
    width: '100%', // Use percentage for responsive design
    aspectRatio: 2 / 3,
    // height: 150,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    padding: 8, // Add padding for better aesthetics
  },
  genre: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
    textAlign: 'center', // Center-align the genre text
  },
  description: {
    textAlign: 'justify',
    lineHeight: 20,
    padding: 8,
  },
});
