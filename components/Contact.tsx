import Image from "./Image";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { maxAnimationTime } from "../firebase";
import { StateContext, dev } from "../pages/_app";

export default function Contact(props) {

    let { user } = useContext<any>(StateContext);
    let [formData, setFormData] = useState<any>({});
    let [minMessageLength] = useState(25);
    let [maxMessageLength] = useState(250);
    let [formLoaded, setFormLoaded] = useState(false);
    let [formClicked, setFormClicked] = useState(false);
    let [emailFieldFocusedAtleastOnce, setEmailFieldFocusedAtleastOnce] = useState(false);
    let [messageFieldFocusedAtleastOnce, setMessageFieldFocusedAtleastOnce] = useState(false);

    const updateFormState = (e) => {
        let { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const vanillaJavaScriptEmailValidation = (emailString) => {
        let validDomains = [`com`, `org`, `gov`, `edu`];

        let validationCheck = {
            isError: true,
            message: `Please Enter a Valid Email`,
        }

        if (emailString != null && emailString != undefined && emailString != ``) {
            let emailHasAtSymbol = emailString.includes(`@`);
            if (emailHasAtSymbol === true) {
                let emailWebsite = emailString.split(`@`)[1];
                let emailDomain = emailWebsite.split(`.`)[1];
                let emailHasValidDomain = validDomains.includes(emailDomain);
                
                if (emailString != `` && emailHasValidDomain == true) {
                    validationCheck = {
                        isError: false,
                        message: `Email is Valid`,
                    }
                }
            } else {
                validationCheck = {
                    isError: true,
                    message: `Email Addresses Need to have the @ Symbol`,
                }
            }
        }

        return validationCheck;
    };

    const messageIsLongEnoughToTest = () => {
        let messageLongEnoughToTest = formData.message && formData.message != undefined && formData.message != null && formData.message != ``;
        return messageLongEnoughToTest;
    }
 
    const showMessageFieldValidationError = () => {
        let messageFieldValueIsNotLongEnough = messageIsLongEnoughToTest() && formData.message.length < 25;
        let messageFieldValueIsTooLong = messageIsLongEnoughToTest() && formData.message.length > 250;
        
        let showMessageFieldValidationError = messageIsLongEnoughToTest() && messageFieldFocusedAtleastOnce === true && (messageFieldValueIsNotLongEnough || messageFieldValueIsTooLong);

        return showMessageFieldValidationError;
    }

    const onContactFormSubmit = (e) => {
        e.preventDefault();
        let form = e.target;
        setFormClicked(true);
        setFormLoaded(false);
        let { email: emailField, subject: subjectField,  message: messageField } = form;

        dev() && console.log(`Contact Form To Submit`, {
            email: emailField.value,
            subject: subjectField.value,
            message: messageField.value,
        });

        toast.info(`Submitting Contact Form...`);
        setTimeout(() => {
            toast.error(`Contact Form is in Development`);
            setFormLoaded(true);
            setTimeout(() => {
                setFormClicked(false);
                setFormLoaded(false);
            }, maxAnimationTime);
        }, maxAnimationTime);
    }

    const showEmailFieldValidationError = () => {
        let emailFieldValueIsLongEnoughToTest = formData.email && formData.email != undefined && formData.email != null && formData.email != `` && formData.email.length > 5;
        let emailFieldValueDoesNotPassValidationTesting = emailFieldFocusedAtleastOnce === true && vanillaJavaScriptEmailValidation(formData.email)?.isError == true;
        
        let showEmailFieldValidationError = emailFieldValueIsLongEnoughToTest && emailFieldValueDoesNotPassValidationTesting;

        return showEmailFieldValidationError;
    }

    return (
        <div className={`contact contactComponent`} {...props}>
            <div className={`contactCardMainSide`}>

                <form 
                    id={`contactForm`}
                    onChange={(e) => updateFormState(e)}
                    onSubmit={(e) => onContactFormSubmit(e)}
                    className={`contactForm cwsForm fieldBG flex flexColumns alignCenter justifyCenter`}
                >

                    <h2 className={`subtitle shopSubtitle`}>Get in Touch</h2>
                    
                    <input 
                        required 
                        type={`email`} 
                        name={`email`}
                        id={`contactForm_email`} 
                        className={`contactFormField`} 
                        placeholder={`Enter Email Address...`} 
                        defaultValue={user == null ? `` : user.email}
                        onFocus={() => setEmailFieldFocusedAtleastOnce(true)} 
                    />

                    {showEmailFieldValidationError() && <>
                        <div className={`errorMessage emailFieldErrorMessage emailErrorMessage`}>
                            {formData.email === `` ? `Email is Required` : vanillaJavaScriptEmailValidation(formData.email)?.message}
                        </div>
                    </>}

                    <input 
                        required 
                        type={`text`} 
                        name={`subject`} 
                        id={`contactForm_subject`} 
                        className={`contactFormField`} 
                        placeholder={`Enter Subject...`} 
                    />

                    <textarea 
                        required  
                        name={`message`}
                        style={{ minHeight: 91 }}
                        id={`contactForm_message`} 
                        minLength={minMessageLength}
                        maxLength={maxMessageLength}
                        className={`contactFormField`} 
                        placeholder={`Enter Your Message...`} 
                        onBlur={() => setMessageFieldFocusedAtleastOnce(true)} 
                    />

                    {!showMessageFieldValidationError() && (
                        <div className={`characterCounts flex gap15 justifyEnd`}>
                            <div className={`characterCount min ${messageIsLongEnoughToTest() ? formData.message.length >= minMessageLength ? `valid` : `invalid` : ``}`}>
                                Min: {messageIsLongEnoughToTest() ? formData.message.length >= minMessageLength ? minMessageLength : formData.message.length : 0}/{minMessageLength}
                            </div>
                            <div className={`characterCount max ${messageIsLongEnoughToTest() ? `valid` : ``}`}>
                                Max: {messageIsLongEnoughToTest() ? formData.message.length : 0}/{maxMessageLength}
                            </div>
                        </div>
                    )}

                    {showMessageFieldValidationError() && (
                        <div className={`errorMessage messageFieldErrorMessage messageErrorMessage`}>
                            Please Enter a Message that is at least {minMessageLength} characters and at most {maxMessageLength} characters
                        </div>
                    )}

                    <button disabled={showEmailFieldValidationError() || showMessageFieldValidationError() || messageIsLongEnoughToTest() && formData.message.length < minMessageLength} className={`contactFormSubmitButton cwsFormSubmitButton ${showEmailFieldValidationError() || showMessageFieldValidationError() || messageIsLongEnoughToTest() && formData.message.length < minMessageLength ? `disabled` : ``}`} type={`submit`}>
                        <div className={`textWithIcon`}>
                            <i style={{ color: `var(--cwsSuccess)` }} className={`fas ${formClicked ? formLoaded ? `fa-check` : `pink spinThis fa-spinner` : `fas fa-paper-plane`}`}></i>
                            {formClicked ? formLoaded ? `Submitted` : `Submitting` : `Submit`}
                        </div>
                    </button>

                </form>
            </div>
            <div className={`contactCardSidebar w40`}>
                <Image alt={`Cat Graphic Cutout Portrait`} className={`adjustOuterSpan contactCardSidebarImage`} src={`/assets/images/CatGraphicCutoutPortrait.jpg`} />
            </div>
        </div>
    )
}