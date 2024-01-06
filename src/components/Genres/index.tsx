import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GenresType } from '../../types';

interface Props {
  genres: GenresType[];
  selectedGenres: number[] | null;
  handleGenrePress: (id: number) => void;
}

export const Genres = ({ genres, selectedGenres, handleGenrePress }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScrollContainer}>
      <View style={styles.genreContainer}>
        <TouchableOpacity
          key="all-genres"
          style={[
            styles.genreButton,
            {
              backgroundColor: selectedGenres === null || (selectedGenres && selectedGenres.includes(0)) ? 'lightgreen' : 'white',
            },
          ]}
          onPress={() => handleGenrePress(0)}
        >
          <Text>{'All Genres'}</Text>
        </TouchableOpacity>
        {genres.map(({ id, name }) => (
          <TouchableOpacity
            key={`${name}-${id}`}
            style={[
              styles.genreButton,
              {
                backgroundColor: selectedGenres && selectedGenres.includes(id) ? 'lightgreen' : 'white',
              },
            ]}
            onPress={() => handleGenrePress(id)}
          >
            <Text>{name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  genreScrollContainer: {
    height: 80,
    margin: 0,
    maxHeight: 80,
  },
  genreContainer: {
    margin: 0,
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  genreButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    maxHeight: 60,
  },
});
