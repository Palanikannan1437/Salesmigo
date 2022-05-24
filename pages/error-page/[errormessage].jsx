import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Error from "../../components/HelperPages/Error";

const ErrorPage = () => {
  const router = useRouter();
  const [errcode, setErrcode] = useState("");
  const [errmessage, setErrmessage] = useState("");

  useEffect(() => {
    if (router.query.errormessage) {
      const arr = router.query.errormessage.split("-");
      setErrcode(arr[0]);
      setErrmessage(arr[1]);
    }
  }, [router.query]);
  return <Error errcode={errcode} errmessage={errmessage} />;
};

export default ErrorPage;
