import { setLocale } from 'react-redux-i18n';

export function changeLocale(locale) {
    return (dispatch) => {
        dispatch(setLocale(locale));
    }
}
