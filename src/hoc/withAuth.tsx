"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  const Wrapper: React.FC<P> = (props) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signin");
      }
    }, [status, router]);

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withAuth;
