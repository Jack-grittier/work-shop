import { Characters } from "./Characters";
export const calcPlayerCharacterIcon = (char) => {
    if (char == `aegis` || char == `pyra` || char == `mythra` || Characters[char] == Characters.Aegis || char == Characters.Aegis || char == Characters.Aegis.toLowerCase()) {
        return `/assets/characters/PyraMythraAegis.webp`;
    } else if (char == `banjoandkazooie` || char == `banjo&kazooie` || char == `banjo` || char == `bk` || char == `bandk` || char == `b&k` || Characters[char] == Characters.BanjoAndKazooie || char == Characters.BanjoAndKazooie || char == Characters.BanjoAndKazooie.toLowerCase()) {
        return `/assets/characters/Banjo&Kazooie.webp`;
    } else if (char == `bayonetta` || char == `bayo` || Characters[char] == Characters.Bayonetta || char == Characters.Bayonetta || char == Characters.Bayonetta.toLowerCase()) {
        return `/assets/characters/Bayonetta.webp`;
    } else if (char == `bowser` || char == `bow` || Characters[char] == Characters.Bowser || char == Characters.Bowser || char == Characters.Bowser.toLowerCase()) {
        return `/assets/characters/Bowser.webp`;
    } else if (char == `bowserjr` || char == `bj` || Characters[char] == Characters.BowserJr || char == Characters.BowserJr || char == Characters.BowserJr.toLowerCase()) {
        return `/assets/characters/BowserJr.webp`;
    } else if (char == `byleth` || char == `by` || Characters[char] == Characters.Byleth || char == Characters.Byleth || char == Characters.Byleth.toLowerCase()) {
        return `/assets/characters/Byleth.webp`;
    } else if (char == `captainfalcon` || char == `cf` || char == `falcon` || Characters[char] == Characters.CaptainFalcon || char == Characters.CaptainFalcon || char == Characters.CaptainFalcon.toLowerCase()) {
        return `/assets/characters/CaptainFalcon.webp`;
    } else if (char == `charizard` || char == `char` || Characters[char] == Characters.Charizard || char == Characters.Charizard || char == Characters.Charizard.toLowerCase()) {
        return `/assets/characters/Charizard.webp`;
    } else if (char == `chrom` || char == `ch` || Characters[char] == Characters.Chrom || char == Characters.Chrom || char == Characters.Chrom.toLowerCase()) {
        return `/assets/characters/Chrom.webp`;
    } else if (char == `cloud` || char == `cl` || Characters[char] == Characters.Cloud || char == Characters.Cloud || char == Characters.Cloud.toLowerCase()) {
        return `/assets/characters/Cloud.webp`;
    } else if (char == `corrin` || char == `co` || Characters[char] == Characters.Corrin || char == Characters.Corrin || char == Characters.Corrin.toLowerCase()) {
        return `/assets/characters/Corrin.webp`;
    } else if (char == `daisy` || char == `da` || Characters[char] == Characters.Daisy || char == Characters.Daisy || char == Characters.Daisy.toLowerCase()) {
        return `/assets/characters/Daisy.webp`;
    } else if (char == `darkpit` || char == `dp` || Characters[char] == Characters.DarkPit || char == Characters.DarkPit || char == Characters.DarkPit.toLowerCase()) {
        return `/assets/characters/DarkPit.webp`;
    } else if (char == `darksamus` || char == `ds` || Characters[char] == Characters.DarkSamus || char == Characters.DarkSamus || char == Characters.DarkSamus.toLowerCase()) {
        return `/assets/characters/DarkSamus.webp`;
    } else if (char == `diddykong` || char == `diddy` || Characters[char] == Characters.DiddyKong || char == Characters.DiddyKong || char == Characters.DiddyKong.toLowerCase()) {
        return `/assets/characters/DiddyKong.webp`;
    } else if (char == `donkeykong` || char == `dk` || Characters[char] == Characters.DonkeyKong || char == Characters.DonkeyKong || char == Characters.DonkeyKong.toLowerCase()) {
        return `/assets/characters/DonkeyKong.webp`;
    } else if (char == `drmario` || char == `doc` || char == `dm` || Characters[char] == Characters.DrMario || char == Characters.DrMario || char == Characters.DrMario.toLowerCase()) {
        return `/assets/characters/DrMario.webp`;
    } else if (char == `duckhunt` || char == `dh` || Characters[char] == Characters.DuckHunt || char == Characters.DuckHunt || char == Characters.DuckHunt.toLowerCase()) {
        return `/assets/characters/DuckHunt.webp`;
    } else if (char == `falco` || char == `fa` || Characters[char] == Characters.Falco || char == Characters.Falco || char == Characters.Falco.toLowerCase()) {
        return `/assets/characters/Falco.webp`;
    } else if (char == `fox` || Characters[char] == Characters.Fox || char == Characters.Fox || char == Characters.Fox.toLowerCase()) {
        return `/assets/characters/Fox.webp`;
    } else if (char == `ganondorf` || char == `ganon` || char == `gd` || char == `gnn` || Characters[char] == Characters.Ganondorf || char == Characters.Ganondorf || char == Characters.Ganondorf.toLowerCase()) {
        return `/assets/characters/Ganondorf.webp`;
    } else if (char == `greninja` || char == `gren` || char == `grenin` || Characters[char] == Characters.Greninja || char == Characters.Greninja || char == Characters.Greninja.toLowerCase()) {
        return `/assets/characters/Greninja.webp`;
    } else if (char == `hero` || char == `he` || char == `hr` || Characters[char] == Characters.Hero || char == Characters.Hero || char == Characters.Hero.toLowerCase()) {
        return `/assets/characters/Hero.webp`;
    } else if (char == `iceclimbers` || char == `icies` || char == `ics` || char == `ic` || Characters[char] == Characters.IceClimbers || char == Characters.IceClimbers || char == Characters.IceClimbers.toLowerCase()) {
        return `/assets/characters/IceClimbers.webp`;
    } else if (char == `ike` || Characters[char] == Characters.Ike || char == Characters.Ike || char == Characters.Ike.toLowerCase()) {
        return `/assets/characters/Ike.webp`;
    } else if (char == `incineroar` || char == `incin` || char == `inc` || Characters[char] == Characters.Incineroar || char == Characters.Incineroar || char == Characters.Incineroar.toLowerCase()) {
        return `/assets/characters/Incineroar.webp`;
    } else if (char == `inkling` || char == `inkl` || char == `ink` || Characters[char] == Characters.Inkling || char == Characters.Inkling || char == Characters.Inkling.toLowerCase()) {
        return `/assets/characters/Inkling.webp`;
    } else if (char == `isabelle` || char == `isbl` || char == `isa` || Characters[char] == Characters.Isabelle || char == Characters.Isabelle || char == Characters.Isabelle.toLowerCase()) {
        return `/assets/characters/Isabelle.webp`;
    } else if (char == `ivysaur` || char == `ivys` || char == `ivy` || Characters[char] == Characters.Ivysaur || char == Characters.Ivysaur || char == Characters.Ivysaur.toLowerCase()) {
        return `/assets/characters/Ivysaur.webp`;
    } else if (char == `jigglypuff` || char == `jiggly` || char == `jiggs` || char == `jp` || Characters[char] == Characters.Jigglypuff || char == Characters.Jigglypuff || char == Characters.Jigglypuff.toLowerCase()) {
        return `/assets/characters/Jigglypuff.webp`;
    } else if (char == `joker` || Characters[char] == Characters.Joker || char == Characters.Joker || char == Characters.Joker.toLowerCase()) {
        return `/assets/characters/Joker.webp`;
    } else if (char == `kazuya` || char == `kaz` || char == `kz` || Characters[char] == Characters.Kazuya || char == Characters.Kazuya || char == Characters.Kazuya.toLowerCase()) {
        return `/assets/characters/Kazuya.webp`;
    } else if (char == `ken` || char == `kn` || Characters[char] == Characters.Ken || char == Characters.Ken || char == Characters.Ken.toLowerCase()) {
        return `/assets/characters/Ken.webp`;
    }  else if (char == `kingdedede` || char == `ddd` || char == `kd` || Characters[char] == Characters.KingDedede || char == Characters.KingDedede || char == Characters.KingDedede.toLowerCase()) {
        return `/assets/characters/KingDedede.webp`;
    }  else if (char == `kingkrool` || char == `krool` || char == `rool` || char == `kkr` || Characters[char] == Characters.KingKRool || char == Characters.KingKRool || char == Characters.KingKRool.toLowerCase()) {
        return `/assets/characters/KingKRool.webp`;
    } else if (char == `kirby` || char == `krb` || Characters[char] == Characters.Kirby || char == Characters.Kirby || char == Characters.Kirby.toLowerCase()) {
        return `/assets/characters/Kirby.webp`;
    } else if (char == `link` || char == `lnk` || Characters[char] == Characters.Link || char == Characters.Link || char == Characters.Link.toLowerCase()) {
        return `/assets/characters/Link.webp`;
    } else if (char == `littlemac` || char == `lm` || Characters[char] == Characters.LittleMac || char == Characters.LittleMac || char == Characters.LittleMac.toLowerCase()) {
        return `/assets/characters/LittleMac.webp`;
    } else if (char == `lucario` || char == `luc` || Characters[char] == Characters.Lucario || char == Characters.Lucario || char == Characters.Lucario.toLowerCase()) {
        return `/assets/characters/Lucario.webp`;
    } else if (char == `lucas` || Characters[char] == Characters.Lucas || char == Characters.Lucas || char == Characters.Lucas.toLowerCase()) {
        return `/assets/characters/Lucas.webp`;
    } else if (char == `lucina` || Characters[char] == Characters.Lucina || char == Characters.Lucina || char == Characters.Lucina.toLowerCase()) {
        return `/assets/characters/Lucina.webp`;
    } else if (char == `luigi` || char == `lg` || Characters[char] == Characters.Luigi || char == Characters.Luigi || char == Characters.Luigi.toLowerCase()) {
        return `/assets/characters/Luigi.webp`;
    } else if (char == `mario` || Characters[char] == Characters.Mario || char == Characters.Mario || char == Characters.Mario.toLowerCase()) {
        return `/assets/characters/Mario.webp`;
    } else if (char == `marth` || Characters[char] == Characters.Marth || char == Characters.Marth || char == Characters.Marth.toLowerCase()) {
        return `/assets/characters/Marth.webp`;
    } else if (char == `megaman` || char == `mm` || char == `mega` || Characters[char] == Characters.MegaMan || char == Characters.MegaMan || char == Characters.MegaMan.toLowerCase()) {
        return `/assets/characters/MegaMan.webp`;
    } else if (char == `metaknight` || char == `meta` || char == `mk` || Characters[char] == Characters.MetaKnight || char == Characters.MetaKnight || char == Characters.MetaKnight.toLowerCase()) {
        return `/assets/characters/MetaKnight.webp`;
    } else if (char == `mt` || char == `mewtwo` || char == `m2` || Characters[char] == Characters.Mewtwo || char == Characters.Mewtwo || char == Characters.Mewtwo.toLowerCase()) {
        return `/assets/characters/Mewtwo.webp`;
    } else if (char == `miibrawler` || char == `brawler` || char == `mb` || Characters[char] == Characters.MiiBrawler || char == Characters.MiiBrawler || char == Characters.MiiBrawler.toLowerCase()) {
        return `/assets/characters/MiiBrawler.webp`;
    } else if (char == `miifighter` || char == `fighter` || char == `mf` || Characters[char] == Characters.MiiFighter || char == Characters.MiiFighter || char == Characters.MiiFighter.toLowerCase()) {
        return `/assets/characters/MiiFighter.webp`;
    } else if (char == `miigunner` || char == `gunner` || char == `mg` || Characters[char] == Characters.MiiGunner || char == Characters.MiiGunner || char == Characters.MiiGunner.toLowerCase()) {
        return `/assets/characters/MiiGunner.webp`;
    } else if (char == `miiswordfighter` || char == `swordfighter` || char == `ms` || Characters[char] == Characters.MiiSwordFighter || char == Characters.MiiSwordFighter || char == Characters.MiiSwordFighter.toLowerCase()) {
        return `/assets/characters/MiiSwordfighter.webp`;
    } else if (char == `minmin` || char == `min` || Characters[char] == Characters.MinMin || char == Characters.MinMin || char == Characters.MinMin.toLowerCase()) {
        return `/assets/characters/MinMin.webp`;
    } else if (char == `mrgame&watch` || char == `gnw` || char == `game&watch` || char == `mrgameandwatch` || char == `gameandwatch` || Characters[char] == Characters.MrGameAndWatch || char == Characters.MrGameAndWatch || char == Characters.MrGameAndWatch.toLowerCase()) {
        return `/assets/characters/MrGame&Watch.webp`;
    } else if (char == `ness` || Characters[char] == Characters.Ness || char == Characters.Ness || char == Characters.Ness.toLowerCase()) {
        return `/assets/characters/Ness.webp`;
    } else if (char == `olimar` || char == `oli` || Characters[char] == Characters.Olimar || char == Characters.Olimar || char == Characters.Olimar.toLowerCase()) {
        return `/assets/characters/Olimar.webp`;
    } else if (char == `pacman` || char == `pac` || char == `pm` || Characters[char] == Characters.PacMan || char == Characters.PacMan || char == Characters.PacMan.toLowerCase()) {
        return `/assets/characters/Pac-Man.webp`;
    } else if (char == `palutena` || char == `palu` || Characters[char] == Characters.Palutena || char == Characters.Palutena || char == Characters.Palutena.toLowerCase()) {
        return `/assets/characters/Palutena.webp`;
    } else if (char == `peach` || char == `pe` || Characters[char] == Characters.Peach || char == Characters.Peach || char == Characters.Peach.toLowerCase()) {
        return `/assets/characters/Peach.webp`;
    } else if (char == `pichu` || char == `pi` || Characters[char] == Characters.Pichu || char == Characters.Pichu || char == Characters.Pichu.toLowerCase()) {
        return `/assets/characters/Pichu.webp`;
    } else if (char == `pikachu` || char == `pika` || Characters[char] == Characters.Pikachu || char == Characters.Pikachu || char == Characters.Pikachu.toLowerCase()) {
        return `/assets/characters/Pikachu.webp`;
    } else if (char == `piranhaplant` || char == `plant` || char == `pp` || Characters[char] == Characters.PiranhaPlant || char == Characters.PiranhaPlant || char == Characters.PiranhaPlant.toLowerCase()) {
        return `/assets/characters/PiranhaPlant.webp`;
    } else if (char == `pit` || Characters[char] == Characters.Pit || char == Characters.Pit || char == Characters.Pit.toLowerCase()) {
        return `/assets/characters/Pit.webp`;
    } else if (char == `pokemontrainer` || char == `pt` || Characters[char] == Characters.PokemonTrainer || char == Characters.PokemonTrainer || char == Characters.PokemonTrainer.toLowerCase()) {
        return `/assets/characters/PokémonTrainer.webp`;
    } else if (char == `richter` || char == `ri` || Characters[char] == Characters.Richter || char == Characters.Richter || char == Characters.Richter.toLowerCase()) {
        return `/assets/characters/Richter.webp`;
    } else if (char == `ridley` || char == `rid` || Characters[char] == Characters.Ridley || char == Characters.Ridley || char == Characters.Ridley.toLowerCase()) {
        return `/assets/characters/Ridley.webp`;
    } else if (char == `rob` || Characters[char] == Characters.ROB || char == Characters.ROB || char == Characters.ROB.toLowerCase()) {
        return `/assets/characters/ROB.webp`;
    } else if (char == `robin` || char == `robi` || Characters[char] == Characters.Robin || char == Characters.Robin || char == Characters.Robin.toLowerCase()) {
        return `/assets/characters/Robin.webp`;
    } else if (char == `rosalina&luma` || char == `rosalinaandluma` || char == `randl` || char == `rosa` || char == `r&l` || Characters[char] == Characters.RosalinaAndLuma || char == Characters.RosalinaAndLuma || char == Characters.RosalinaAndLuma.toLowerCase()) {
        return `/assets/characters/Rosalina.webp`;
    } else if (char == `roy` || Characters[char] == Characters.Roy || char == Characters.Roy || char == Characters.Roy.toLowerCase()) {
        return `/assets/characters/Roy.webp`;
    } else if (char == `ryu` || Characters[char] == Characters.Ryu || char == Characters.Ryu || char == Characters.Ryu.toLowerCase()) {
        return `/assets/characters/Ryu.png`;
    } else if (char == `samus` || char == `samu` || Characters[char] == Characters.Samus || char == Characters.Samus || char == Characters.Samus.toLowerCase()) {
        return `/assets/characters/Samus.webp`;
    } else if (char == `sephiroth` || char == `sephi` || char == `seph` || Characters[char] == Characters.Sephiroth || char == Characters.Sephiroth || char == Characters.Sephiroth.toLowerCase()) {
        return `/assets/characters/Sephiroth.webp`;
    } else if (char == `sheik` || char == `she` || Characters[char] == Characters.Sheik || char == Characters.Sheik || char == Characters.Sheik.toLowerCase()) {
        return `/assets/characters/Sheik.webp`;
    } else if (char == `shulk` || char == `shlk` || Characters[char] == Characters.Shulk || char == Characters.Shulk || char == Characters.Shulk.toLowerCase()) {
        return `/assets/characters/Shulk.webp`;
    } else if (char == `simon` || char == `simo` || Characters[char] == Characters.Simon || char == Characters.Simon || char == Characters.Simon.toLowerCase()) {
        return `/assets/characters/Simon.webp`;
    } else if (char == `snake` || char == `snk` || char == `ak` || Characters[char] == Characters.Snake || char == Characters.Snake || char == Characters.Snake.toLowerCase()) {
        return `/assets/characters/Snake.webp`;
    } else if (char == `sonic` || char == `soni` || char == `snc` || Characters[char] == Characters.Sonic || char == Characters.Sonic || char == Characters.Sonic.toLowerCase()) {
        return `/assets/characters/Sonic.webp`;
    } else if (char == `sora` || Characters[char] == Characters.Sora || char == Characters.Sora || char == Characters.Sora.toLowerCase()) {
        return `/assets/characters/Sora.webp`;
    } else if (char == `steve` || char == `stev` || char == `ste` || char == `stv` || Characters[char] == Characters.Steve || char == Characters.Steve || char == Characters.Steve.toLowerCase()) {
        return `/assets/characters/Steve.webp`;
    } else if (char == `terry` || char == `terr` || char == `trry` || char == `ter` || char == `try` || Characters[char] == Characters.Terry || char == Characters.Terry || char == Characters.Terry.toLowerCase()) {
        return `/assets/characters/Terry.webp`;
    } else if (char == `toonlink` || char == `tlink` ||  char == `toon` || char == `tl` || Characters[char] == Characters.ToonLink || char == Characters.ToonLink || char == Characters.ToonLink.toLowerCase()) {
        return `/assets/characters/ToonLink.webp`;
    } else if (char == `villager` || char == `vill` || Characters[char] == Characters.Villager || char == Characters.Villager || char == Characters.Villager.toLowerCase()) {
        return `/assets/characters/Villager.webp`;
    } else if (char == `wario` || char == `war` || Characters[char] == Characters.Wario || char == Characters.Wario || char == Characters.Wario.toLowerCase()) {
        return `/assets/characters/Wario.webp`;
    } else if (char == `wiifittrainer` || char == `wft` || char == `fit` || Characters[char] == Characters.WiiFitTrainer || char == Characters.WiiFitTrainer || char == Characters.WiiFitTrainer.toLowerCase()) {
        return `/assets/characters/WiiFitTrainer.webp`;
    } else if (char == `wolf` || char == `wlf` || char == `wol` || Characters[char] == Characters.Wolf || char == Characters.Wolf || char == Characters.Wolf.toLowerCase()) {
        return `/assets/characters/Wolf.webp`;
    } else if (char == `yoshi` || char == `yosh` || char == `ysh` || Characters[char] == Characters.Yoshi || char == Characters.Yoshi || char == Characters.Yoshi.toLowerCase()) {
        return `/assets/characters/Yoshi.webp`;
    } else if (char == `younglink` || char == `ylink` || char == `yl` || Characters[char] == Characters.YoungLink || char == Characters.YoungLink || char == Characters.YoungLink.toLowerCase()) {
        return `/assets/characters/YoungLink.webp`;
    } else if (char == `zelda` || char == `zeld` || char == `zel` || Characters[char] == Characters.Zelda || char == Characters.Zelda || char == Characters.Zelda.toLowerCase()) {
        return `/assets/characters/Zelda.webp`;
    } else if (char == `zerosuitsamus` || char == `zerosuit` || char == `zero` || char == `zss` || Characters[char] == Characters.ZeroSuitSamus || char == Characters.ZeroSuitSamus || char == Characters.ZeroSuitSamus.toLowerCase()) {
        return `/assets/characters/ZeroSuitSamus.webp`;
    }
}