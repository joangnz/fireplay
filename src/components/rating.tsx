export default function Rating({ rating }: { rating: number }) {
    const stars = Array.from({ length: 5 }, (_, index) => index < Math.round(rating));

    return (
        <div className="flex items-center space-x-1">
            {stars.map((filled, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={filled ? "gold" : "gray"}
                    className="w-6 h-6"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
        </div>
    );
}