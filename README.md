# SmasherScape

![License](https://img.shields.io/github/license/strawhat19/Smasherscape)
![State](https://img.shields.io/github/deployments/strawhat19/Smasherscape/Production)
![Total Lines](https://img.shields.io/tokei/lines/github/strawhat19/Smasherscape)
![Repo Size](https://img.shields.io/github/repo-size/strawhat19/Smasherscape)
![Release](https://img.shields.io/github/release/strawhat19/Smasherscape)

![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

![Screenshot of SmasherScape](./public/assets/images/SmasherScapeDatabasePlaysAndCommands.png)

## About
Smasherscape is a leaderboard system designed for tracking player statistics. This component provides an interactive leaderboard system, where admins can add, delete, update, and search for players, along with their respective statistics.

## Installation
```
git clone git@github.com:strawhat19/Smasherscape.git
cd Smasherscape/
npm install
npm run dev
```

## Usage
Players can level up and gain experience while keeping a track record of their wins, defeats, deaths, characters played and level. Players can level up to gain rewards, search for their card and expand to view details, or view other player data on the leaderboard.

Each player card displays detailed player statistics, including the player's name, level, record, and characters played. Each card also includes an XP progress bar that indicates the player's progress towards the next level.

Open [http://localhost:3000](http://localhost:3000) with your browser, after installation, to see the result of the local development.

Production [https://smasherscape.vercel.app/](https://smasherscape.vercel.app/) to see the production build.

## Table of Contents  
* [About](#about)
* [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [Functions](#functions)
* [Licensing](#licensing)
* [Contact](#contact)

## Features

- **Player Management:** This component allows for adding, deleting, and resetting players.

- **Player Statistics:** Each player has detailed statistics, including their level, experience, and plays.

- **Interactive Search:** An interactive search field allows you to search for specific players.

- **Commands Input:** A dedicated input field allows for entering commands to manipulate player data.

## Functions

### `addPlayers(commandParams)`

This function adds a new player to the leaderboard. It accepts an array of command parameters.

### `deletePlayers(commandParams)`

This function removes a player from the leaderboard. It also accepts an array of command parameters.

### `resetPlayers(commandParams)`

This function resets the statistics of a player. It accepts an array of command parameters.

### `setParameter(commandParams)`

This function sets a specific parameter for a player. It accepts an array of command parameters.

### `giveParameter(commandParams)`

This function increments a player's parameter by a certain amount. It accepts an array of command parameters.

### `updatePlayers(commandParams)`

This function updates player statistics based on their performance in a match. It accepts an array of command parameters.

### `handleCommands(e: FormEvent)`

This function handles the execution of commands entered into the commands input field. It accepts a FormEvent as an argument.

## Licensing
#### 
      MIT License

      Copyright (C) 2012-2023 by various contributors (see AUTHORS)

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE.
      
      Copyright 1998 by the Massachusetts Institute of Technology.

      Permission to use, copy, modify, and distribute this software and its
      documentation for any purpose and without fee is hereby granted, provided that
      the above copyright notice appear in all copies and that both that copyright
      notice and this permission notice appear in supporting documentation, and that
      the name of M.I.T. not be used in advertising or publicity pertaining to
      distribution of the software without specific, written prior permission.
      M.I.T. makes no representations about the suitability of this software for any
      purpose.  It is provided "as is" without express or implied warranty.
#### https://opensource.org/licenses/MIT

## Contact
#### Repository: [*Repo*](https://github.com/strawhat19/Smasherscape)
#### GitHub: [*strawhat19*](https://github.com/strawhat19)
#### Piratechs: [*Piratechs*](https://piratechs.com/)
#### Twitch: [*Twitch.tv/Xuruko*](https://www.twitch.tv/xuruko)
#### Discord: [*Join The Bröthērhoöd Discord*](https://discord.gg/FUXbKfGs29)
#### Contact me or ask me questions at [rahmed@piratechs.com](mailto:rahmed@piratechs.com)