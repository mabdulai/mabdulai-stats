import fetch from "../lib/fetch-timeout";

const getGames = async () => {
  const options = `?key=${process.env.STEAM_KEY}&steamid=76561197960935111`;
  const ownedGamesUri = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/${options}`;
  const ownedGames = await fetch(ownedGamesUri);
  const ownedGamesData = await ownedGames.json();
  const recentlyPlayedUri = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/${options}`;
  const recentlyPlayed = await fetch(recentlyPlayedUri);
  const recentlyPlayedData = await recentlyPlayed.json();
  return {
    owned_games: ownedGamesData.response.game_count,
    recently_played: recentlyPlayedData.response.games[0].name,
  };
};

export default getGames;
