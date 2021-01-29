import React, { useState, useEffect } from 'react';


const useForm = (initialFieldValues) => {
  const { values, setValues } = useState(initialFieldValues)

  const handelInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  }
  return { values, setValues, handelInputChange };

}

export default useForm;
