"use client"

import { useState } from "react"
import Login from "./Login"
import SignUp from "./SignUp"

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true)

  const switchToSignup = () => setIsLogin(false)
  const switchToLogin = () => setIsLogin(true)

  return <div>{isLogin ? <Login onSwitchToSignup={switchToSignup} /> : <SignUp onSwitchToLogin={switchToLogin} />}</div>
}

export default Authentication
