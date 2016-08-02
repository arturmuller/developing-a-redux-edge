import React from 'react';
import { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions';
import * as selectors from '../../store/selectors';
import * as styles from './styles';

class Toast extends React.Component {
  componentDidMount() {
    this.timeout = setTimeout(
      () => this.props.clearToast(this.props.id),
      3000
    );
  }
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
  render() {
    const { id, message, level } = this.props;
    return (
      <div key={id} style={{ ...styles.toast, ...styles[level] }}>
        {message}
      </div>
    );
  }
}

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  level: PropTypes.oneOf([ 'info', 'warn' ]).isRequired,
};

const Toasts = ({ toast, clearToast }) => (
  <div style={styles.wrapper}>
    {toast &&
      <Toast
        {...toast}
        key={toast.id}
        clearToast={clearToast}
        />
    }
  </div>
);

Toasts.propTypes = {
  toast: PropTypes.shape(Toast.propTypes),
  clearToast: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  toast: selectors.getToast(state),
});

export default connect(mapStateToProps, actionCreators)(Toasts);
