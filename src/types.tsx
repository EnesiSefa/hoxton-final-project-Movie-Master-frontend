export type User = {
  id: number;
  profilePic: string;
  username: string;
  email: string;
  password: string;
  reviews: Review[];
  favorites: Favorite[];
  friendships: Friendship[]
  messages: Message[]
  likeDislike?: LikeDislike;
};
export type Friendship = {
  id: number;
  friend: User;
  friendId: number;
};

export type Message = {
  id: number;
  content: string;
  user: User;
  userId: number;
  
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
  likeDislike: LikeDislike[];
};

export type LikeDislike = {
  id: number;
  like: boolean;
  dislike: boolean;
  review: Review;
  reviewId?: number;
  user?: User;
  userId?: number;
};
