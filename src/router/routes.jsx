import AuthForm from "../components/UI/Forms/AuthForm";
import Auth from "../components/Page/AuthPages/Auth";
import AppPrivate from "../components/compounds/App/AppPrivate";
import AuthNewPass from "../components/Page/AuthPages/AuthNewPass";
import AuthWait from "../components/Page/AuthPages/AuthWait";


export const publicRoutes = [
  {path:"/auth/newpass", element: <Auth><AuthNewPass/></Auth>},
  {path:"/auth/wait", element: <Auth><AuthWait/></Auth>},
  {path:"/auth/registration", element: <Auth><AuthForm reg={true}/></Auth>},
  {path:"*", element: <Auth><AuthForm reg={false}/></Auth>}
]

export const privateRoutes = [
  {path:"*", element: <AppPrivate/>}
]