export default function Home() {
  return (
    <div className="min-h-5 bg-gray-900 text-white home">
      {/* Hero Section */}
      <section className="hero-section flex flex-col items-center justify-center text-center py-16 px-6 bg-cover bg-center bg-hero-pattern">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Not Steam</h1>
        <p className="text-lg md:text-xl mb-6">
          Discover the latest games, reviews, and upcoming releases!
        </p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-900 transition-all rounded-lg font-semibold" >
          Explore Reviews
        </button>
      </section>

      {/* Popular Games Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Popular Games</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Game cards with sample images */}
          {["game1.jpg", "game2.jpg", "game3.jpg"].map((img, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <img
                src={`https://via.placeholder.com/300x200?text=Game+${index + 1}`}
                alt={`Game ${index + 1}`}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-2xl font-semibold mb-3">Game Title {index + 1}</h3>
              <p className="text-gray-400">
                Check out this amazing game! Click below for more details.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Game Reviews Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Game Reviews</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((review) => (
            <div key={review} className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">Game Title {review}</h3>
              <p className="text-gray-400 mb-4">
                This is a short description of the game review. Click below to read more.
              </p>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Games Section */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Upcoming Games</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Upcoming 1", "Upcoming 2", "Upcoming 3"].map((game, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">{game}</h3>
              <p className="text-gray-400">
                Stay tuned for the release of {game}. Click below for updates.
              </p>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
