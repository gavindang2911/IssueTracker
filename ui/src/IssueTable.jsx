import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const IssueRow = withRouter(
  ({ issue, location: { search }, closeIssue, deleteIssue, index }) => {
    const selectLocation = { pathname: `/issues/${issue.id}`, search };
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.title}</td>
        <td>
          <Link to={`/edit/${issue.id}`}>Edit</Link>
          {' | '}
          <NavLink to={selectLocation}>Select</NavLink>
          {' | '}
          <div>
            <Tooltip title="Close">
              <IconButton aria-label="delete">
                <HighlightOffIcon
                  onClick={() => {
                    closeIssue(index);
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton aria-label="delete">
                <DeleteIcon
                  onClick={() => {
                    deleteIssue(index);
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </td>
      </tr>
    );
  }
);

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const issueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      closeIssue={closeIssue}
      deleteIssue={deleteIssue}
      index={index}
    />
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
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}
