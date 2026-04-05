export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    case "Medium":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    case "Hard":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }
};