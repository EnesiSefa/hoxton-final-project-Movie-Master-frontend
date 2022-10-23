export default interface AppStoreState {
  currentUser: User | null;
  movies: Movie[];
  favorites: Favorite[];
  receiver: User | null;
  movie: Movie | null;
  comment: string;
  theme: boolean;
  saveReceiver: User | null;
  saveSender: User | null;

  setCurrentUser: (data: User | null) => void;
  setMovies: (data: Movie[]) => void;
  setFavorites: (data: Favorite[]) => void;
  setReceiver: (data: User | null) => void;
  setMovie: (data: Movie | null) => void;
  setComment: (data: string) => void;
  setTheme: (data: boolean) => void;
  setSaveReceiver: (data: User | null) => void;
  setSaveSender: (data: User | null) => void;
}
export type User = {
  id: number;
  profilePic: string;
  username: string;
  email: string;
  password: string;
  reviews: Review[];
  favorites: Favorite[];
  friendships: Friendship[];
  likes: Like[];
  dislikes: Dislike[];
  sentMessages: Message[];
  receivedMessages: Message[];
};
export type Friendship = {
  id: number;
  friend: User;
  friendId: number;
};

export type Message = {
  id: number;
  content: string;
  timeStamp: string;
  sender: User;
  senderId: number;
  receiver: User;
  receiverId: number;
};

export type Movie = {
  id: number;
  title: string;
  thumbnail: string;
  video: string;
  description: string;
  duration: number;
  year: number;
  genre: string;
  rating: number;
  favorite?: Favorite;
  favoriteId?: number;
  reviews: Review[];
};

export type Favorite = {
  id: number;
  movies: Movie[];
  User?: User;
  userId?: number;
};

export type Review = {
  id: number;
  comment: string;
  user?: User;
  userId?: number;
  Movie?: Movie;
  movieId?: number;
  likes: Like[];
  dislikes: Dislike[];
};

export type Like = {
  id: number;
  review: Review;
  reviewId?: number;
  user?: User;
  userId?: number;
};
export type Dislike = {
  id: number;

  review: Review;
  reviewId?: number;
  user?: User;
  userId?: number;
};
