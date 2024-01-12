import React from "react";
import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import * as Components from '../components';


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true); // To determine whether it's a signup or login

    const handleAuthAction = async () => {
        if (isSignUp) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("User created successfully!");
            } catch (error) {
                console.error("Error creating user:", error.message);
            }
        } if(!isSignUp) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("User signed in successfully!");
            } catch (error) {
                console.error("Error signing in:", error.message);
            }
        }
    };

    const [signIn, toggle] = React.useState(true);
     return(
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input type='text' placeholder='Name' />
                     <Components.Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                     <Components.Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                     <Components.Button onClick={handleAuthAction}>Sign Up{isSignUp==true}</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Sign in</Components.Title>
                      <Components.Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                      <Components.Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                      <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                      <Components.Button onClick={handleAuthAction}>Sigin In</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome Back!</Components.Title>
                     <Components.Paragraph>
                         To keep connected with us please login with your personal info
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                         Sign In
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Friend!</Components.Title>
                       <Components.Paragraph>
                           Enter Your personal details and start journey with us
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sigin Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>

         </Components.Container>
     )
}
    
export default Auth;
