import AuthForm from "../components/UI/Forms/AuthForm";
import Auth from "../components/Page/Auth";
import AppPrivate from "../components/compounds/App/AppPrivate";
import AuthNewPass from "../components/Page/AuthNewPass";


export const publicRoutes = [
  {path:"/auth/newpass", element: <Auth><AuthNewPass/></Auth>},
  {path:"/auth/registration", element: <Auth><AuthForm reg={true}/></Auth>},
  {path:"*", element: <Auth><AuthForm reg={false}/></Auth>}
]

export const privateRoutes = [
  {path:"*", element: <AppPrivate/>}
]