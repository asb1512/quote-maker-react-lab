export default (state = [], action) => {
  switch (action.type) {
    case "ADD_QUOTE":
      return [
        ...state,
        {
          author: action.quote.author,
          content: action.quote.content,
          id: action.quote.id,
          votes: 0,
        },
      ];

    case "REMOVE_QUOTE":
      return state.filter((quote) => quote.id !== action.quoteId);

    case "UPVOTE_QUOTE":
      const indexOfUpvoteQuote = state.findIndex(
        (e) => e.id === action.quoteId
      );
      const savedUpvoteQuote = state[indexOfUpvoteQuote];

      return [
        ...state.slice(0, indexOfUpvoteQuote),
        Object.assign({}, savedUpvoteQuote, {
          votes: (savedUpvoteQuote.votes += 1),
        }),
        ...state.slice(indexOfUpvoteQuote + 1),
      ];

    case "DOWNVOTE_QUOTE":
      const indexOfDownvoteQuote = state.findIndex(
        (e) => e.id === action.quoteId
      );
      const savedDownvoteQuote = state[indexOfDownvoteQuote];

      return [
        ...state.slice(0, indexOfDownvoteQuote),
        Object.assign(
          {},
          savedDownvoteQuote,
          savedDownvoteQuote.votes > 0
            ? { votes: (savedDownvoteQuote.votes -= 1) }
            : { votes: savedDownvoteQuote.votes }
        ),
        ...state.slice(indexOfDownvoteQuote + 1),
      ];

    default:
      return state;
  }
};
