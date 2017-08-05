import { connect } from 'react-redux';
import idx from 'idx';
import Job from './Job';

const mapStateToProps = (state, ownProps) => {
  return {
    job: idx(state, _ => _.youratorJobs.byId[ownProps.id].items) || {},
  };
};

export default connect(
  mapStateToProps,
)(Job);
