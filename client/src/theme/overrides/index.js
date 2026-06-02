import PropTypes from 'prop-types';
import Container from './Container';


export default function ComponetsOverrides (theme) {
    return Object.assign(
        Container(theme),
    );
}

ComponetsOverrides.propTypes = {
    theme: PropTypes.object.isRequired,
};