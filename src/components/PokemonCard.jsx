function PokemonCard({ name, image, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white text-black p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer"
    >
      {/* ❤️ */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(name);
        }}
        className="absolute top-2 right-2 text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img
         src={image}
         alt={name}
         className="mx-auto w-20 h-20 transition-transform duration-300 hover:scale-110"
      />
      <p className="mt-2 font-semibold capitalize">{name}</p>
    </div>
  );
}

export default PokemonCard;