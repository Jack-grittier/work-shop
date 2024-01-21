import { useState } from 'react';
import CodeBlock from './CodeBlock';
import Command from '../models/Command';
import { isInvalid } from './smasherscape';

export const defaultCommands = {
  List: {
    id: 1,
    name: `List`,
    command: `!com`,
    triggers: [`!com`, `!commands`],
    description: `List All Commands`,
  },
  Add: {
    id: 2,
    name: `Add`,
    command: `!add`,
    example: `!add name(s) of player(s)`,
    triggers: [`!add`, `!new`, `!create`, `!player`],
    description: `Add Player(s) separated by spaces`,
  },
  Delete: {
    id: 3,
    name: `Delete`,
    command: `!del`,
    example: `!del name(s) of player(s)`,
    icon: <i className="fas fa-trash-alt"></i>,
    triggers: [`!del`, `!x`, `!delete`, `!remove`],
    shortDescription: `Delete Player(s) from Leaderboard`,
    description: `Delete Player(s) from Leaderboard separated by spaces`,
  },
  // Reset: {
  //   id: 4,
  //   name: `Reset`,
  //   command: `!res`,
  //   triggers: [`!res`, `!reset`],
  //   description: `Reset Leaderboard`,
  // },
  Update: {
    id: 5,
    name: `Update`,
    command: `!upd`,
    icon: <i className="fas fa-signal"></i>,
    description: `Update Player(s) in Leaderboard`,
    triggers: [`!upd`, `!update`, `!game`, `!match`],
    shortDescription: `Update Player(s) in Leaderboard`,
    example: `!upd winner vs loser with winChar vs loseChar stocksTakenFromWinner`,
  },
  // Set: {
  //   id: 6,
  //   name: `Set`,
  //   command: `!set`,
  //   triggers: [`!set`, `!change`],
  //   example: `!set playerName (xp) amount`,
  //   description: `Set Parameter for Player`,
  // },
  // Give: {
  //   id: 7,
  //   name: `Give`,
  //   command: `!giv`,
  //   triggers: [`!giv`, `!give`],
  //   example: `!giv playerName (xp) amount`,
  //   description: `Give Parameter to Player`,
  // },
};

export function Commands(props) {
  let { id, commands, devEnv } = props;
  let [commandsToRender, setCommandsToRender] = useState<Command[]>(Object.values(commands).map((comm: Command) => {
    let commandObj = new Command(comm);
    Object.keys(commandObj).forEach(key => isInvalid(commandObj[key]) && delete commandObj[key]);
    return commandObj as Command;
  }));

  console.log(`Commands`, commandsToRender);

  return (
    <ul id={id} className={`commandsList`}>
      {commandsToRender.map((comm: Command, commIndex) => {
        let commandMessage = comm?.example ? comm?.example : comm?.command;
        return (
          <li className={`listedCommand`} key={commIndex} title={`${comm?.description}: ${commandMessage}`}>
            <span className="commandIndex">{commIndex + 1}.</span>
            <div className="commandDetails flex gap15">
              <CodeBlock custombutton={false} id={`comm-${comm?.id}`} language={`js`}>
                {commandMessage}
              </CodeBlock>
              <div className={`desc`}>{comm?.description}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}