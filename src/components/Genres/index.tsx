import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GenresType } from '../../types';

interface Props {
  genres: GenresType[];
  selectedGenres: number[];
  handleGenrePress: (id: number) => void;
}

export const Genres = ({ genres, selectedGenres, handleGenrePress }: Props) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.genreContainer}>
        {genres.map(({ id, name }) => (
          <TouchableOpacity
            key={`${name}-${id}`}
            style={[
              styles.genreButton,
              {
                backgroundColor: selectedGenres.includes(id) ? 'lightgreen' : 'white',
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
    maxHeight: 80,
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
    minWidth: 50,
    maxHeight: 60,
  },
});
