import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  withStyles,
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions/dCandidate';
import { useToasts } from 'react-toast-notifications';

import React, { useState, useRef, useEffect } from 'react';
import useForm from './useForm';
const styles = (theme) => ({
  root: {
    '& .MuiTextField-root': { margin: theme.spacing(1), minWidth: 230 },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
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
  //toast message
  const { addToast } = useToasts();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('fullName' in fieldValues)
      temp.fullName = fieldValues.fullName ? '' : 'this Field is required.';
    if ('mobile' in fieldValues)
      temp.mobile = fieldValues.mobile ? '' : 'this Field is required.';
    if ('bloodGroup' in fieldValues)
      temp.bloodGroup = fieldValues.bloodGroup ? '' : 'this Field is required.';
    if ('email' in fieldValues)
      temp.email = /^$|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.';
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handelInputChange,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId);

  // material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelwidth] = React.useState(0);
  React.useEffect(() => {
    setLabelwidth(inputLabel.current.offsetWidth);
  }, []);
  const handelSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast('Submitted successfully', { appearance: 'success' });
      };
      if (props.currentId == 0)
        props.createDCandidate(values, () => {
          onSuccess();
        });
      else
        props.updateDCondidate(props.currentId, values, () => {
          onSuccess();
        });
    }
  };

  React.useEffect(() => {
    if (props.currentId != 0)
      setValues({
        ...props.dCandidateList.find((x) => x.id == props.currentId),
      });
  }, [props.currentId]);
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
            // error={true}
            // helperText={errors.fullName}
            {...(errors.fullName && {
              error: true,
              helperText: errors.fullName,
            })}
          ></TextField>
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            values={values.email}
            onChange={handelInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          ></TextField>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.bloodGroup && { error: true })}
          >
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
              <MenuItem value="B+"> B +ve</MenuItem>
              <MenuItem value="B-"> B -ve</MenuItem>
              <MenuItem value="AB+"> AB +ve</MenuItem>
              <MenuItem value="AB-"> AB -ve</MenuItem>
              <MenuItem value="O+"> O +ve</MenuItem>
              <MenuItem value="O-"> O -ve</MenuItem>
            </Select>
            {errors.bloodGroup && (
              <FormHelperText>{errors.bloodGroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            values={values.mobile}
            onChange={handelInputChange}
            {...(errors.mobile && { error: true, helperText: errors.mobile })}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};
const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});
const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCondidate: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCandidateForm));
