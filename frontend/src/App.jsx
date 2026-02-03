import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@clerk/clerk-react'

function App() {

  return (
   <>
    <SignedOut>
        <SignInButton mode="modal"/>
    </SignedOut>

    <SignedIn>
        <SignOutButton />
    </SignedIn>
    
   </>
  )
}

export default App
