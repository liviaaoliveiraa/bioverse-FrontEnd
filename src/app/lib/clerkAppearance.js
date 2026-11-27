import styles from '../login/clerk.module.css';

const bioverseClerkAppearance = {
    elements: {
        rootBox: { width: '100%' },
        cardBox: {
            width: '100%',
            maxWidth: 'none',
            padding: 0,
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        card: {
            width: '100%',
            maxWidth: 'none',
            padding: 0,
            border: 'none',
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        headerTitle: styles.hidden,
        headerSubtitle: styles.hidden,
        footer: styles.hidden,
        socialButtonsBlockButton: styles.socialButton,
        socialButtonsBlockButtonText: styles.socialButtonText,
        dividerLine: styles.dividerLine,
        dividerText: styles.dividerText,
        formFieldLabel: styles.formFieldLabel,
        formFieldInput: styles.formFieldInput,
        formFieldInputShowPasswordButton:
            styles.formFieldInputShowPasswordButton,
        formFieldErrorText: styles.formFieldErrorText,
        formButtonPrimary: styles.formButtonPrimary,
    },
};

export default bioverseClerkAppearance;
