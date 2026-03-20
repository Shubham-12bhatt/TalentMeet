import { SignInButton, SignOutButton } from '@clerk/react'
import React from 'react'

function App() {
  return (
    <>
      <h1>welcome to the app</h1>
      <SignedOut>
        <SignInButton mode="modal">
<button>Sign In</button>

        </SignInButton>

        </SignedOut>
    
      <SignedIn>
        <SignOutButton/>
        <UserButton/>
      </SignedIn>
    </>
  )
}

export default App
