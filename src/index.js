import React from 'react';
import ReactDOM from 'react-dom';

class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the issue filter.</div>;
  }
}
const IssueRow = (props) => {
  // const style = this.props.rowStyle;
  const rowStyle = { border: '1px solid silver', padding: 4 };
  const issue = props.issue;
  return (
    <tr>
      {/* <td style={style}>{this.props.issue_id}</td> */}
      {/* <td style={style}>{this.props.issue_title}</td> */}
      {/* <td style={style}>{this.props.children}</td> */}
      <td style={rowStyle}>{issue.id}</td>
      <td style={rowStyle}>{issue.status}</td>
      <td style={rowStyle}>{issue.owner}</td>
      <td style={rowStyle}>{issue.created.toDateString()}</td>
      <td style={rowStyle}>{issue.effort}</td>
      <td style={rowStyle}>{issue.due ? issue.due.toDateString() : ' '}</td>
      <td style={rowStyle}>{issue.title}</td>
    </tr>
  );
};

// class IssueTable extends React.Component {
//   render() {
//     const rowStyle = { border: '1px solid silver', padding: 4 };
//     const issueRows = this.props.issues.map((issue) => (
//       <IssueRow rowStyle={rowStyle} key={issue.id} issue={issue} />
//     ));
//     return (
//       <table style={{ borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th tyle={rowStyle}>ID</th>
//             <th tyle={rowStyle}>Status</th>
//             <th tyle={rowStyle}>Owner</th>
//             <th tyle={rowStyle}>Created</th>
//             <th tyle={rowStyle}>Effort</th>
//             <th tyle={rowStyle}>Due Date</th>
//             <th tyle={rowStyle}>Title</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/* 1 <IssueRow rowStyle={rowStyle} issue_id={1} issue_title="error 1" />{' '} */}
//           {/* 2 <IssueRow rowStyle={rowStyle} issue_id={1}>
//             "This is error 1"
//           </IssueRow> */}
//           {/* <IssueRow rowStyle={rowStyle} issue_id={2}>
//             "This is error 2"
//           </IssueRow> */}
//           {/* 3 {issues.map(issue => <IssueRow rowStyle={rowStyle} issue={issue}/>)} */}
//           {issueRows}
//           {/* somehow pass Issue 2 data to this */}
//         </tbody>
//       </table>
//     );
//   }
// }

function IssueTable(props) {
  const issueRows = props.issues.map((issue) => (
    <IssueRow key={issue.id} issue={issue} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Due Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}
class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    // e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };
    this.props.createIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  }
  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button>Add</button>
      </form>
    );
  }
}

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);
    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
      issueList {
        id title status owner
        created effort due
      }
    }`;

    // const response = await fetch('http://localhost:5000/graphql', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ query }),
    // });
    // // const result = await response.json();
    // const body = await response.text();
    // const result = JSON.parse(body, jsonDateReviver);
    // this.setState({ issues: result.data.issueList });
    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }
  async createIssue(issue) {
    // const query = `mutation {
    //   issueAdd(issue: {
    //     title: "${issue.title}",
    //     owner: "${issue.owner}",
    //     due: "${issue.due.toISOString()}",
    //   }) {
    //     id
    //   }
    // }`;
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Conten-Type': 'application/json' },
      body: JSON.stringify({ query, variable: { issue } }),
    });
    this.loadData();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </React.Fragment>
    );
  }
}

const element = <IssueList />;

ReactDOM.render(element, document.getElementById('contents'));
