/*
 * @Author: your name
 * @Date: 2021-10-02 07:48:04
 * @LastEditTime: 2021-10-08 02:39:19
 * @LastEditors: Shawnneosuen@outlook.com
 * @Description: In User Settings Edit
 * @FilePath: /demo-react/src/routes/PrivateRoute.tsx
 */
import { Navigate, Route, useLocation } from "react-router-dom";

interface Props {
  element: React.ReactElement;
  path?: string;
}

const PrivateElement: React.FC<Props> = ({ element }) => {
  let location = useLocation();
  let user = localStorage.getItem("userConfig") ?? "";
  return user !== "" ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export const PrivateRoute: React.FC<Props> = ({ element, ...rest }) => {
  return <Route {...rest} element={<PrivateElement element={element} />} />;
};
