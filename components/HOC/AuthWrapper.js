import React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { FullScreenLoader } from "../general/IsLoading";

const AuthProtect = (WrappedComponent, location, type) => {
  const ThisComponent = ({ children, user, isAuthenticated, ...props }) => {
    const router = useRouter();

    React.useEffect(() => {
      const userCredential = localStorage.getItem("USER_CREDENTIALS");
      if (type === "public" && isAuthenticated === true) {
        router.push(location);
      }

      if (type === "private" && !userCredential) {
        router.push(location);
      }

      if (Object.getOwnPropertyNames(user).length) {
        // console.log(323232, user);
        if (user.paid === false) router.push("/profile");
      }
      return () => {};
    }, [isAuthenticated, user]);

    if (type === "public") {
      if (isAuthenticated) {
        return <FullScreenLoader iconSize={50} />;
      }

      return <WrappedComponent {...props} />;
    } else if (type === "private") {
      if (!isAuthenticated) {
        return <FullScreenLoader iconSize={50} />;
      }

      return <WrappedComponent {...props} />;
    } else {
      return <FullScreenLoader iconSize={50} />;
    }
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });

  return connect(mapStateToProps)(ThisComponent);
};

export default AuthProtect;
