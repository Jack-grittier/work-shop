import User from '../models/User';
import Player from '../models/Player';
import { StateContext } from '../pages/_app';
import Parameters from '../models/Parameters';
import React, { useState, useContext } from 'react';
import { processCommandsWithParameters, updatePlayersLocalStorage } from './PlayerForm';

export default function CodeBlock(props) {
    let [clicked, setClicked] = useState(false);
    let [CMDClicked, setCMDClicked] = useState(false);

    const { user, players, setPlayers, setFilteredPlayers, useDatabase, databasePlayers, sameNamePlayeredEnabled, deleteCompletely, commands, setLoadingPlayers, plays, setPlays } = useContext<any>(StateContext);

    const handleCopyClick = (e, type?: string, user?: User | Player, plays?: any, setPlays?: any) => {
        if (type == `copy`) {
            setCMDClicked(true);
            navigator.clipboard.writeText(props.children);
            setTimeout(() => setCMDClicked(false), 1500);
        } else {
            setClicked(true);
            let command = props.children;
            let commandParams = command.split(` `);
            const parameters = new Parameters({
                user,
                plays,
                command,
                players, 
                commands,
                setPlays,
                setPlayers, 
                useDatabase, 
                commandParams, 
                databasePlayers, 
                deleteCompletely,
                setLoadingPlayers, 
                setFilteredPlayers,
                sameNamePlayeredEnabled,
                updatePlayersLocalStorage,
            })
            processCommandsWithParameters(parameters);
            setTimeout(() => setClicked(false), 1500);
        }
    };
    return (
        <div className="nextra-code-block nx-relative nx-mt-6 first:nx-mt-0">
            <pre style={{border: props.border ? props.border : `none`}} className="nx-bg-primary-700/5 nx-mb-4 nx-overflow-x-auto nx-rounded-xl nx-font-medium nx-subpixel-antialiased dark:nx-bg-primary-300/10 nx-text-[.9em] contrast-more:nx-border contrast-more:nx-border-primary-900/20 contrast-more:nx-contrast-150 contrast-more:dark:nx-border-primary-100/40 nx-py-4" data-language="js" data-theme="default">
                <code style={{whiteSpace: `pre-wrap`, lineHeight: 1.3}} className="nx-border-black nx-border-opacity-[0.04] nx-bg-opacity-[0.03] nx-bg-black nx-break-words nx-rounded-md nx-border nx-py-0.5 nx-px-[.25em] nx-text-[.9em] dark:nx-border-white/10 dark:nx-bg-white/10" dir="ltr" data-language={props.language} data-theme="default">
                    <span className="line">
                        {props.codeTitle && <span className="codeTitle">{props.codeTitle}</span>}
                        <span id={props.id}>{props.children}</span>
                    </span>
                </code>
            </pre>
            {props.codeTitle && <div id={`copySendCommandButton`} data-custombutton={props.custombutton} className="dataCustomButton copyCustom nx-flex nx-gap-1 nx-absolute nx-m-[11px] nx-right-0 nx-top-0">
                <button onClick={(e) => handleCopyClick(e, `default`, user, plays, setPlays)} className="nextra-button nx-transition-all active:nx-opacity-50 nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5 dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50" title={`${props.codeTitle ? `Send` : `Copy`} Command`}>
                    {clicked ? <>
                        <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" className="checkmark nextra-copy-icon nx-pointer-events-none nx-h-4 nx-w-4">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <div style={{pointerEvents: `none`}} className="copyText">{props.codeTitle ? `Sent` : `Copied`}</div>
                    </> : <>
                        {props.codeTitle ? (
                            <>
                                <i style={{fontSize: 15}} className="fas fa-paper-plane"></i>
                                <div className="copyText alertActionButton">Send</div>
                            </>
                        ) : (
                            <>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="nextra-copy-icon nx-pointer-events-none nx-h-4 nx-w-4">
                                    <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect>
                                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <div className="copyText alertActionButton">Copy</div>
                            </>
                        )}
                    </>}
                </button>
            </div>}
            <div id={`copyCommandButton`} data-custombutton={props.custombutton} className="dataCustomButton copySubmit nx-flex nx-gap-1 nx-absolute nx-m-[11px] nx-right-0 nx-top-0">
                <button onClick={(e) => handleCopyClick(e, `copy`, user, plays, setPlays)} className="nextra-button nx-transition-all active:nx-opacity-50 nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5 dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50" title={`${(!props.codeTitle && props.commandToCopy) ? `Send` : `Copy`} Command`}>
                    {CMDClicked ? <>
                        <svg viewBox="0 0 20 20" width="1em" height="1em" fill="currentColor" className="checkmark nextra-copy-icon nx-pointer-events-none nx-h-4 nx-w-4">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <div className="copyText">{(!props.codeTitle && props.commandToCopy) ? `Copy` : `Copied`}</div>
                    </> : <>
                        {(!props.codeTitle && props.commandToCopy) ? (
                            <>
                                <i style={{fontSize: 15}} className="fas fa-paper-plane"></i>
                                <div className="copyText alertActionButton">Send</div>
                            </>
                        ) : (
                            <>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="nextra-copy-icon nx-pointer-events-none nx-h-4 nx-w-4">
                                    <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect>
                                    <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                <div className="copyText alertActionButton">Copy</div>
                            </>
                        )}
                    </>}
                </button>
            </div>
        </div>
    )
}