import PropTypes from 'prop-types';
import Container from './Container';
import Alert from './Alert';
import Button from './Button';
import TextField from './TextField';



export default function ComponetsOverrides (theme) {
    return Object.assign(
        Container(theme),
        Alert(theme),
        Button(theme),
        TextField(theme)
    );
}

ComponetsOverrides.propTypes = {
    theme: PropTypes.object.isRequired,
};