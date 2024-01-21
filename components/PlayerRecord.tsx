import Image from './Image';
import Play from '../models/Play';
import { Badge } from '@mui/material';
import Player from '../models/Player';
import PlayerOption from './PlayerOption';
import LoadingSpinner from './LoadingSpinner';
import TextField from '@mui/material/TextField';
import CharacterOption from './CharacterOption';
import { Characters } from '../common/Characters';
import Autocomplete from '@mui/material/Autocomplete';
import { useContext, useState, useEffect, useRef } from 'react';
import { calcPlayerCharacterIcon } from '../common/CharacterIcons';
import { getAllCharacters, getCharacterObjects, getUniqueCharactersPlayed, searchBlur } from './PlayerForm';
import { calcPlayerCharacterTimesPlayed, calcPlayerCharactersPlayed, getCharacterTitle } from './smasherscape';

export const parseDate = (dateStr: any) => {
    const parts = dateStr.split(`, `);
    const timePart = parts[0];
    const datePart = parts[1];
    const datePartWithoutSuffix = datePart.replace(/(\d+)(st|nd|rd|th)/, `$1`);
    const newDateStr = `${datePartWithoutSuffix}, ${timePart}`;
    return new Date(newDateStr) as any;
}

export const removeTrailingZeroDecimal = (number) => {
    let num = typeof number == `string` ? parseFloat(number) : number;
    const wholeNumber = Math.trunc(num);
    const decimalPart = num - wholeNumber;
    let resultingNumber;
    if (decimalPart === 0) {
        resultingNumber = wholeNumber;
    } else {
        resultingNumber = num.toFixed(1);
    }
    return isNaN(resultingNumber) ? 0 : resultingNumber;
}

export const calcPlayerKills = (player: Player, plays: Play[]) => {
    let wins = plays.filter(ply => ply?.winnerUUID == player?.uuid)?.length;
    let losses = plays.filter(ply => ply?.winnerUUID != player?.uuid);
    let lossKills = losses?.map(loss => loss?.stocksTaken)?.reduce((partialSum, a) => partialSum + a, 0);
    let winKills = wins * 3;
    return winKills + lossKills;
}

export const calcPlayerDeaths = (player: Player, plays: Play[]) => {
    let losses = plays.filter(ply => ply?.winnerUUID != player?.uuid)?.length;
    let wins = plays.filter(ply => ply?.winnerUUID == player?.uuid);
    let winDeaths = wins?.map(win => win?.stocksTaken)?.reduce((partialSum, a) => partialSum + a, 0);
    let lossDeaths = losses * 3;
    return lossDeaths + winDeaths;
}

export const calcPlayerKDRatio = (player: Player, plays: Play[]) => {
    let kd = calcPlayerKills(player, plays) / calcPlayerDeaths(player, plays);
    let kdRatio = removeTrailingZeroDecimal(kd);
    return parseFloat(kdRatio);
}

function PlayerRecord(props) {
  const plyrRecord = useRef<any>();
  let [loading, setLoading] = useState(false);
  let [playerSearchActive, setPlayerSearchActive] = useState(false);
  let [characterSearchActive, setCharacterSearchActive] = useState(false);
  let { plyr, plyrPlays, paginationEnd, setPaginationEnd, loadedInterval } = props;
  const { players, filteredPlayers, devEnv, useLazyLoad } = useContext<any>((StateContext as any));
  let [filteredPlays, setFilteredPlays] = useState(plyrPlays && plyrPlays?.length > 0 ? plyrPlays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)) : plyr?.plays?.length > 0 ? plyr?.plays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)) : []);

