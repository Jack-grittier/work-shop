export default function PasswordRequired(props) {
    return (
        <div className={`formWarning`}>
            <h2 style={{fontSize: `1.5em`}}>
                <div>Please enter a password.</div>
                <div>Here are some general guidelines for creating strong, secure passwords:</div>
                <br />
                <div>- Use at least 8-12 characters - The longer the better</div>
                <div>- Include uppercase and lowercase letters (e.g. AbC123)</div>
                <div>- Digits - incorporate numbers 0-9 in the password</div>
            </h2>
        </div>
    )
}