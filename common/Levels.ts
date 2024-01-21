import Experience from "../models/Experience";
import Level from "../models/Level";
import Player from "../models/Player";

export const Levels: Level = {
    Bronze: {
        startAt: 1,
        levelUpAfter: 9,
        class: `Bronze`,
        color: `#d9be1a`,
        name: `Bronze Scimitar`,
        altImage: `/assets/Bronze_Scimmy.png`,
        image: `/images/Level_1_Bronze_Scimmy.png`,
        gradient: `linear-gradient(90deg, #f3ae41, #92621d)`,
    },
    Iron: {
        startAt: 10,
        levelUpAfter: 14,
        class: `Iron`,
        name: `Iron Scimitar`,
        altImage: `/assets/Iron_Scimmy.png`,
        image: `/images/Level_10_Iron_Scimmy.png`,
        gradient: `linear-gradient(90deg, #b1acab , #4c5153)`,
    },
    Steel: {
        startAt: 15,
        levelUpAfter: 19,
        class: `Steel`,
        name: `Steel Scimitar`,
        altImage: `/assets/Steel_Scimmy.png`,
        image: `/images/Level_15_Steel_Scimmy.png`,
        gradient: `linear-gradient(90deg, #d3dde3, #6f7e86)`,
    },
    Mithril: {
        startAt: 20,
        levelUpAfter: 29,
        class: `Mithril`,
        name: `Mithril Scimitar`,
        altImage: `/assets/Mithril_Scimmy.png`,
        image: `/images/Level_20_Mithril_Scimmy.png`,
        gradient: `linear-gradient(90deg, #aeb0da, #4a4aca)`,
    },
    Adamantite: {
        startAt: 30,
        levelUpAfter: 39,
        class: `Adamantite`,
        name: `Adamantite Scimitar`,
        altImage: `/assets/Adamant_Scimmy.png`,
        image: `/images/Level_30_Adamant_Scimmy.png`,
        gradient: `linear-gradient(90deg, #75e775, #055505)`,
    },
    Rune: {
        startAt: 40,
        levelUpAfter: 49,
        class: `Rune`,
        name: `Rune Scimitar`,
        altImage: `/assets/Rune_Scimmy.png`,
        image: `/images/Level_40_Rune_Scimmy.png`,
        gradient: `linear-gradient(90deg, #4acbff, #105479)`,
    },
    Gilded: {
        startAt: 50,
        levelUpAfter: 55,
        class: `Gilded`,
        name: `Gilded Scimitar`,
        altImage: `/assets/Gilded_Scimmy.png`,
        image: `/images/Level_50_Gilded_Scimmy.png`,
        gradient: `linear-gradient(90deg, #8b8bff, #31a8e5, #1edc78)`,
    },
    GomuGomu: {
        startAt: 56,
        levelUpAfter: 59,
        class: `GomuGomu`,
        name: `Gomu Gomu`,
        altImage: `/assets/Gomu_Gomu.png`,
        image: `/images/Level_56_Gomu_Gomu.png`,
        gradient: `linear-gradient(90deg, #f83474, #59e035)`,
    },
    DragonScimmy: {
        startAt: 60,
        levelUpAfter: 69,
        class: `DragonScimmy`,
        name: `Dragon Scimitar`,
        // altImage: `/assets/Dragon_Scimmy.png`,
        image: `/images/Level_60_Dragon_Scimmy.png`,
        gradient: `linear-gradient(90deg, #f22fe7, #f63460)`,
    },
    Abyssal: {
        startAt: 70,
        levelUpAfter: 74,
        class: `Abyssal`,
        name: `Abyssal Whip`,
        // altImage: `/assets/Abyssal_Whip.png`,
        image: `/images/Level_70_Abyssal_Whip.png`,
        gradient: `linear-gradient(90deg, #2c4aff, #e72af8)`,
    },
    Blowpipe: {
        startAt: 75,
        levelUpAfter: 79,
        class: `Blowpipe`,
        name: `Blowpipe`,
        image: `/images/Level_75_Blowpipe.png`,
        gradient: `linear-gradient(90deg, #3462f8, #59e035)`,
    },
    DragonHunterCrossbow: {
        startAt: 80,
        levelUpAfter: 84,
        class: `DHC`,
        name: `DHC`,
        image: `/images/Level_80_DHC.png`,
        gradient: `linear-gradient(90deg, #aee7ef, #cde242)`,
    },
    Kingdom: {
        startAt: 85,
        levelUpAfter: 89,
        class: `Kingdom`,
        name: `Kingdom Key`,
        image: `/images/Level_85_Kingdom_Key.png`,
        gradient: `linear-gradient(90deg, #303d92, #48f8a3)`,
    },
    Twisted: {
        startAt: 90,
        levelUpAfter: 91,
        class: `Twisted`,
        name: `Twisted Bow`,
        image: `/images/Level_90_Twisted_Bow.png`,
        gradient: `linear-gradient(90deg, #a9d73a, #60f7b9)`,
    },
    DragonSlayer: {
        startAt: 92,
        levelUpAfter: 93,
        class: `DragonSlayer`,
        name: `Dragon Slayer`,
        image: `/images/Level_92_Dragon_Slayer.png`,
        gradient: `linear-gradient(90deg, #e44646, #4e2699)`,
    },
    Oblivion: {
        startAt: 94,
        levelUpAfter: 96,
        class: `Oblivion`,
        name: `Oblivion Key`,
        image: `/images/Level_94_Oblivion_Key.png`,
        gradient: `linear-gradient(90deg, #0749f3, #4f209e, #9d1ffb)`,
    },
    Fish: {
        startAt: 97,
        levelUpAfter: 97,
        class: `Fish`,
        name: `Fish Sack`,
        altImage: `/assets/Fish_Sack.png`,
        image: `/images/Level_97_Fish_Sack.png`,
        gradient: `linear-gradient(90deg, #36c2ea, #4fe78f)`,
    },
    Golden: {
        startAt: 98,
        levelUpAfter: 98,
        class: `Golden`,
        name: `Golden Tench`,
        altImage: `/assets/Golden_Tench.png`,
        image: `/images/Level_98_Golden_Tench.png`,
        // gradient: `linear-gradient(90deg, #36c2ea, #4fe78f)`,
    },
    Top: {
        startAt: 99,
        levelUpAfter: 99,
        class: `Top`,
        name: `Top Hat`,
        image: `/assets/OSRS_Top_Hat.png`,
        gradient: `linear-gradient(90deg, #1edc78, #31a8e5)`,
    },
}

