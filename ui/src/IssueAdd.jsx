import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import graphQLFetch from './graphQLFetch.js';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(10),
    '& .MuiTextField-root': {
      margin: theme.spacing(10),
      width: '700px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(6),
    },
  },
}));

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };
    const query = `mutation issueAdd($issue: IssueInputs!) {
      issueAdd(issue: $issue) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.issueAdd.id}`);
      // this.loadData();
    }
    // const { createIssue } = this.props.createIssue;
    // createIssue(issue);
    // form.owner.value = '';
    // form.title.value = '';
  }

  render() {
    return (
      <RenderComponent
        open={this.props.open}
        handleClose={this.props.handleClose}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

function RenderComponent({ open, handleClose, handleSubmit }) {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={handleClose}>
      {/* <Form handleClose={handleClose} /> */}
      <form
        name="issueAdd"
        onSubmit={handleSubmit}
        autoComplete="off"
        className={classes.root}
      >
        <label>Owner</label>
        <Input type="text" name="owner" placeholder="Owner" />
        <br></br>
        <label>Title</label>
        <Input type="text" name="title" placeholder="Title" />
        <br></br>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          Add
        </Button>
      </form>
    </Dialog>
  );
}

export default withRouter(IssueAdd);
