import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  withStyles,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import React, { useState, useRef } from 'react';
import useForm from './useForm';
const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': { margin: theme.spacing(1), minWidth: 230 },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin:{
    margin: theme.spacing(1),

  }
});
const initialFieldValues = {
  fullName: '',
  mobile: '',
  email: '',
  age: '',
  bloodGroup: '',
  address: '',
};
const DCandidateForm = ({ classes, ...props }) => {
  const { values, setValues, handelInputChange } = useForm(initialFieldValues);

  // material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelwidth] = React.useState(0);
  React.useEffect(() => {
    setLabelwidth(inputLabel.current.offsetWidth);
  }, []);
const handelSubmit =e=>{
e.preventDefault()
console.log(values)
}
  return (
    <form noValidate className={classes.root} onSubmit={handelSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullName"
            variant="outlined"
            label="Full Name"
            values={values.fullName}
            onChange={handelInputChange}
          ></TextField>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            values={values.email}
            onChange={handelInputChange}
          ></TextField>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodGroup"
              value={values.bloodGroup}
              onChange={handelInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value=""> Select Blood Group</MenuItem>
              <MenuItem value="A+"> A +ve</MenuItem>
              <MenuItem value="A-"> A -ve</MenuItem>
              <MenuItem value="B+"> AB +ve</MenuItem>
              <MenuItem value="B-"> AB -ve</MenuItem>
              <MenuItem value="AB+"> AB +ve</MenuItem>
              <MenuItem value="AB-"> AB -ve</MenuItem>
              <MenuItem value="O+"> O +ve</MenuItem>
              <MenuItem value="O-"> O -ve</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            values={values.mobile}
            onChange={handelInputChange}
          ></TextField>
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            values={values.age}
            onChange={handelInputChange}
          ></TextField>
          <TextField
            name="adress"
            variant="outlined"
            label="Adress"
            values={values.adress}
            onChange={handelInputChange}
          ></TextField>
          <div>
            <Button  variant="contained" color="primary" type="submit" className={classes.smMargin}>
              Submit
            </Button>
            <Button variant="contained" className={classes.smMargin} >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default withStyles(styles)(DCandidateForm);
