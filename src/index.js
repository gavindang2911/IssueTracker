import React from 'react';
import ReactDOM from 'react-dom';

const initialIssues = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel',
  },
];
class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the issue filter.</div>;
  }
}
class IssueRow extends React.Component {
  render() {
    const style = this.props.rowStyle;
    const issue = this.props.issue;
    return (
      <tr>
        {/* <td style={style}>{this.props.issue_id}</td> */}
        {/* <td style={style}>{this.props.issue_title}</td> */}
        {/* <td style={style}>{this.props.children}</td> */}
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    setTimeout(() => {
      this.setState({ issues: initialIssues });
    }, 500);
  }
  render() {
    const rowStyle = { border: '1px solid silver', padding: 4 };
    const issueRows = this.state.issues.map((issue) => (
      <IssueRow rowStyle={rowStyle} issue={issue} />
    ));
    return (
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th tyle={rowStyle}>ID</th>
            <th tyle={rowStyle}>Status</th>
            <th tyle={rowStyle}>Owner</th>
            <th tyle={rowStyle}>Created</th>
            <th tyle={rowStyle}>Effort</th>
            <th tyle={rowStyle}>Due Date</th>
            <th tyle={rowStyle}>Title</th>
          </tr>
        </thead>
        <tbody>
          {/* 1 <IssueRow rowStyle={rowStyle} issue_id={1} issue_title="error 1" />{' '} */}
          {/* 2 <IssueRow rowStyle={rowStyle} issue_id={1}>
            "This is error 1"
          </IssueRow> */}
          {/* <IssueRow rowStyle={rowStyle} issue_id={2}>
            "This is error 2"
          </IssueRow> */}
          {/* 3 {issues.map(issue => <IssueRow rowStyle={rowStyle} issue={issue}/>)} */}
          {issueRows}
          {/* somehow pass Issue 2 data to this */}
        </tbody>
      </table>
    );
  }
}
class IssueAdd extends React.Component {
  render() {
    return <div>This is a placeholder for a form to add an issue.</div>;
  }
}

class BorderWrap extends React.Component {
  render() {
    const borderedStyle = { border: '1px solid silver', padding: 6 };
    return <div style={borderedStyle}>{this.props.children}</div>;
  }
}
class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('root'));
