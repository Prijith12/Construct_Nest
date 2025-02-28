import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
  const maxStars = 5; 

  return (
    <div className="flex gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
};
