export default {
  state: {
    likesCount: 0,
  },
  actions: {
    toggleMovie: ({ state, context }) => {
      const index = state.wpmovies.likedMovies.findIndex(
        (post) => post === context.post.id
      );
      if (index === -1) state.wpmovies.likedMovies.push(context.post.id);
      else state.wpmovies.likedMovies.splice(index, 1);
    },
  },
  selectors: {
    wpmovies: {
      likesCount: ({ state }) => state.wpmovies.likedMovies.length,
      isLikedMoviesNotEmpty: ({ state }) =>
        state.wpmovies.likedMovies.length !== 0,
    },
  },
};
