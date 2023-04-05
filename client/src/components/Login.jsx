import React, { useState, useContext, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { UserContext } from '../userContext';
import { gapi } from 'gapi-script';

const googleId =
  '457646205065-4askqot96hvs0fjovvbltcigm32sded9.apps.googleusercontent.com';

function AuthPage() {
  const { loginUser, logoutUser } = useContext(UserContext);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: googleId,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const onLoginSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    setShowLoginButton(false);
    setShowLogoutButton(true);

    loginUser(res.profileObj);
  };
  const onLoginFailure = (res) => {
    console.log('[Login failed] res:', res);
  };
  const onSignoutSuccess = () => {
    alert('You have been logged out successfully');
    console.clear();
    setShowLoginButton(true);
    setShowLogoutButton(false);
    logoutUser();
  };

  return (
    <div>
      {showLoginButton ? (
        <GoogleLogin
          clientId={googleId}
          buttonText='Login'
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        />
      ) : null}

      {showLogoutButton ? (
        <GoogleLogout
          clientId={googleId}
          buttonText='Sign Out'
          onLogoutSuccess={onSignoutSuccess}
        ></GoogleLogout>
      ) : null}
    </div>
  );
}

// const Login = () => {
//   // const { loginUser, logoutUser } = useContext(UserContext);
//   // const [showLoginButton, setShowLoginButton] = useState(true);
//   // const [showLogoutButton, setShowLogoutButton] = useState(false);

//   const onLoginSuccess = (res) => {
//     console.log('[Login Success] currentUser:', res.profileObj);
//     setShowLoginButton(false);
//     setShowLogoutButton(true);

//     loginUser(res.profileObj);
//   };

//   const onLoginFailure = (res) => {
//     console.log('[Login failed] res:', res);
//   };

//   const onSignoutSuccess = () => {
//     alert('You have been logged out successfully');
//     console.clear();
//     setShowLoginButton(true);
//     setShowLogoutButton(false);
//     logoutUser();
//   };

//   return (
//     <div>
//       {showLoginButton ? (
//         <GoogleLogin
//           clientId={clientId}
//           buttonText='Login'
//           onSuccess={onLoginSuccess}
//           onFailure={onLoginFailure}
//           cookiePolicy={'single_host_origin'}
//           isSignedIn={true}
//         />
//       ) : null}

//       {showLogoutButton ? (
//         <GoogleLogout
//           clientId={clientId}
//           buttonText='Sign Out'
//           onLogoutSuccess={onSignoutSuccess}
//         ></GoogleLogout>
//       ) : null}
//     </div>
//   );
// };

// export default Login;
export default AuthPage;
