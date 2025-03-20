// import { Icons } from "@/components/shared/icons";
// import { LoadingButton } from "@/components/ui/loading-button";
// import { LOGIN_OAUTH } from "@/graphql/mutation";
// import { AuthContext, getPayload, setAccessToken } from "@/lib/providers/auth";
// import { useMutation } from "@apollo/client";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";

// const GoogleButton = () => {
//   const { authenticate } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [loginOAuth, { loading }] = useMutation(LOGIN_OAUTH);

//   const loginByGoogle = useGoogleLogin({
//     onSuccess: async (token) => {
//       try {
//         const { data } = await axios.get(
//           "https://www.googleapis.com/oauth2/v3/userinfo",
//           {
//             headers: { Authorization: `Bearer ${token.access_token}` },
//           }
//         );
//         const input = {
//           firstName: data.given_name,
//           lastName: data.family_name,
//           email: data.email,
//           type: "GL",
//           data: JSON.stringify(data),
//           accountId: data.sub,
//         };

//         loginOAuth({
//           variables: { input },
//           onCompleted(data) {
//             setAccessToken(data.loginOAuth);
//             setTimeout(() => {
//               navigate("/");
//             }, 100);
//           },
//         });
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     },
//   });

//   const onClickLogin = () => {
//     if (getPayload()?.role === "customer") {
//       navigate("/");
//     } else {
//       loginByGoogle();
//     }
//   };
//   return (
//     <LoadingButton
//       variant="outline"
//       className="w-full"
//       loading={loading}
//       onClick={onClickLogin}
//     >
//       {!loading && <Icons.google className="h-5 w-5 mr-2" />}
//       Login with Google
//     </LoadingButton>
//   );
// };

// export default GoogleButton;
