import Home from "../pages/Home.page";
import SignUp from "../pages/SignUp.page";
import Login from "../pages/Login.page";
import ForgetPassword from "../pages/ForgetPassword.page";
import ResetPassword from "../pages/ResetPassword.page";
import Welcome from "../pages/Welcome.page";
import BlogDetails from "../pages/BlogDetails.page";
import UserProfile from "../pages/UserProfile.page";
import AddBlog from "../pages/AddBlog.page";
import ExploreTopics from "../pages/ExploreTopic.page";
import EditProfile from "../pages/EditProfile.page";
import VerifyEmail from "../pages/VerifyEmail.page";
import Notification from "../pages/Notification.page";
import EditBlog from "../pages/EditBlog.page";
export const PAGES_ROUTES = {
  welcome: "/",
  signup: "/signup",
  login: "/login",
  verifyEmail: "/verifyemail",
  forgetPassword: "/forgetpassword",
  resetPassword: "/reset",
  home: "/home",
  blogDetails: "/blog",
  addBlog: "/addblog",
  exploreTopic: "/exploretopics",
  userProfile: "/user",
  editProfile: "/editprofile",
  notification: "/notification",
  editBlog: "/editblog",
};

interface Route {
  path: string;
  Component: React.ComponentType<any>;
}
const routes: Route[] = [
  { path: PAGES_ROUTES.welcome, Component: Welcome },

  { path: PAGES_ROUTES.signup, Component: SignUp },

  { path: PAGES_ROUTES.login, Component: Login },
  { path: `${PAGES_ROUTES.verifyEmail}/:userID`, Component: VerifyEmail },
  { path: PAGES_ROUTES.forgetPassword, Component: ForgetPassword },
  { path: `${PAGES_ROUTES.resetPassword}/:token`, Component: ResetPassword },

  { path: PAGES_ROUTES.home, Component: Home },

  { path: `${PAGES_ROUTES.blogDetails}/:blogID`, Component: BlogDetails },
  { path: PAGES_ROUTES.addBlog, Component: AddBlog },
  { path: `${PAGES_ROUTES.editBlog}/:blogID`, Component: EditBlog },

  { path: PAGES_ROUTES.exploreTopic, Component: ExploreTopics },

  { path: `${PAGES_ROUTES.userProfile}/:userID`, Component: UserProfile },
  { path: `${PAGES_ROUTES.editProfile}/:userID`, Component: EditProfile },
  { path: `${PAGES_ROUTES.notification}/:userID`, Component: Notification },
];

export default routes;
