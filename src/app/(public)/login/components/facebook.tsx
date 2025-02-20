"use client";
import { LoadingButton } from "@/components/ui/loading-button";
import { LOGIN_OAUTH } from "@/graphql/mutation";
import { getPayload, setAccessToken } from "@/lib/providers/auth";
import { useMutation } from "@apollo/client";
import { FacebookProvider, LoginButton } from "react-facebook";
import { useRouter } from "next/navigation";

const FacebookButton = () => {
  const [loginOAuth] = useMutation(LOGIN_OAUTH);
  const router = useRouter();

  const responseFacebook = (response) => {
    const input = {
      firstName: response.name.split(" ")[0] ?? response.name,
      lastName: response.name.split(" ")[1] ?? response.name,
      email: response?.email,
      type: "FB",
      data: JSON.stringify(response),
      accountId: response.userID,
      picture: response.picture.data.url,
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

  const handleError = (error: Error) => {
    console.error("Facebook login error:", error);
  };

  return (
    <FacebookProvider appId="your-app-id-here">
      <LoadingButton>
        <LoginButton
          scope="email"
          onSuccess={responseFacebook}
          onError={handleError}
        />
      </LoadingButton>
    </FacebookProvider>
  );
};

export default FacebookButton;
