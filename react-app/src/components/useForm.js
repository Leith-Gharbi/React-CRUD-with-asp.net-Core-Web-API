import React, { useState, useEffect } from 'react';

const useForm = (initialFieldValues,validate,setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const handelInputChange = (e) => {
    const { name, value } = e.target;
const fieldValues={[name]:value}
    setValues({
      ...values,
    ...fieldValues,
    });
    validate(fieldValues)
  };
  const resetForm =()=>{
    setValues({...initialFieldValues})
    setErrors({})
    setCurrentId(0)
  }
  return { values, setValues, errors, setErrors, handelInputChange ,resetForm};
};

export default useForm;
