import React, { useState, useEffect } from 'react';

export function useStateFromProp<T>(initialVal: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [val, setVal] = useState(initialVal)

  useEffect(() => setVal(initialVal), [initialVal])

  return [val, setVal]
}
