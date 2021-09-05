import React from 'react';
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';

import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';
import graphQLFetch from './graphQLFetch.js';

import store from './store.js';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
export default class IssueList extends React.Component {
  constructor() {
    super();
    // this.state = { issues: [] };
    const issues = store.initialData ? store.initialData.issueList : null;
    const selectedIssue = store.initialData ? store.initialData.issue : null;
    delete store.initialData;
    this.state = {
      issues,
      selectedIssue,
    };
    this.closeIssue = this.closeIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
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
    } = this.props;
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
      issueList(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
      ) {
          id title status owner
          created effort due
      }
    }`;

    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({
        issues: data.issueList,
        selectedIssue: data.issue,
      });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      this.loadData();
    }
  }

  async closeIssue(index) {
    const query = `mutation issueClose($id: Int!) {
      issueUpdate(id: $id, changes: { status: Closed }) {
        id title status owner
        effort created due description
      }
    }`;
    const { issues } = this.state;
    const data = await graphQLFetch(query, { id: issues[index].id });
    if (data) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        newList[index] = data.issueUpdate;
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  async deleteIssue(index) {
    const query = `mutation issueDelete($id: Int!) {
      issueDelete(id: $id)
    }`;
    const { issues } = this.state;
    const {
      location: { pathname, search },
      history,
    } = this.props;
    const { id } = issues[index];
    const data = await graphQLFetch(query, { id });
    if (data && data.issueDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        if (pathname === `/issues/${id}`) {
          history.push({ pathname: '/issues', search });
        }
        newList.splice(index, 1);
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  render() {
    const { issues } = this.state;
    if (issues == null) return null;
    const { match } = this.props;
    const { selectedIssue } = this.state;
    return (
      <React.Fragment>
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
          <IssueFilter urlBase="/issues" />
        </Paper>
        <IssueTable
          issues={issues}
          closeIssue={this.closeIssue}
          deleteIssue={this.deleteIssue}
        />
        {/* <IssueDetail issue={selectedIssue} /> */}

        {/* <IssueAdd createIssue={this.createIssue} /> */}

        <Route path={`${match.path}/:id`} component={IssueDetail} />
      </React.Fragment>
    );
  }
}
