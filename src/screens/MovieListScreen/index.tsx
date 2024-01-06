import { StyleSheet, Text, View } from 'react-native';
import { Genres } from '../../components/Genres';
import { useEffect, useState } from 'react';
import { GenresType } from '../../types';
import { getAllGenres } from '../../api/getGenres';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {}

export const MovieListScreen = (props: Props) => {
  const [genresList, setGenresList] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[] | null>([]);

  useEffect(() => {
    getAllGenres().then(data => {
      setGenresList(data.genres);
    });
  }, []);

  const handleGenrePress = (genreId: number) => {
    if (genreId === 0) {
      // "All Genres" is selected, set the state to null
      setSelectedGenres(null);
    } else {
      // Toggle the selected state for the genre
      setSelectedGenres(prevGenres => {
        if (prevGenres === null || prevGenres.includes(0)) {
          // If "All Genres" is selected or was selected, remove it from the selection
          return [genreId];
        }

        const updatedGenres = [...prevGenres];
        const index = updatedGenres.indexOf(genreId);

        if (index !== -1) {
          updatedGenres.splice(index, 1); // Genre is already selected, remove it
        } else {
          updatedGenres.push(genreId); // Genre is not selected, add it
        }

        return updatedGenres;
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Genres genres={genresList} selectedGenres={selectedGenres} handleGenrePress={handleGenrePress} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
