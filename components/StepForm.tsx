import dayjs from 'dayjs';
import * as React from 'react';
import Box from '@mui/material/Box';
import { dev } from '../pages/_app';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import StepContent from '@mui/material/StepContent';
import { useState, useEffect, useRef } from 'react';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const initialPlayers = [{id: 1, name: `Player 1`, score: 0}, {id: 2, name: `Player 2`, score: 0}];

const muiTheme = createTheme({
    palette: {
        // primary: {
        //     main: `#00c2ff`,
        // },
        // secondary: {
        //     main: `#58717f`,
        // },
    },
});

const steps = [
    {
        label: `Topic`,
        description: `Select a Topic for the Game`,
    },
    {
        label: `Players`,
        description: `Add Players for the Game.`,
    },
    {
        label: `Time Limit`,
        description: `Time Limit for Players.`,
    },
];

export default function StepForm(props) {

    const loadedRef = useRef(false);
    let [theme, setTheme] = useState(`dark`);
    const [loaded, setLoaded] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [formFields, setFormFields] = useState({});
    let [fieldError, setFieldError] = useState(false);
    let [players, setPlayers] = useState(initialPlayers);
    
    const isStepFailed = (step: number) => {
        return step === 1;
    };

    const handleBack = () => {
        setFieldError(false);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setFormFields({});
        setPlayers(initialPlayers);
        let stepConnectors = document.querySelectorAll(`.MuiStepConnector-root`);
        stepConnectors.forEach((step, index) => {
            if (index == stepConnectors?.length - 1) {
                step.remove();
            } else {
                step.firstElementChild.innerHTML = ``;
            }
        });
        document.querySelector(`.formField`)?.querySelector(`input`)?.focus();
    };

    const handleNext = (fields?) => {
        setActiveStep((prevActiveStep) => {
            return prevActiveStep + 1;
        });

        if (fields) {
            let stepConnectors = document.querySelectorAll(`.MuiStepConnector-root`);
            if (activeStep < stepConnectors.length) {
                let thisConnector = stepConnectors[activeStep];
                let connectorLineText = thisConnector?.querySelector(`span`);
                connectorLineText.style.marginTop = `15px`;
                connectorLineText.style.paddingLeft = `15px`;
                connectorLineText.innerHTML = activeStep === 1 ? ((players?.length) + ` Players`) : Object.values(fields)[activeStep]?.toString();
            } else {
                setTimeout(() => {
                    let lastCompleted = document.querySelectorAll(`.Mui-completed`)[document.querySelectorAll(`.Mui-completed`)?.length - 1]?.parentElement?.parentElement;
                    lastCompleted.insertAdjacentHTML(`afterend`, `<div class="MuiStepConnector-root MuiStepConnector-vertical Mui-completed css-1pe7n21-MuiStepConnector-root"><span class="customConnector MuiStepConnector-line MuiStepConnector-lineVertical css-8t49rw-MuiStepConnector-line">${Object.values(fields)[activeStep]?.toString()} minutes per player</span></div>`);
                }, 35);
            }
        }

        setTimeout(() => {
            let nextInput: any = document.querySelectorAll(`.formField`)[document.querySelectorAll(`.formField`)?.length - 1].querySelector(`input`);
            if (nextInput) nextInput?.focus();
        }, 35);
    };

    const ConcentrationGameFormSubmit = (ConcentrationGameFormSubmitEvent) => {
        ConcentrationGameFormSubmitEvent.preventDefault();

        // dev() && console.log(ConcentrationGameFormSubmitEvent);

        // Set Up Object Where We Can Store Form Values
        let concentrationForm = ConcentrationGameFormSubmitEvent?.target;
        let formFieldContainers = concentrationForm.querySelectorAll(`.formField`);
 
        // Store Form Values
        Object.assign(formFields, ...([...formFieldContainers].map((fieldContainer: any, fieldContainerIndex) => {
            let field = fieldContainer.querySelector(`.MuiInput-input`);
            if (field?.name != `players`) {
                if (field != null && field != undefined) {
                    return { [field?.name]: field?.value };
                } else {
                    field = fieldContainer.querySelector(`.MuiInputBase-formControl`).querySelector(`input`);
                    if (field?.name) {
                        return { [field?.name]: field?.value };
                    } else {
                        if (fieldContainer.classList.contains(`timeLimit`)) {
                            field = fieldContainer.querySelector(`.MuiInputBase-formControl`).querySelector(`input`);
                            return { timeLimit: field?.value };
                        }
                    }
                }
            } else {
                let newPlayers = [];
                if (field?.value != ``) {
                    setPlayers(prevPlayers => {
                        newPlayers = [...prevPlayers, {id: prevPlayers.length + 1, name: field?.value, score: 0}];
                        field.value = ``;
                        return newPlayers;
                    });
                } else {
                    newPlayers = players;
                    handleNext(formFields);
                }
                return { players: newPlayers};
            }
        })));

        dev() && setTimeout(() => {
            console.log(`Game`, formFields);
        }, 50);
        if (((formFields as any)?.timeLimit && (formFields as any)?.timeLimit != `mm` && (formFields as any)?.timeLimit >= 1 && (formFields as any)?.timeLimit <= 15) || (!(formFields as any)?.timeLimit)) {
            // console.log(ConcentrationGameFormSubmitEvent);
            if (activeStep != 1) handleNext(formFields);
            setFieldError(false);
        } else {
            setFieldError(true);
            return false;
        }
    }

    // const checkTheme = () => {
    //     if (document && document.querySelector(`html`).classList.contains(`light`)) {
    //         return `light`;
    //     } else {
    //         return `dark`;
    //     }
    // }

    useEffect(() => {

        if (activeStep == 0) {
            document.querySelector(`.formField`)?.querySelector(`input`)?.focus();
        } else if (activeStep === steps.length) {

            const handleEnterKey = (event) => {
                if (event.key === `Enter`) {
                    handleReset();
                }
            };
            
            window.addEventListener(`keydown`, handleEnterKey);
    
            // Cleanup function to remove the event listener
            return () => {
                window.removeEventListener(`keydown`, handleEnterKey);
            };
        }

        if (loadedRef.current) return;
        loadedRef.current = true;
        setLoaded(true);

      }, [activeStep, fieldError]);

    return <>
        <div id={`ConcentrationGame`} title={props.title} style={{width: `100%`, margin: `20px auto`, background: `var(--concentration)`}}>
            <form className={`ConcentrationGameForm ${theme}`} id={`ConcentrationGameForm`} onSubmit={(ConcentrationGameFormSubmitEvent) => ConcentrationGameFormSubmit(ConcentrationGameFormSubmitEvent)}>
                <ThemeProvider theme={muiTheme}>
                    <Box sx={{ maxWidth: 400 }}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((step, index) => {
                                const labelProps: {
                                    optional?: React.ReactNode;
                                    error?: boolean;
                                } = {};

                                if (isStepFailed(index)) {
                                    labelProps.optional = (
                                      <Typography variant="caption" color="error">
                                        Alert message
                                      </Typography>
                                    );
                                    labelProps.error = true;
                                }

                                return (
                                    <Step key={step.label}>
                                        <StepLabel
                                        //   optional={
                                        //     index === 2 ? (
                                        //       <Typography variant="caption">Last step</Typography>
                                        //     ) : null
                                        //   }
                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>
                                            {step.description && step.description != `` && <Typography>{step.description}</Typography>}
                                            {step.label == `Topic` && <>
                                                <TextField fullWidth className={`formField topic`} name={`topic`} id="standard-basic" label="Topic" variant="standard" placeholder={`Famous People that Passed Away whose First or Last Names that start with Letter`} required />
                                            </>}
                                            {step.label == `Players` && <>
                                                {players.map((player, playerIndex) => {
                                                    return (
                                                        <Typography fontSize={13} key={playerIndex}>{playerIndex + 1}. {player?.name}</Typography>
                                                    )
                                                })}
                                                <TextField style={{ marginBottom: 15 }} fullWidth className={`formField players`} name={`players`} id="standard-basic" placeholder={`Enter Player Name or Press Enter / Click Continue`} label="+ Add Player" variant="standard" />
                                            </>}
                                            {step.label == `Time Limit` && <>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    {/* <TimePicker data-name={`timeLimit`} views={[`minutes`, `seconds`]} format="mm:ss" defaultValue={`05:00`} className={`formField timeLimit`} label="Time Limit" /> */}
                                                    <TimeField style={{ marginTop: 15 }} format="mm" className={`formField timeLimit ${fieldError ? `error` : ``}`} name={`timeLimit`} label="Time Limit" defaultValue={dayjs().minute(5)} minTime={dayjs().minute(1)} maxTime={dayjs().minute(15)} shouldDisableTime={(value, view) => view === `minutes` && value.minute() > 15} required />
                                                </LocalizationProvider>
                                            </>}
                                            <Box sx={{ mb: 2 }}>
                                                <div>
                                                    <Button
                                                        type={`submit`}
                                                        variant="contained"
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        {index === steps.length - 1 ? `Finish` : `Continue`}
                                                    </Button>
                                                    <Button
                                                        disabled={index === 0}
                                                        onClick={handleBack}
                                                        sx={{ mt: 1, mr: 1 }}
                                                    >
                                                        Back
                                                    </Button>
                                                </div>
                                            </Box>
                                        </StepContent>
                                    </Step>
                                )
                            })}
                        </Stepper>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} sx={{ p: 3 }}>
                                <Typography>Game Set</Typography>
                                <Button type={`submit`} className={`MuiButton-containedPrimary containedPrimary`} onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                    Start Game
                                </Button>
                            </Paper>
                        )}
                    </Box>
                </ThemeProvider>
            </form>
        </div>
    </>
}