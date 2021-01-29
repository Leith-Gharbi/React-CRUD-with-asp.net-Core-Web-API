import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/dCandidate';
import {
  Grid,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  withStyles
} from '@material-ui/core';
import DCandidateForm from './DCandidateForm';

const styles = theme =>({
  root:{
"& .MuiTableCell-head":{
  fontSize:"1.25em"
}
  },
  paper:{
    margin :theme.spacing(2),
    padding:theme.spacing(2)
  }
})

const DCandidates = ({classes,...props}) => {
  useEffect(() => {
    props.fetchAllDCandidates();
  }, []); //componentDidMount

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCandidateForm />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dCandidateList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullName}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.bloodGroup}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>{' '}
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});
const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
};
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));
