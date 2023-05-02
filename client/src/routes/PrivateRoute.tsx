import { FC, PropsWithChildren } from "react";
import { UserRole, getUserRole } from "../store/userSlice";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface PrivateRouteProps {
  accessRoles: UserRole[];
}

const PrivateRoute: FC<PropsWithChildren<PrivateRouteProps>> = ({
  accessRoles,
  children,
}) => {
  const userRole = useAppSelector(getUserRole);
  return !accessRoles.includes(userRole!) ? (
    <Navigate to="/main" />
  ) : (
    <>{children}</>
  );
};

export default PrivateRoute;
