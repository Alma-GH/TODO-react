import AuthForm from "../components/UI/Forms/AuthForm";
import Auth from "../components/Page/Auth";
import AppPrivate from "../components/compounds/AppPrivate";


export const publicRoutes = [
  {path:"/auth/registration", element: <Auth><AuthForm reg={true}/></Auth>, exact: false},
  {path:"*", element: <Auth><AuthForm reg={false}/></Auth>, exact: false}
]

export const privateRoutes = [
  {path:"*", element: <AppPrivate/>, exact: false}
]