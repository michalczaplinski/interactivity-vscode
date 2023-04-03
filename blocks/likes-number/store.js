export default {
  selectors: {
    wpmovies: {
      likesCount: ({ state }) => state.wpmovies.likedMovies.length,
      isLikedMoviesNotEmpty: ({ state }) =>
        state.wpmovies.likedMovies.length !== 0,
    },
  },
};
