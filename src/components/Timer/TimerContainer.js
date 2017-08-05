import { connect } from 'react-redux';
import { load } from '../../redux/modules/youratorJobs';
import Timer from './Timer';

const mapDispatchToProps = dispatch => {
  return {
    load: () => {
      dispatch(load());
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Timer);