//   let [initialInterval, setInitialInterval] = useState(5);
//   let [loadedInterval, setLoadedInterval] = useState(20);
//   let [paginationAmount, setPaginationAmount] = useState(initialInterval);
//   let [paginationEnd, setPaginationEnd] = useState(paginationAmount);

  const paginate = () => {
    // let newAmount = paginationAmount + interval;
    // setPaginationAmount(prevAmount => prevAmount + newAmount);
    // console.log({paginationEnd, paginationAmount, newAmount});
    // if (plyr?.expanded == true) {
        setPaginationEnd(prevEnd => prevEnd + loadedInterval);
    // } else {
        // setPaginationEnd(initialInterval);
    // }
    // plyr?.expanded == true ? setPaginationEnd(prevEnd => prevEnd + loadedInterval) : setPaginationEnd(initialInterval);
    setLoading(false);
  };

  useEffect(() => {
    setFilteredPlays(plyrPlays && plyrPlays?.length > 0 ? plyrPlays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)) : plyr?.plays?.length > 0 ? plyr?.plays?.sort((a: any, b: any) => parseDate(b.date) - parseDate(a.date)) : []);
  }, [players])

  useEffect(() => {
    const handleScroll = (e) => {
      const element = e.target;
      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        setLoading(true);
        paginate();
      }
    };

    if (plyrRecord.current) {
      plyrRecord.current.addEventListener(`scroll`, handleScroll);
    }

    return () => {
      if (plyrRecord.current) {
        plyrRecord.current.removeEventListener(`scroll`, handleScroll);
      }
    };
  }, []);

  const searchRecordPlayers = (e: any, value?: any) => {
    if (value) {
        let searchTerm;
        if (typeof value == `string`) {
            searchTerm = value.toLowerCase();
        } else {
            searchTerm = value?.name.toLowerCase();
        }
        setFilteredPlays(plyrPlays.filter(ply => ply?.winner.toLowerCase()?.includes(searchTerm) || ply?.loser.toLowerCase()?.includes(searchTerm)));
        setPlayerSearchActive(true);
    } else {
        setPlayerSearchActive(false);
        setFilteredPlays(plyrPlays);
    }
    devEnv && console.log(`Search Record Players`, {e, value, plays: filteredPlays});
  }

  const searchRecordCharacters = (e: any, value?: any) => { 
    if (value) {
        let searchTerm;
        if (typeof value == `string`) {
            searchTerm = value.toLowerCase();
        } else {
            searchTerm = value?.label.toLowerCase();
        }
        setFilteredPlays(plyrPlays.filter(ply => ply?.character.toLowerCase()?.includes(searchTerm) || ply?.otherCharacter.toLowerCase()?.includes(searchTerm)));
        setCharacterSearchActive(true);
    } else {
        setCharacterSearchActive(false);
        setFilteredPlays(plyrPlays);
    }
    devEnv && console.log(`Search Record Characters`, {e, value, plays: filteredPlays});
  }

    const getCharacterObjs = (active) => {
        if (active == true) {
            return getAllCharacters().filter(char => getUniqueCharactersPlayed(players, filteredPlays).includes(char[1]))
            .filter(char => filteredPlays?.map(ply => (ply?.winnerUUID != plyr?.uuid ? ply?.character : ply?.otherCharacter)).includes(char[1])).map((char, charIndex) => {
                return {
                    id: charIndex + 1,
                    key: char[0],
                    label: char[1],
                    image: calcPlayerCharacterIcon(char[0]),
                    shortcuts: Object.entries(Characters).filter(entry => entry[1] == char[1]).map(entr => entr[0]),
                }
            })
        } else {
            return getCharacterObjects();
        }
    }

  const calcWinLoseRatio = (playerOne, playerTwo, plays: Play[]) => {
    let playerOneDB: Player = players?.find(plyr => plyr?.name.toLowerCase() == playerOne.toLowerCase() || plyr?.name.toLowerCase().includes(playerOne));
    let playerTwoDB: Player = players?.find(plyr => plyr?.name.toLowerCase() == playerTwo.toLowerCase() || plyr?.name.toLowerCase().includes(playerTwo));
    let playsToConsider: Play[] = plays.filter(ply => ply?.winnerUUID == playerTwoDB?.uuid || ply?.loserUUID == playerTwoDB?.uuid);
    let wins = playsToConsider.filter(ply => ply?.winnerUUID == playerOneDB?.uuid)?.length;
    let losses = playsToConsider.filter(ply => ply?.loserUUID == playerOneDB?.uuid)?.length;
    let winRate = (wins/(wins+losses)) * 100;
    let winPercentage = (winRate) > 100 ? 100 : removeTrailingZeroDecimal(winRate);
    return <div className={`winRateDetails`}>
        <div className={`winPercentage ${winPercentage > 50 ? winPercentage == 100 ? `perfect` : `positive` : winPercentage > 24 ? `challenger` : `negative`}`}>({winPercentage}%)</div>
        <div className="winsToLossses">{wins.toLocaleString()} Wins - {losses.toLocaleString()} Losses</div>
    </div>
  }

  return (
    <div className={`recordOfPlayer ${plyr?.expanded ? `expanded` : `collapsed`}`}>
        <Image className={`cardBG`} alt={`Smasherscape Player Card`} src={`/assets/OSRS_Card_Empty.png?raw=true`} />
        <Image className={`cardBG border`} alt={`Smasherscape Player Card`} src={`/assets/OSRS_Card_Template_Border_Only.png?raw=true`} />
        <ul id={`recordOf-${plyr?.uuid}`} className={`recordOf-${plyr?.uuid} recordList`} ref={plyrRecord}>
            <h3 className={`greenRecordText`}>
                <div className={`flex playerRecordBegin`}>
                    {plyr?.name}'s Record
                    <span className={`recordPlays ${filteredPlays?.length > 0 ? `populated` : `empty`}`}>
                        {filteredPlays?.length > 0 && <span className={`goldText`}>K/D: <span className="whiteText kdRatioNum">{calcPlayerKDRatio(plyr, filteredPlays)}</span></span>}
                        <span className={`greenText`}>Kills: <span className="whiteText">{calcPlayerKills(plyr, filteredPlays)?.toLocaleString()}</span></span>
                        <span className={`redText`}>Deaths: <span className="whiteText">{calcPlayerDeaths(plyr, filteredPlays)?.toLocaleString()}</span></span>
                        <span className={`blueText`}>Plays: <span className="whiteText">{filteredPlays?.length?.toLocaleString()}</span></span>
                    </span>
                </div>
                {filteredPlays?.length > 0 && calcPlayerCharactersPlayed(plyr, false, filteredPlays)?.length > 3 && <div className={`playsContainer playerRecordPlaysContainer ${calcPlayerCharactersPlayed(plyr, false, filteredPlays)?.length > 0 ? (calcPlayerCharactersPlayed(plyr, false, filteredPlays)?.length >= 5 ? `populatedPlays moreThanFive` : `populatedPlays`) : ``}`}>
                    {calcPlayerCharactersPlayed(plyr, false, filteredPlays)?.length > 0 ? calcPlayerCharactersPlayed(plyr, false, filteredPlays).map((char, charIndex) => {
                        return (
                            <Badge title={`Played ${getCharacterTitle(char)} ${calcPlayerCharacterTimesPlayed(plyr, char, filteredPlays)} Time(s)`} key={charIndex} badgeContent={calcPlayerCharacterTimesPlayed(plyr, char, filteredPlays)} color="primary">
                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(char)} alt={getCharacterTitle(char)} />
                            </Badge>
                        )
                    }) : <div className={`flex center blackTextShadow slimmed`}>
                        No Plays Yet
                    </div>}
                </div>}
                {filteredPlays?.length > 0 && <div className="flex white noShadow recordForms">
                    <form action="submit" className="gridForm recordForm">
                        <div className={`playerSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                disabled={characterSearchActive == true}
                                id={`recordPlayerSearch-${plyr.id}`}
                                sx={{ width: `100%` }}
                                options={players.filter(playr => playr?.uuid != plyr?.uuid && (plyrPlays?.map(ply => ply?.winnerUUID).includes(playr?.uuid) || plyrPlays?.map(ply => ply?.loserUUID).includes(playr?.uuid))).sort((a, b) => {
                                    if (b.experience.arenaXP !== a.experience.arenaXP) {
                                        return b.experience.arenaXP - a.experience.arenaXP;
                                    }
                                    if (plyrPlays && plyrPlays.length > 0) return plyrPlays.filter(ply => ply?.winnerUUID == b?.uuid || ply?.loserUUID == b?.uuid).length - plyrPlays.filter(ply => ply?.winnerUUID == a?.uuid || ply?.loserUUID == a?.uuid).length;
                                })}
                                getOptionLabel={(option) => option.name}
                                onChange={(e, val: any) => searchRecordPlayers(e, val)}
                                onInputChange={(e, val: any) => searchRecordPlayers(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`search`} onBlur={(e) => searchBlur(e, filteredPlayers)} {...params} label="Player(s)..." />}
                                renderOption={(props: any, playerOption: any) => {
                                    return (
                                        <div key={playerOption.id} {...props}>
                                            <PlayerOption playerOption={playerOption}  />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <div className={`characterSearchAuto inputWrapper materialBGInputWrapper`}>
                            <div className="inputBG materialBG"></div>
                            <Autocomplete
                                autoHighlight
                                disabled={playerSearchActive == true}
                                id={`recordPlayerCharacterSearch-${plyr.id}`}
                                sx={{ width: `100%` }}
                                options={getCharacterObjs(true)}
                                getOptionLabel={(option) => option.label}
                                onChange={(e, val: any) => searchRecordCharacters(e, val)}
                                onInputChange={(e, val: any) => searchRecordCharacters(e, val)}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => <TextField name={`characters`} {...params} label="Character(s)..." />}
                                renderOption={(props: any, characterOption: any) => {
                                    return (
                                        <div key={characterOption.id} {...props}>
                                            <CharacterOption plyr={plyr} plays={plyrPlays} type={`Other Player`} characterOption={characterOption} />
                                        </div>
                                    )
                                }}
                            />
                        </div>
                        <button className={`formSubmitButton recordFormSubmit`} type={`submit`}>Submit</button>
                    </form>
                </div>}
            </h3>
            {filteredPlays?.length > 0 ? filteredPlays.slice(0, paginationEnd).map((ply, plyIndex) => {
                let isWinner = ply?.winner == plyr?.name;
                return (
                    <li className={`playerPlay`} key={plyIndex}>
                        <div className="plyIndex">{plyIndex + 1}.</div>
                        <div className="recordDetails">
                        <div className={`playMessage`}>{isWinner ? <div><span className={`${isWinner ? `winner` : `loser`}`}>Win</span> over {ply?.loser}</div> : <div><span className={`${isWinner ? `winner` : `loser`}`}>Loss</span> to {ply?.winner}</div>}
                            <div className="stocksRow">
                                <div className="stocks">
                                    {isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                        return (
                                            <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                            </span>
                                        )
                                    }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                        return (
                                            <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                            </span>
                                        )
                                    })}
                                </div>
                            vs 
                                <div className="otherStocks">
                                    {!isWinner ? ply?.stocks?.length > 0 && ply?.stocks?.map((stok, stkIndex) => {
                                        return (
                                            <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                            </span>
                                        )
                                    }) : ply?.lossStocks?.map((stok, stkIndex) => {
                                        return (
                                            <span key={stkIndex} className={stok?.dead ? `dead` : `living`}>
                                                <img className={`charImg`} width={35} src={calcPlayerCharacterIcon(stok?.character)} alt={getCharacterTitle(stok?.character)} />
                                            </span>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="recordSubDetails">
                            <div className="charsPlayedGame">
                                {calcWinLoseRatio(isWinner ? ply?.winner : ply?.loser, isWinner ? ply?.loser : ply?.winner, filteredPlays)}
                            </div>
                            <div className="playDate">{ply?.date}</div>
                        </div>
                        </div>
                    </li>
                )
            }) : <div className={`noPlaysYet`}>
            No Plays Yet
            </div>}
            {loading == true || filteredPlays.slice(0, paginationEnd).length < filteredPlays.length && <div className="noPlaysYet">
                <LoadingSpinner loadingLabel={`Play(s)`} override={true} size={18} />
            </div>}
        </ul>
    </div>
  )
}

export default PlayerRecord