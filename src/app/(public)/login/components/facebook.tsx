import { Icons } from "@/components/shared/icons";
import { LoadingButton } from "@/components/ui/loading-button";
import { LOGIN_OAUTH } from "@/graphql/mutation";
import { getPayload, setAccessToken } from "@/lib/providers/auth";
import { useMutation } from "@apollo/client";
import Facebook from "react-facebook-login";

import { useRouter } from "next/navigation";

const FacebookLogin = Facebook;

const FacebookButton = () => {
  const [loginOAuth] = useMutation(LOGIN_OAUTH);
  const router = useRouter();

  const responseFacebook = (event) => {
    const input = {
      firstName: event.name.split(" ")[0] ?? event.name,
      lastName: event.name.split(" ")[1] ?? event.name,
      email: event?.email,
      type: "FB",
      data: JSON.stringify(event),
      accountId: event.userID,
      picture: event.picture.data.url,
    };

    if (getPayload()?.role === "customer") {
      router.push("/");
    } else {
      loginOAuth({
        variables: { input },
        onCompleted(data) {
          setAccessToken(data.loginOAuth);
          setTimeout(() => {
            router.push("/");
          }, 100);
        },
      });
    }
  };
  const componentClicked = () => {
    console.log("clicked");
  };

  return (
    <LoadingButton>
      <Icons.facebook className="h-6 w-6" />
      <FacebookLogin
        cssClass="border-radius:14px; diplay:flex; flex-direction:column"
        appId="3751029981840526"
        scope="public_profile"
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
      />
    </LoadingButton>
  );
};

export default FacebookButton;
