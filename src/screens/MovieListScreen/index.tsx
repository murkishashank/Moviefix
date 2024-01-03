import { StyleSheet, Text, View } from 'react-native';
import { Genres } from '../../components/Genres';
import { useEffect, useState } from 'react';
import { GenresType } from '../../types';
import { getAllGenres } from '../../api/getGenres';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {}

export const MovieListScreen = (props: Props) => {
  const [genresList, setGenresList] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    getAllGenres().then(data => {
      setGenresList([{ id: null, name: 'All' }, ...data.genres]);
    });
  }, []);

  const handleGenrePress = (genreId: number) => {
    console.log('selectedGenres', selectedGenres);
    if (selectedGenres.includes(genreId)) {
      const index = selectedGenres.findIndex(id => id === genreId);
      setSelectedGenres(prevGenre => prevGenre.filter((_, i) => i !== index));
    } else {
      setSelectedGenres(prevGenre => [...prevGenre, genreId]);
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
