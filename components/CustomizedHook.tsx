import * as React from 'react';
import { useContext } from "react";
import Player from '../models/Player';
import PlayerOption from './PlayerOption';
import { StateContext } from '../pages/_app';
import { styled } from '@mui/material/styles';
import { getActivePlayers } from './smasherscape';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import useAutocomplete, { AutocompleteGetTagProps } from '@mui/base/useAutocomplete';

const Root = styled(`div`)(
  ({ theme }) => `
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    font-size: 14px;
  `,
);

const InputWrapper = styled(`div`)(
  ({ theme }) => `
  width: 100%;
  flex-direction: row;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background: #141414;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,.85)'
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`,
);

interface TagProps extends ReturnType<AutocompleteGetTagProps> {
  option: any;
  label: string;
  player: Player;
}

function Tag(props: TagProps) {
  const { option, player, label, onDelete, ...other } = props;
  let playerOption = option;
  return (
    <div className={`playerHookTag`} {...other}>
      <PlayerOption className={`styledTaggetTag`} playerOption={playerOption} />
      <i className="fas fa-times tagCloseIcon" onClick={onDelete}></i>
    </div>
  );
}

const StyledTag = styled(Tag)<TagProps>(
  ({ theme }) => `
  column-gap: 15px;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px;
  line-height: 22px;
  height: var(--customTagHeight);
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 15px 0 10px;
  outline: 0;
  overflow: hidden;

  background: var(--smasherscapeBlue);
  color: white;
  border-radius: 8px;
  border: 2px solid black;
  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  // background: ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'};

  // & span {
  //   overflow: hidden;
  //   white-space: nowrap;
  //   min-width: fit-content;
  //   text-overflow: ellipsis;
  // }

  & i {
    cursor: pointer;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`,
);

const Listbox = styled(`ul`)(
  ({ theme }) => `
  width: 95%;
  margin: 50px 0 0;
  padding: 1em 0;
  position: absolute;
  list-style: none;
  max-width: var(--autocompleteMaxWidth);
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 350px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    transition: var(--transition);
    flex-direction: row;
    border-radius: 8px;
    padding: 5px 12px;
    margin: 0 auto;
    display: flex;
    width: 95%;

    &:hover {
      background: #f5f5f5 !important;
    }

    width: 100%

    & span {
      flex-grow: 1;
      min-width: fit-content;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background: var(--smasherscapeBlue) !important;
    color: white !important;
    font-weight: 600;

    &:hover {
      filter: brightness(1.15);
    }

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`,
);

export default function CustomizedHook(props) {
  const { plays, players, playersToSelect, setPlayersToSelect } = useContext<any>(StateContext);
  const adjustPlayersToSelect = (e: any, val: any) => setPlayersToSelect(val);
  const {
    value,
    focused,
    getTagProps,
    setAnchorEl,
    getRootProps,
    getInputProps,
    getClearProps,
    getOptionProps,
    groupedOptions,
    getListboxProps,
  } = useAutocomplete({
    multiple: true,
    defaultValue: [],
    id: `players-search-complete`,
    getOptionLabel: (option) => option.label,
    options: getActivePlayers(players, true, plays),
    onChange: (e, val: any) => adjustPlayersToSelect(e, val),
    isOptionEqualToValue: (option, value) => option.id === value.id,
  });

  return (
    <Root className={`customHookRoot rootOfCustomHook`}>
      <div {...getRootProps()} className={`customHookRootProps getRootProps`}>
        <div className={`playerHookInputWrapper`}>
          <div className="playerHookInputBG"></div>
          <InputWrapper className={`customHookRoot customHookRootInputWrapper ${focused ? `focused` : ``}`} ref={setAnchorEl}>
            {value.filter(v => playersToSelect.map(plyr => plyr.name).includes(v.name)).map((option: any, index: number) => (
              <div key={index} className={`styledTagWithProps`}><StyledTag {...getTagProps({ index })} label={option.label} player={option} option={option} /></div>
            ))}
            <input className={`playerHookInput`} placeholder={`Start Typing or Click Here to Enter Player(s) to Delete`} {...getInputProps()} />
            <i style={{width: 20, cursor: `pointer`}} className="fas fa-times clearAllTagsIcon" {...getClearProps()}></i>
          </InputWrapper>
        </div>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox className={`customHookListBox`} {...getListboxProps()}>
          {(groupedOptions).map((option, index) => 
            (
              <li className={`customHookOption`} key={index} {...getOptionProps({ option, index })}>
                <div>
                  <PlayerOption className={`playerSelectedInCustomHook`} playerOption={option} />
                </div>
              </li>
            )
          )}
        </Listbox>
      ) : null}
    </Root>
  );
}