export const convertToCustomClasses = (customClassModelObject, CustomClassModel) => {
    let customClassModelInstances = {};
    for (const key in customClassModelObject) if (customClassModelObject.hasOwnProperty(key)) customClassModelInstances[key] = new CustomClassModel(customClassModelObject[key]);
    return customClassModelInstances;
}

export const levels = convertToCustomClasses(Levels, Level);
export const levelsArray = Object.values(levels).sort((firstLevel: Level, nextLevel: Level) => firstLevel.startAt - nextLevel.startAt);

export const calcPlayerLevelAndExperience = (plyr: Player) => {
    let xp = plyr.experience.arenaXP;
    if (xp >= 83 && xp < 174) {
        plyr.level.num = 2;
        plyr.experience.xp = 83;
        plyr.experience.nextLevelAt = 174;
        plyr.experience.remainingXP = (174 - xp);
    } else if (xp >= 174 && xp < 276) {
        plyr.level.num = 3;
        plyr.experience.xp = 174;
        plyr.experience.nextLevelAt = 276;
        plyr.experience.remainingXP = (276 - xp);
    } else if (xp >= 276 && xp < 388) {
        plyr.level.num = 4;
        plyr.experience.xp = 276;
        plyr.experience.nextLevelAt = 388;
        plyr.experience.remainingXP = (388 - xp);
    } else if (xp >= 388 && xp < 512) {
        plyr.level.num = 5;
        plyr.experience.xp = 388;
        plyr.experience.nextLevelAt = 512;
        plyr.experience.remainingXP = (512 - xp);
    } else if (xp >= 512 && xp < 650) {
        plyr.level.num = 6;
        plyr.experience.xp = 512;
        plyr.experience.nextLevelAt = 650;
        plyr.experience.remainingXP = (650 - xp);
    } else if (xp >= 650 && xp < 801) {
        plyr.level.num = 7;
        plyr.experience.xp = 650;
        plyr.experience.nextLevelAt = 801;
        plyr.experience.remainingXP = (801 - xp);
    } else if (xp >= 801 && xp < 969) {
        plyr.level.num = 8;
        plyr.experience.xp = 801;
        plyr.experience.nextLevelAt = 969;
        plyr.experience.remainingXP = (969 - xp);
    } else if (xp >= 969 && xp < 1154) {
        plyr.level.num = 9;
        plyr.experience.xp = 969;
        plyr.experience.nextLevelAt = 1154;
        plyr.experience.remainingXP = (1154 - xp);
    } else if (xp >= 1154 && xp < 1358) {
        plyr.level.num = 10;
        plyr.experience.xp = 1154;
        plyr.level.name = `Iron Scimitar`;
        plyr.experience.nextLevelAt = 1358;
        plyr.experience.remainingXP = (1358 - xp);
    } else if (xp >= 1358 && xp < 1584) {
        plyr.level.num = 11;
        plyr.experience.xp = 1358;
        plyr.level.name = `Iron Scimitar`;
        plyr.experience.nextLevelAt = 1584;
        plyr.experience.remainingXP = (1584 - xp);
    } else if (xp >= 1584 && xp < 1833) {
        plyr.level.num = 12;
        plyr.experience.xp = 1584;
        plyr.level.name = `Iron Scimitar`;
        plyr.experience.nextLevelAt = 1833;
        plyr.experience.remainingXP = (1833 - xp);
    } else if (xp >= 1833 && xp < 2107) {
        plyr.level.num = 13;
        plyr.experience.xp = 1833;
        plyr.level.name = `Iron Scimitar`;
        plyr.experience.nextLevelAt = 2107;
        plyr.experience.remainingXP = (2107 - xp);
    } else if (xp >= 2107 && xp < 2411) {
        plyr.level.num = 14;
        plyr.experience.xp = 2107;
        plyr.level.name = `Iron Scimitar`;
        plyr.experience.nextLevelAt = 2411;
        plyr.experience.remainingXP = (2411 - xp);
    } else if (xp >= 2411 && xp < 2746) {
        plyr.level.num = 15;
        plyr.experience.xp = 2411;
        plyr.level.name = `Steel Scimitar`;
        plyr.experience.nextLevelAt = 2746;
        plyr.experience.remainingXP = (2746 - xp);
    } else if (xp >= 2746 && xp < 3115) {
        plyr.level.num = 16;
        plyr.experience.xp = 2746;
        plyr.level.name = `Steel Scimitar`;
        plyr.experience.nextLevelAt = 3115;
        plyr.experience.remainingXP = (3115 - xp);
    } else if (xp >= 3115 && xp < 3523) {
        plyr.level.num = 17;
        plyr.experience.xp = 3115;
        plyr.level.name = `Steel Scimitar`;
        plyr.experience.nextLevelAt = 3523;
        plyr.experience.remainingXP = (3523 - xp);
    } else if (xp >= 3523 && xp < 3973) {
        plyr.level.num = 18;
        plyr.experience.xp = 3523;
        plyr.level.name = `Steel Scimitar`;
        plyr.experience.nextLevelAt = 3973;
        plyr.experience.remainingXP = (3973 - xp);
    } else if (xp >= 3973 && xp < 4470) {
        plyr.level.num = 19;
        plyr.experience.xp = 3973;
        plyr.level.name = `Steel Scimitar`;
        plyr.experience.nextLevelAt = 4470;
        plyr.experience.remainingXP = (4470 - xp);
    } else if (xp >= 4470 && xp < 5018) {
        plyr.level.num = 20;
        plyr.experience.xp = 4470;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 5018;
        plyr.experience.remainingXP = (5018 - xp);
    } else if (xp >= 5018 && xp < 5624) {
        plyr.level.num = 21;
        plyr.experience.xp = 5018;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 5624;
        plyr.experience.remainingXP = (5624 - xp);
    } else if (xp >= 5624 && xp < 6291) {
        plyr.level.num = 22;
        plyr.experience.xp = 5624;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 6291;
        plyr.experience.remainingXP = (6291 - xp);
    } else if (xp >= 6291 && xp < 7028) {
        plyr.level.num = 23;
        plyr.experience.xp = 6291;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 7028;
        plyr.experience.remainingXP = (7028 - xp);
    } else if (xp >= 7028 && xp < 7842) {
        plyr.level.num = 24;
        plyr.experience.xp = 7028;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 7842;
        plyr.experience.remainingXP = (7842 - xp);
    } else if (xp >= 7842 && xp < 8740) {
        plyr.level.num = 25;
        plyr.experience.xp = 7842;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 8740;
        plyr.experience.remainingXP = (8740 - xp);
    } else if (xp >= 8740 && xp < 9730) {
        plyr.level.num = 26;
        plyr.experience.xp = 8740;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 9730;
        plyr.experience.remainingXP = (9730 - xp);
    } else if (xp >= 9730 && xp < 10824) {
        plyr.level.num = 27;
        plyr.experience.xp = 9730;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 10824;
        plyr.experience.remainingXP = (10824 - xp);
    } else if (xp >= 10824 && xp < 12031) {
        plyr.level.num = 28;
        plyr.experience.xp = 10824;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 12031;
        plyr.experience.remainingXP = (12031 - xp);
    } else if (xp >= 12031 && xp < 13363) {
        plyr.level.num = 29;
        plyr.experience.xp = 12031;
        plyr.level.name = `Mithril Scimitar`;
        plyr.experience.nextLevelAt = 13363;
        plyr.experience.remainingXP = (13363 - xp);
    } else if (xp >= 13363 && xp < 14833) {
        // Players can challenge others to a bot3
        plyr.experience.xp = 13363;
        plyr.level.num = 30;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 14833;
        plyr.experience.remainingXP = (14833 - xp);
    } else if (xp >= 14833 && xp < 16456) {
        plyr.level.num = 31;
        plyr.experience.xp = 14833;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 16456;
        plyr.experience.remainingXP = (16456 - xp);
    } else if (xp >= 16456 && xp < 18247) {
        plyr.level.num = 32;
        plyr.experience.xp = 16456;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 18247;
        plyr.experience.remainingXP = (18247 - xp);
    } else if (xp >= 18247 && xp < 20224) {
        plyr.level.num = 33;
        plyr.experience.xp = 18247;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 20224;
        plyr.experience.remainingXP = (20224 - xp);
    } else if (xp >= 20224 && xp < 22406) {
        plyr.level.num = 34;
        plyr.experience.xp = 20224;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 22406;
        plyr.experience.remainingXP = (22406 - xp);
    } else if (xp >= 22406 && xp < 24815) {
        // Players can choose a non-tourney legal stage to play on
        plyr.experience.xp = 22406;
        plyr.level.num = 35;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 24815;
        plyr.experience.remainingXP = (24815 - xp);
    } else if (xp >= 24815 && xp < 27473) {
        plyr.level.num = 36;
        plyr.experience.xp = 24815;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 27473;
        plyr.experience.remainingXP = (27473 - xp);
    } else if (xp >= 27473 && xp < 30408) {
        plyr.level.num = 37;
        plyr.experience.xp = 27473;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 30408;
        plyr.experience.remainingXP = (30408 - xp);
    } else if (xp >= 30408 && xp < 33648) {
        plyr.level.num = 38;
        plyr.experience.xp = 30408;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 33648;
        plyr.experience.remainingXP = (33648 - xp);
    } else if (xp >= 33648 && xp < 37224) {
        plyr.level.num = 39;
        plyr.experience.xp = 33648;
        plyr.level.name = `Adamantite Scimitar`;
        plyr.experience.nextLevelAt = 37224;
        plyr.experience.remainingXP = (37224 - xp);
    } else if (xp >= 37224 && xp < 41171) {
        // Players can challenge others to a Bo5
        plyr.experience.xp = 37224;
        plyr.level.num = 40;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 41171;
        plyr.experience.remainingXP = (41171 - xp);
    } else if (xp >= 41171 && xp < 45529) {
        plyr.level.num = 41;
        plyr.experience.xp = 41171;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 45529;
        plyr.experience.remainingXP = (45529 - xp);
    } else if (xp >= 45529 && xp < 50339) {
        plyr.level.num = 42;
        plyr.experience.xp = 45529;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 50339;
        plyr.experience.remainingXP = (50339 - xp);
    } else if (xp >= 50339 && xp < 55649) {
        plyr.level.num = 43;
        plyr.experience.xp = 50339;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 55649;
        plyr.experience.remainingXP = (55649 - xp);
    } else if (xp >= 55649 && xp < 61512) {
        plyr.level.num = 44;
        plyr.experience.xp = 55649;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 61512;
        plyr.experience.remainingXP = (61512 - xp);
    } else if (xp >= 61512 && xp < 67983) {
        plyr.level.num = 45;
        plyr.experience.xp = 61512;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 67983;
        plyr.experience.remainingXP = (67983 - xp);
    } else if (xp >= 67983 && xp < 75127) {
        plyr.level.num = 46;
        plyr.experience.xp = 67983;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 75127;
        plyr.experience.remainingXP = (75127 - xp);
    } else if (xp >= 75127 && xp < 83014) {
        plyr.level.num = 47;
        plyr.experience.xp = 75127;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 83014;
        plyr.experience.remainingXP = (83014 - xp);
    } else if (xp >= 83014 && xp < 91721) {
        plyr.level.num = 48;
        plyr.experience.xp = 83014;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 91721;
        plyr.experience.remainingXP = (91721 - xp);
    } else if (xp >= 91721 && xp < 101333) {
        plyr.level.num = 49;
        plyr.experience.xp = 91721;
        plyr.level.name = `Rune Scimitar`;
        plyr.experience.nextLevelAt = 101333;
        plyr.experience.remainingXP = (101333 - xp);
    } else if (xp >= 101333 && xp < 111945) {
        // Players can choose another level 50 Player and Challenge them to a Doubles match (the teammates can be lower than Level 50)
        plyr.experience.xp = 101333;
        plyr.level.num = 50;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 111945;
        plyr.experience.remainingXP = (111945 - xp);
    } else if (xp >= 111945 && xp < 123660) {
        plyr.level.num = 51;
        plyr.experience.xp = 111945;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 123660;
        plyr.experience.remainingXP = (123660 - xp);
    } else if (xp >= 123660 && xp < 136594) {
        plyr.level.num = 52;
        plyr.experience.xp = 123660;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 136594;
        plyr.experience.remainingXP = (136594 - xp);
    } else if (xp >= 136594 && xp < 150872) {
        plyr.level.num = 53;
        plyr.experience.xp = 136594;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 150872;
        plyr.experience.remainingXP = (150872 - xp);
    } else if (xp >= 150872 && xp < 166636) {
        plyr.level.num = 54;
        plyr.experience.xp = 150872;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 166636;
        plyr.experience.remainingXP = (166636 - xp);
    } else if (xp >= 166636 && xp < 184040) {
        // Players can choose a Custom Stage to play on (MUST BE TOS LEGAL)
        plyr.experience.xp = 166636;
        plyr.level.num = 55;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 184040;
        plyr.experience.remainingXP = (184040 - xp);
    } else if (xp >= 184040 && xp < 203254) {
        plyr.level.num = 56;
        plyr.experience.xp = 184040;
        plyr.level.name = `Gomu Gomu`;
        plyr.experience.nextLevelAt = 203254;
        plyr.experience.remainingXP = (203254 - xp);
    } else if (xp >= 203254 && xp < 224466) {
        plyr.level.num = 57;
        plyr.experience.xp = 203254;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 224466;
        plyr.experience.remainingXP = (224466 - xp);
    } else if (xp >= 224466 && xp < 247886) {
        plyr.level.num = 58;
        plyr.experience.xp = 224466;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 247886;
        plyr.experience.remainingXP = (247886 - xp);
    } else if (xp >= 247886 && xp < 273742) {
        plyr.level.num = 59;
        plyr.experience.xp = 247886;
        plyr.level.name = `Gilded Scimitar`;
        plyr.experience.nextLevelAt = 273742;
        plyr.experience.remainingXP = (273742 - xp);
    } else if (xp >= 273742 && xp < 302288) {
        // Players can challenge others to a Ft5
        plyr.experience.xp = 273742;
        plyr.level.num = 60;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 302288;
        plyr.experience.remainingXP = (302288 - xp);
    } else if (xp >= 302288 && xp < 333804) {
        plyr.level.num = 61;
        plyr.experience.xp = 302288;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 333804;
        plyr.experience.remainingXP = (333804 - xp);
    } else if (xp >= 333804 && xp < 368599) {
        plyr.level.num = 62;
        plyr.experience.xp = 333804;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 368599;
        plyr.experience.remainingXP = (368599 - xp);
    } else if (xp >= 368599 && xp < 407015) {
        plyr.level.num = 63;
        plyr.experience.xp = 368599;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 407015;
        plyr.experience.remainingXP = (407015 - xp);
    } else if (xp >= 407015 && xp < 449428) {
        plyr.level.num = 64;
        plyr.experience.xp = 407015;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 449428;
        plyr.experience.remainingXP = (449428 - xp);
    } else if (xp >= 449428 && xp < 496254) {
        // Players no longer need to be Sub for Bo5's
        plyr.experience.xp = 449428;
        plyr.level.num = 65;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 496254;
        plyr.experience.remainingXP = (496254 - xp);
    } else if (xp >= 496254 && xp < 547953) {
        plyr.level.num = 66;
        plyr.experience.xp = 496254;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 547953;
        plyr.experience.remainingXP = (547953 - xp);
    } else if (xp >= 547953 && xp < 605032) {
        plyr.level.num = 67;
        plyr.experience.xp = 547953;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 605032;
        plyr.experience.remainingXP = (605032 - xp);
    } else if (xp >= 605032 && xp < 668051) {
        plyr.level.num = 68;
        plyr.experience.xp = 605032;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 668051;
        plyr.experience.remainingXP = (668051 - xp);
    } else if (xp >= 668051 && xp < 737627) {
        plyr.level.num = 69;
        plyr.experience.xp = 668051;
        plyr.level.name = `Dragon Scimitar`;
        plyr.experience.nextLevelAt = 737627;
        plyr.experience.remainingXP = (737627 - xp);
    } else if (xp >= 737627 && xp < 814445) {
        // Players name is entered into the Pot for the chance to be the Raid Boss (either yourself or an Amiibo) in a Coliseum Clash
        plyr.experience.xp = 737627;
        plyr.level.num = 70;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 814445;
        plyr.experience.remainingXP = (814445 - xp);
    } else if (xp >= 814445 && xp < 899257) {
        plyr.level.num = 71;
        plyr.experience.xp = 814445;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 899257;
        plyr.experience.remainingXP = (899257 - xp);
    } else if (xp >= 899257 && xp < 992895) {
        plyr.level.num = 72;
        plyr.experience.xp = 899257;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 992895;
        plyr.experience.remainingXP = (992895 - xp);
    } else if (xp >= 992895 && xp < 1096278) {
        plyr.level.num = 73;
        plyr.experience.xp = 992895;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1096278;
        plyr.experience.remainingXP = (1096278 - xp);
    } else if (xp >= 1096278 && xp < 1210421) {
        plyr.level.num = 74;
        plyr.experience.xp = 1096278;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1210421;
        plyr.experience.remainingXP = (1210421 - xp);
    } else if (xp >= 1210421 && xp < 1336443) {
        plyr.level.num = 75;
        plyr.experience.xp = 1210421;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1336443;
        plyr.experience.remainingXP = (1336443 - xp);
    } else if (xp >= 1336443 && xp < 1475581) {
        plyr.level.num = 76;
        plyr.experience.xp = 1336443;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1475581;
        plyr.experience.remainingXP = (1475581 - xp);
    } else if (xp >= 1475581 && xp < 1629200) {
        plyr.level.num = 77;
        plyr.experience.xp = 1475581;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1629200;
        plyr.experience.remainingXP = (1629200 - xp);
    } else if (xp >= 1629200 && xp < 1798808) {
        plyr.level.num = 78;
        plyr.experience.xp = 1629200;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1798808;
        plyr.experience.remainingXP = (1798808 - xp);
    } else if (xp >= 1798808 && xp < 1986068) {
        plyr.level.num = 79;
        plyr.experience.xp = 1798808;
        plyr.level.name = `Abyssal Whip`;
        plyr.experience.nextLevelAt = 1986068;
        plyr.experience.remainingXP = (1986068 - xp);
    } else if (xp >= 1986068 && xp < 2192818) {
        // Players can challenge others to a ft10
        plyr.experience.xp = 1986068;
        plyr.level.num = 80;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 2192818;
        plyr.experience.remainingXP = (2192818 - xp);
    } else if (xp >= 2192818 && xp < 2421087) {
        plyr.level.num = 81;
        plyr.experience.xp = 2192818;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 2421087;
        plyr.experience.remainingXP = (2421087 - xp);
    } else if (xp >= 2421087 && xp < 2673114) {
        plyr.level.num = 82;
        plyr.experience.xp = 2421087;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 2673114;
        plyr.experience.remainingXP = (2673114 - xp);
    } else if (xp >= 2673114 && xp < 2951373) {
        plyr.level.num = 83;
        plyr.experience.xp = 2673114;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 2951373;
        plyr.experience.remainingXP = (2951373 - xp);
    } else if (xp >= 2951373 && xp < 3258594) {
        plyr.level.num = 84;
        plyr.experience.xp = 2951373;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 3258594;
        plyr.experience.remainingXP = (3258594 - xp);
    } else if (xp >= 3258594 && xp < 3597792) {
        plyr.level.num = 85;
        plyr.experience.xp = 3258594;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 3597792;
        plyr.experience.remainingXP = (3597792 - xp);
    } else if (xp >= 3597792 && xp < 3972294) {
        plyr.level.num = 86;
        plyr.experience.xp = 3597792;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 3972294;
        plyr.experience.remainingXP = (3972294 - xp);
    } else if (xp >= 3972294 && xp < 4385776) {
        plyr.level.num = 87;
        plyr.experience.xp = 3972294;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 4385776;
        plyr.experience.remainingXP = (4385776 - xp);
    } else if (xp >= 4385776 && xp < 4842295) {
        plyr.level.num = 88;
        plyr.experience.xp = 4385776;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 4842295;
        plyr.experience.remainingXP = (4842295 - xp);
    } else if (xp >= 4842295 && xp < 5346332) {
        plyr.level.num = 89;
        plyr.experience.xp = 4842295;
        plyr.level.name = `Dragon Hunter Crossbow`;
        plyr.experience.nextLevelAt = 5346332;
        plyr.experience.remainingXP = (5346332 - xp);
    } else if (xp >= 5346332 && xp < 5902831) {
        // Players can have Kay create an emote of their design for the Discord/Twitch
        plyr.experience.xp = 5346332;
        plyr.level.num = 90;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 5902831;
        plyr.experience.remainingXP = (5902831 - xp);
    } else if (xp >= 5902831 && xp < 6517253) {
        plyr.level.num = 91;
        plyr.experience.xp = 5902831;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 6517253;
        plyr.experience.remainingXP = (6517253 - xp);
    } else if (xp >= 6517253 && xp < 7195629) {
        // Players can choose the character and fill in the blank => '"_____" Only Hats Off!'
        plyr.experience.xp = 6517253;
        plyr.level.num = 92;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 7195629;
        plyr.experience.remainingXP = (7195629 - xp);
    } else if (xp >= 7195629 && xp < 7944614) {
        plyr.level.num = 93;
        plyr.experience.xp = 7195629;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 7944614;
        plyr.experience.remainingXP = (7944614 - xp);
    } else if (xp >= 7944614 && xp < 8771558) {
        plyr.level.num = 94;
        plyr.experience.xp = 7944614;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 8771558;
        plyr.experience.remainingXP = (8771558 - xp);
    } else if (xp >= 8771558 && xp < 9684577) {
        plyr.level.num = 95;
        plyr.experience.xp = 8771558;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 9684577;
        plyr.experience.remainingXP = (9684577 - xp);
    } else if (xp >= 9684577 && xp < 10692629) {
        plyr.level.num = 96;
        plyr.experience.xp = 9684577;
        plyr.level.name = `Twisted Bow`;
        plyr.experience.nextLevelAt = 10692629;
        plyr.experience.remainingXP = (10692629 - xp);
    } else if (xp >= 10692629 && xp < 11805606) {
        plyr.level.num = 97;
        plyr.experience.xp = 10692629;
        plyr.level.name = `Fish Sack`;
        plyr.experience.nextLevelAt = 11805606;
        plyr.experience.remainingXP = (11805606 - xp);
    } else if (xp >= 11805606 && xp < 13034431) {
        plyr.level.num = 98;
        plyr.experience.xp = 11805606;
        plyr.level.name = `Golden Tench`;
        plyr.experience.nextLevelAt = 13034431;
        plyr.experience.remainingXP = (13034431 - xp);
    } else if (xp >= 13034431) {
        // Players can get a t-shirt from Creative Workshop
        plyr.experience.xp = 13034431;
        plyr.level.num = 99;
        plyr.level.name = `Top Hat`;
        plyr.experience.nextLevelAt = 999999999;
        plyr.experience.remainingXP = (999999999 - xp);
    }

    return plyr as Player;
}

