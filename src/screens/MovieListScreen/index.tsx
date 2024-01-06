import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Genres } from '../../components/Genres';
import { useEffect, useRef, useState } from 'react';
import { GenresType, Movie, YearWiseMovies } from '../../types';
import { getAllGenres } from '../../api/getGenres';
import { ScrollView } from 'react-native-gesture-handler';
import { getYearWiseMovies } from '../../utils/common';
import { getMovies } from '../../api/getMovies';
import { Movies } from '../../components/Movies';

interface Props {}

export const MovieListScreen: React.FC<Props> = (props: Props) => {
  const [genresList, setGenresList] = useState<GenresType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[] | null>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [yearWiseMovies, setYearWiseMovies] = useState<YearWiseMovies>({});
  const [loading, setLoading] = useState(true);
  const [lastRenderedYear, setLastRenderedYear] = useState(2012);
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    fetchGenresData();
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchMovies(lastRenderedYear);
  }, [selectedGenres]);

  const fetchGenresData = async () => {
    try {
      const data = await getAllGenres();
      setGenresList(data.genres);
    } catch (error: any) {
      console.error('Error fetching genres:', error.message);
    }
  };

  const handleGenrePress = (genreId: number) => {
    if (genreId === 0) {
      setSelectedGenres(null);
    } else {
      setSelectedGenres(prevGenres => {
        if (prevGenres === null || prevGenres.includes(0)) {
          return [genreId];
        }
        const updatedGenres = [...prevGenres];
        const index = updatedGenres.indexOf(genreId);
        if (index !== -1) {
          updatedGenres.splice(index, 1);
        } else {
          updatedGenres.push(genreId);
        }
        if (!updatedGenres.length) return null;
        return updatedGenres;
      });
    }
  };

  const withGenresQueryParam = selectedGenres ? selectedGenres.toString() : null;

  const fetchMovies = async (year: number) => {
    try {
      const response = await getMovies('https://api.themoviedb.org/3/discover/movie', {
        api_key: '2dca580c2a14b55200e784d157207b4d',
        sort_by: 'popularity.desc',
        primary_release_year: year,
        page: 1,
        vote_count: 'gte=100',
        with_genres: withGenresQueryParam,
      });

      const limitedMovies = response.results;
      setMovies(prevState => [...limitedMovies, ...prevState]);
      setYearWiseMovies(getYearWiseMovies([...limitedMovies, ...movies], selectedGenres));
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const layoutHeight = event.nativeEvent.layoutMeasurement.height;
    setScrollPosition(event.nativeEvent.contentOffset.y);

    // Load more movies when scrolling down
    if (offsetY > contentHeight - layoutHeight * 2 && offsetY > scrollPosition) {
      const nextYear = lastRenderedYear + 1;
      fetchMovies(nextYear);
      setLastRenderedYear(nextYear);
    }

    // Load movies of the previous year when scrolling up
    if (offsetY < layoutHeight * 0.2 && offsetY < scrollPosition) {
      const previousYear = Number(Object.keys(yearWiseMovies)[0]) - 1;
      if (previousYear >= 1900) {
        fetchMovies(previousYear);
        setLastRenderedYear(previousYear);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Genre Filter */}
      <View>
        <Genres genres={genresList} selectedGenres={selectedGenres} handleGenrePress={handleGenrePress} />
      </View>

      {/* Movie List */}
      <ScrollView ref={scrollViewRef} onScroll={handleScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.centerView}>
            <ActivityIndicator />
          </View>
        ) : !movies.length ? (
          <View style={styles.centerView}>
            <Text>No Movies</Text>
          </View>
        ) : (
          <Movies movies={yearWiseMovies} genres={genresList} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
