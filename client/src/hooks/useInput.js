import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const onHandleChange = (e) => setValue(e.target.value);

  return [value, onHandleChange];
};

export default useInput;