export const calcLevelFromExperience = (xp) => {
    let level: Level = { num: 0, name: `` };
    let experience: Experience = { xp: 0, arenaXP: xp, nextLevelAt: 0, remainingXP: 0 };
    if (xp < 83) {
        level.num = 1;
        experience.xp = 0;
        experience.nextLevelAt = 83;
        level.name = `Bronze Scimitar`;
        experience.remainingXP = 83;
    } else if (xp >= 83 && xp < 174) {
        level.num = 2;
        experience.xp = 83;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 174;
        experience.remainingXP = (174 - xp);
    } else if (xp >= 174 && xp < 276) {
        level.num = 3;
        experience.xp = 174;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 276;
        experience.remainingXP = (276 - xp);
    } else if (xp >= 276 && xp < 388) {
        level.num = 4;
        experience.xp = 276;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 388;
        experience.remainingXP = (388 - xp);
    } else if (xp >= 388 && xp < 512) {
        level.num = 5;
        experience.xp = 388;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 512;
        experience.remainingXP = (512 - xp);
    } else if (xp >= 512 && xp < 650) {
        level.num = 6;
        experience.xp = 512;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 650;
        experience.remainingXP = (650 - xp);
    } else if (xp >= 650 && xp < 801) {
        level.num = 7;
        experience.xp = 650;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 801;
        experience.remainingXP = (801 - xp);
    } else if (xp >= 801 && xp < 969) {
        level.num = 8;
        experience.xp = 801;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 969;
        experience.remainingXP = (969 - xp);
    } else if (xp >= 969 && xp < 1154) {
        level.num = 9;
        experience.xp = 969;
        level.name = `Bronze Scimitar`;
        experience.nextLevelAt = 1154;
        experience.remainingXP = (1154 - xp);
    } else if (xp >= 1154 && xp < 1358) {
        level.num = 10;
        experience.xp = 1154;
        level.name = `Iron Scimitar`;
        experience.nextLevelAt = 1358;
        experience.remainingXP = (1358 - xp);
    } else if (xp >= 1358 && xp < 1584) {
        level.num = 11;
        experience.xp = 1358;
        level.name = `Iron Scimitar`;
        experience.nextLevelAt = 1584;
        experience.remainingXP = (1584 - xp);
    } else if (xp >= 1584 && xp < 1833) {
        level.num = 12;
        experience.xp = 1584;
        level.name = `Iron Scimitar`;
        experience.nextLevelAt = 1833;
        experience.remainingXP = (1833 - xp);
    } else if (xp >= 1833 && xp < 2107) {
        level.num = 13;
        experience.xp = 1833;
        level.name = `Iron Scimitar`;
        experience.nextLevelAt = 2107;
        experience.remainingXP = (2107 - xp);
    } else if (xp >= 2107 && xp < 2411) {
        level.num = 14;
        experience.xp = 2107;
        level.name = `Iron Scimitar`;
        experience.nextLevelAt = 2411;
        experience.remainingXP = (2411 - xp);
    } else if (xp >= 2411 && xp < 2746) {
        level.num = 15;
        experience.xp = 2411;
        level.name = `Steel Scimitar`;
        experience.nextLevelAt = 2746;
        experience.remainingXP = (2746 - xp);
    } else if (xp >= 2746 && xp < 3115) {
        level.num = 16;
        experience.xp = 2746;
        level.name = `Steel Scimitar`;
        experience.nextLevelAt = 3115;
        experience.remainingXP = (3115 - xp);
    } else if (xp >= 3115 && xp < 3523) {
        level.num = 17;
        experience.xp = 3115;
        level.name = `Steel Scimitar`;
        experience.nextLevelAt = 3523;
        experience.remainingXP = (3523 - xp);
    } else if (xp >= 3523 && xp < 3973) {
        level.num = 18;
        experience.xp = 3523;
        level.name = `Steel Scimitar`;
        experience.nextLevelAt = 3973;
        experience.remainingXP = (3973 - xp);
    } else if (xp >= 3973 && xp < 4470) {
        level.num = 19;
        experience.xp = 3973;
        level.name = `Steel Scimitar`;
        experience.nextLevelAt = 4470;
        experience.remainingXP = (4470 - xp);
    } else if (xp >= 4470 && xp < 5018) {
        level.num = 20;
        experience.xp = 4470;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 5018;
        experience.remainingXP = (5018 - xp);
    } else if (xp >= 5018 && xp < 5624) {
        level.num = 21;
        experience.xp = 5018;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 5624;
        experience.remainingXP = (5624 - xp);
    } else if (xp >= 5624 && xp < 6291) {
        level.num = 22;
        experience.xp = 5624;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 6291;
        experience.remainingXP = (6291 - xp);
    } else if (xp >= 6291 && xp < 7028) {
        level.num = 23;
        experience.xp = 6291;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 7028;
        experience.remainingXP = (7028 - xp);
    } else if (xp >= 7028 && xp < 7842) {
        level.num = 24;
        experience.xp = 7028;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 7842;
        experience.remainingXP = (7842 - xp);
    } else if (xp >= 7842 && xp < 8740) {
        level.num = 25;
        experience.xp = 7842;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 8740;
        experience.remainingXP = (8740 - xp);
    } else if (xp >= 8740 && xp < 9730) {
        level.num = 26;
        experience.xp = 8740;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 9730;
        experience.remainingXP = (9730 - xp);
    } else if (xp >= 9730 && xp < 10824) {
        level.num = 27;
        experience.xp = 9730;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 10824;
        experience.remainingXP = (10824 - xp);
    } else if (xp >= 10824 && xp < 12031) {
        level.num = 28;
        experience.xp = 10824;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 12031;
        experience.remainingXP = (12031 - xp);
    } else if (xp >= 12031 && xp < 13363) {
        level.num = 29;
        experience.xp = 12031;
        level.name = `Mithril Scimitar`;
        experience.nextLevelAt = 13363;
        experience.remainingXP = (13363 - xp);
    } else if (xp >= 13363 && xp < 14833) {
        // Players can challenge others to a bot3
        experience.xp = 13363;
        level.num = 30;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 14833;
        experience.remainingXP = (14833 - xp);
    } else if (xp >= 14833 && xp < 16456) {
        level.num = 31;
        experience.xp = 14833;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 16456;
        experience.remainingXP = (16456 - xp);
    } else if (xp >= 16456 && xp < 18247) {
        level.num = 32;
        experience.xp = 16456;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 18247;
        experience.remainingXP = (18247 - xp);
    } else if (xp >= 18247 && xp < 20224) {
        level.num = 33;
        experience.xp = 18247;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 20224;
        experience.remainingXP = (20224 - xp);
    } else if (xp >= 20224 && xp < 22406) {
        level.num = 34;
        experience.xp = 20224;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 22406;
        experience.remainingXP = (22406 - xp);
    } else if (xp >= 22406 && xp < 24815) {
        // Players can choose a non-tourney legal stage to play on
        experience.xp = 22406;
        level.num = 35;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 24815;
        experience.remainingXP = (24815 - xp);
    } else if (xp >= 24815 && xp < 27473) {
        level.num = 36;
        experience.xp = 24815;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 27473;
        experience.remainingXP = (27473 - xp);
    } else if (xp >= 27473 && xp < 30408) {
        level.num = 37;
        experience.xp = 27473;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 30408;
        experience.remainingXP = (30408 - xp);
    } else if (xp >= 30408 && xp < 33648) {
        level.num = 38;
        experience.xp = 30408;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 33648;
        experience.remainingXP = (33648 - xp);
    } else if (xp >= 33648 && xp < 37224) {
        level.num = 39;
        experience.xp = 33648;
        level.name = `Adamantite Scimitar`;
        experience.nextLevelAt = 37224;
        experience.remainingXP = (37224 - xp);
    } else if (xp >= 37224 && xp < 41171) {
        // Players can challenge others to a Bo5
        experience.xp = 37224;
        level.num = 40;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 41171;
        experience.remainingXP = (41171 - xp);
    } else if (xp >= 41171 && xp < 45529) {
        level.num = 41;
        experience.xp = 41171;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 45529;
        experience.remainingXP = (45529 - xp);
    } else if (xp >= 45529 && xp < 50339) {
        level.num = 42;
        experience.xp = 45529;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 50339;
        experience.remainingXP = (50339 - xp);
    } else if (xp >= 50339 && xp < 55649) {
        level.num = 43;
        experience.xp = 50339;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 55649;
        experience.remainingXP = (55649 - xp);
    } else if (xp >= 55649 && xp < 61512) {
        level.num = 44;
        experience.xp = 55649;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 61512;
        experience.remainingXP = (61512 - xp);
    } else if (xp >= 61512 && xp < 67983) {
        level.num = 45;
        experience.xp = 61512;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 67983;
        experience.remainingXP = (67983 - xp);
    } else if (xp >= 67983 && xp < 75127) {
        level.num = 46;
        experience.xp = 67983;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 75127;
        experience.remainingXP = (75127 - xp);
    } else if (xp >= 75127 && xp < 83014) {
        level.num = 47;
        experience.xp = 75127;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 83014;
        experience.remainingXP = (83014 - xp);
    } else if (xp >= 83014 && xp < 91721) {
        level.num = 48;
        experience.xp = 83014;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 91721;
        experience.remainingXP = (91721 - xp);
    } else if (xp >= 91721 && xp < 101333) {
        level.num = 49;
        experience.xp = 91721;
        level.name = `Rune Scimitar`;
        experience.nextLevelAt = 101333;
        experience.remainingXP = (101333 - xp);
    } else if (xp >= 101333 && xp < 111945) {
        // Players can choose another level 50 Player and Challenge them to a Doubles match (the teammates can be lower than Level 50)
        experience.xp = 101333;
        level.num = 50;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 111945;
        experience.remainingXP = (111945 - xp);
    } else if (xp >= 111945 && xp < 123660) {
        level.num = 51;
        experience.xp = 111945;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 123660;
        experience.remainingXP = (123660 - xp);
    } else if (xp >= 123660 && xp < 136594) {
        level.num = 52;
        experience.xp = 123660;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 136594;
        experience.remainingXP = (136594 - xp);
    } else if (xp >= 136594 && xp < 150872) {
        level.num = 53;
        experience.xp = 136594;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 150872;
        experience.remainingXP = (150872 - xp);
    } else if (xp >= 150872 && xp < 166636) {
        level.num = 54;
        experience.xp = 150872;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 166636;
        experience.remainingXP = (166636 - xp);
    } else if (xp >= 166636 && xp < 184040) {
        // Players can choose a Custom Stage to play on (MUST BE TOS LEGAL)
        experience.xp = 166636;
        level.num = 55;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 184040;
        experience.remainingXP = (184040 - xp);
    } else if (xp >= 184040 && xp < 203254) {
        level.num = 56;
        experience.xp = 184040;
        level.name = `Gomu Gomu`;
        experience.nextLevelAt = 203254;
        experience.remainingXP = (203254 - xp);
    } else if (xp >= 203254 && xp < 224466) {
        level.num = 57;
        experience.xp = 203254;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 224466;
        experience.remainingXP = (224466 - xp);
    } else if (xp >= 224466 && xp < 247886) {
        level.num = 58;
        experience.xp = 224466;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 247886;
        experience.remainingXP = (247886 - xp);
    } else if (xp >= 247886 && xp < 273742) {
        level.num = 59;
        experience.xp = 247886;
        level.name = `Gilded Scimitar`;
        experience.nextLevelAt = 273742;
        experience.remainingXP = (273742 - xp);
    } else if (xp >= 273742 && xp < 302288) {
        // Players can challenge others to a Ft5
        experience.xp = 273742;
        level.num = 60;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 302288;
        experience.remainingXP = (302288 - xp);
    } else if (xp >= 302288 && xp < 333804) {
        level.num = 61;
        experience.xp = 302288;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 333804;
        experience.remainingXP = (333804 - xp);
    } else if (xp >= 333804 && xp < 368599) {
        level.num = 62;
        experience.xp = 333804;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 368599;
        experience.remainingXP = (368599 - xp);
    } else if (xp >= 368599 && xp < 407015) {
        level.num = 63;
        experience.xp = 368599;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 407015;
        experience.remainingXP = (407015 - xp);
    } else if (xp >= 407015 && xp < 449428) {
        level.num = 64;
        experience.xp = 407015;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 449428;
        experience.remainingXP = (449428 - xp);
    } else if (xp >= 449428 && xp < 496254) {
        // Players no longer need to be Sub for Bo5's
        experience.xp = 449428;
        level.num = 65;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 496254;
        experience.remainingXP = (496254 - xp);
    } else if (xp >= 496254 && xp < 547953) {
        level.num = 66;
        experience.xp = 496254;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 547953;
        experience.remainingXP = (547953 - xp);
    } else if (xp >= 547953 && xp < 605032) {
        level.num = 67;
        experience.xp = 547953;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 605032;
        experience.remainingXP = (605032 - xp);
    } else if (xp >= 605032 && xp < 668051) {
        level.num = 68;
        experience.xp = 605032;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 668051;
        experience.remainingXP = (668051 - xp);
    } else if (xp >= 668051 && xp < 737627) {
        level.num = 69;
        experience.xp = 668051;
        level.name = `Dragon Scimitar`;
        experience.nextLevelAt = 737627;
        experience.remainingXP = (737627 - xp);
    } else if (xp >= 737627 && xp < 814445) {
        // Players name is entered into the Pot for the chance to be the Raid Boss (either yourself or an Amiibo) in a Coliseum Clash
        experience.xp = 737627;
        level.num = 70;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 814445;
        experience.remainingXP = (814445 - xp);
    } else if (xp >= 814445 && xp < 899257) {
        level.num = 71;
        experience.xp = 814445;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 899257;
        experience.remainingXP = (899257 - xp);
    } else if (xp >= 899257 && xp < 992895) {
        level.num = 72;
        experience.xp = 899257;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 992895;
        experience.remainingXP = (992895 - xp);
    } else if (xp >= 992895 && xp < 1096278) {
        level.num = 73;
        experience.xp = 992895;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1096278;
        experience.remainingXP = (1096278 - xp);
    } else if (xp >= 1096278 && xp < 1210421) {
        level.num = 74;
        experience.xp = 1096278;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1210421;
        experience.remainingXP = (1210421 - xp);
    } else if (xp >= 1210421 && xp < 1336443) {
        level.num = 75;
        experience.xp = 1210421;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1336443;
        experience.remainingXP = (1336443 - xp);
    } else if (xp >= 1336443 && xp < 1475581) {
        level.num = 76;
        experience.xp = 1336443;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1475581;
        experience.remainingXP = (1475581 - xp);
    } else if (xp >= 1475581 && xp < 1629200) {
        level.num = 77;
        experience.xp = 1475581;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1629200;
        experience.remainingXP = (1629200 - xp);
    } else if (xp >= 1629200 && xp < 1798808) {
        level.num = 78;
        experience.xp = 1629200;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1798808;
        experience.remainingXP = (1798808 - xp);
    } else if (xp >= 1798808 && xp < 1986068) {
        level.num = 79;
        experience.xp = 1798808;
        level.name = `Abyssal Whip`;
        experience.nextLevelAt = 1986068;
        experience.remainingXP = (1986068 - xp);
    } else if (xp >= 1986068 && xp < 2192818) {
        // Players can challenge others to a ft10
        experience.xp = 1986068;
        level.num = 80;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 2192818;
        experience.remainingXP = (2192818 - xp);
    } else if (xp >= 2192818 && xp < 2421087) {
        level.num = 81;
        experience.xp = 2192818;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 2421087;
        experience.remainingXP = (2421087 - xp);
    } else if (xp >= 2421087 && xp < 2673114) {
        level.num = 82;
        experience.xp = 2421087;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 2673114;
        experience.remainingXP = (2673114 - xp);
    } else if (xp >= 2673114 && xp < 2951373) {
        level.num = 83;
        experience.xp = 2673114;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 2951373;
        experience.remainingXP = (2951373 - xp);
    } else if (xp >= 2951373 && xp < 3258594) {
        level.num = 84;
        experience.xp = 2951373;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 3258594;
        experience.remainingXP = (3258594 - xp);
    } else if (xp >= 3258594 && xp < 3597792) {
        level.num = 85;
        experience.xp = 3258594;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 3597792;
        experience.remainingXP = (3597792 - xp);
    } else if (xp >= 3597792 && xp < 3972294) {
        level.num = 86;
        experience.xp = 3597792;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 3972294;
        experience.remainingXP = (3972294 - xp);
    } else if (xp >= 3972294 && xp < 4385776) {
        level.num = 87;
        experience.xp = 3972294;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 4385776;
        experience.remainingXP = (4385776 - xp);
    } else if (xp >= 4385776 && xp < 4842295) {
        level.num = 88;
        experience.xp = 4385776;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 4842295;
        experience.remainingXP = (4842295 - xp);
    } else if (xp >= 4842295 && xp < 5346332) {
        level.num = 89;
        experience.xp = 4842295;
        level.name = `Dragon Hunter Crossbow`;
        experience.nextLevelAt = 5346332;
        experience.remainingXP = (5346332 - xp);
    } else if (xp >= 5346332 && xp < 5902831) {
        // Players can have Kay create an emote of their design for the Discord/Twitch
        experience.xp = 5346332;
        level.num = 90;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 5902831;
        experience.remainingXP = (5902831 - xp);
    } else if (xp >= 5902831 && xp < 6517253) {
        level.num = 91;
        experience.xp = 5902831;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 6517253;
        experience.remainingXP = (6517253 - xp);
    } else if (xp >= 6517253 && xp < 7195629) {
        // Players can choose the character and fill in the blank => '"_____" Only Hats Off!'
        experience.xp = 6517253;
        level.num = 92;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 7195629;
        experience.remainingXP = (7195629 - xp);
    } else if (xp >= 7195629 && xp < 7944614) {
        level.num = 93;
        experience.xp = 7195629;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 7944614;
        experience.remainingXP = (7944614 - xp);
    } else if (xp >= 7944614 && xp < 8771558) {
        level.num = 94;
        experience.xp = 7944614;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 8771558;
        experience.remainingXP = (8771558 - xp);
    } else if (xp >= 8771558 && xp < 9684577) {
        level.num = 95;
        experience.xp = 8771558;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 9684577;
        experience.remainingXP = (9684577 - xp);
    } else if (xp >= 9684577 && xp < 10692629) {
        level.num = 96;
        experience.xp = 9684577;
        level.name = `Twisted Bow`;
        experience.nextLevelAt = 10692629;
        experience.remainingXP = (10692629 - xp);
    } else if (xp >= 10692629 && xp < 11805606) {
        level.num = 97;
        experience.xp = 10692629;
        level.name = `Fish Sack`;
        experience.nextLevelAt = 11805606;
        experience.remainingXP = (11805606 - xp);
    } else if (xp >= 11805606 && xp < 13034431) {
        level.num = 98;
        experience.xp = 11805606;
        level.name = `Golden Tench`;
        experience.nextLevelAt = 13034431;
        experience.remainingXP = (13034431 - xp);
    } else if (xp >= 13034431) {
        // Players can get a t-shirt from Creative Workshop
        experience.xp = 13034431;
        level.num = 99;
        level.name = `Top Hat`;
        experience.nextLevelAt = 999999999;
        experience.remainingXP = (999999999 - xp);
    }

    return {
        xp,
        level,
        experience
    }
}