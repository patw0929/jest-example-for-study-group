import { connect } from 'react-redux';
import idx from 'idx';
import { loadIfNeeded } from '../../redux/modules/youratorJobs';
import JobList from './JobList';

const mapStateToProps = state => {
  return {
    jobIds: idx(state, _ => _.youratorJobs.list.items) || [],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadIfNeeded: () => {
      dispatch(loadIfNeeded());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobList);
