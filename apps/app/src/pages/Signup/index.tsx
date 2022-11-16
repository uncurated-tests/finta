import { useEffect } from 'react';


import * as analytics from "src/lib/analytics";

export const Signup = () =>{
  useEffect(() => { analytics.page({ name: analytics.PageNames.SIGN_UP })}, []);

  return (
    <div>Sign Up</div>
  )
}