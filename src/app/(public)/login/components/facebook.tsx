// import { Icons } from "@/components/shared/icons";
// import { LoadingButton } from "@/components/ui/loading-button";
// import { LOGIN_OAUTH } from "@/graphql/mutation";
// import { AuthContext, getPayload, setAccessToken } from "@/lib/providers/auth";
// import { useMutation } from "@apollo/client";
// import { useContext } from "react";
// import Facebook from "react-facebook-login";
// import { useNavigate } from "react-router-dom";

// const FacebookLogin: any = Facebook;

// const FacebookButton = () => {
//   const [loginOAuth, { loading }] = useMutation(LOGIN_OAUTH);
//   const { authenticate } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const responseFacebook = (event: any) => {
//     const input = {
//       firstName: event.name.split(" ")[0] ?? event.name,
//       lastName: event.name.split(" ")[1] ?? event.name,
//       email: event?.email,
//       type: "FB",
//       data: JSON.stringify(event),
//       accountId: event.userID,
//       picture: event.picture.data.url,
//     };

//     if (getPayload()?.role === "customer") {
//       navigate("/");
//     } else {
//       loginOAuth({
//         variables: { input },
//         onCompleted(data) {
//           setAccessToken(data.loginOAuth);
//           setTimeout(() => {
//             navigate("/");
//           }, 100);
//         },
//       });
//     }
//   };
//   const componentClicked = () => {
//   };

//   return (
//     <LoadingButton>
//       <Icons.facebook className="h-6 w-6" />
//       <FacebookLogin
//         cssClass="border-radius:14px; diplay:flex; flex-direction:column"
//         appId="3751029981840526"
//         scope="public_profile"
//         fields="name,email,picture"
//         onClick={componentClicked}
//         callback={responseFacebook}
//       />
//     </LoadingButton>
//   );
// };

// export default FacebookButton;
