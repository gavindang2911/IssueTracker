import React from 'react';

import IssueFilter from './IssueFilter.jsx';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const statuses = ['New', 'Assigned', 'Fixed', 'Closed'];

class IssueReport extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('status')) vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const query = `query issueList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
    ) {
      issueCounts(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
      ) {
        owner New Assigned Fixed Closed
      }
    }`;
    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor(props) {
    super(props);
    const stats = store.initialData ? store.initialData.issueCounts : null;
    delete store.initialData;
    this.state = { stats };
  }

  componentDidMount() {
    const { stats } = this.state;
    if (stats == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search },
    } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    const {
      location: { search },
      match,
      showError,
    } = this.props;
    const data = await IssueReport.fetchData(match, search, showError);
    if (data) {
      this.setState({ stats: data.issueCounts });
    }
  }

  render() {
    const { stats } = this.state;
    if (stats == null) return null;

    const headerColumns = statuses.map((status) => (
      <th key={status}>{status}</th>
    ));

    const statRows = stats.map((counts) => (
      <tr key={counts.owner}>
        <td>{counts.owner}</td>
        {statuses.map((status) => (
          <td key={status}>{counts[status]}</td>
        ))}
      </tr>
    ));

    return (
      <>
        <Paper
          elevation={1}
          style={{
            paddingTop: '10px',
            paddingLeft: '20px',
            paddingBottom: '20px',
            marginBottom: '20px',
            width: '98%',
            justifyContent: 'center',
            borderBottom: '1.5px solid silver',
          }}
        >
          <Typography variant="h5" component="h3">
            Filter
          </Typography>
          <IssueFilter urlBase="/report" />
        </Paper>
        <table className="bordered-table">
          <thead>
            <tr>
              <th />
              {headerColumns}
            </tr>
          </thead>
          <tbody>{statRows}</tbody>
        </table>
      </>
    );
  }
}

export default IssueReport;
