import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "../src/routes";

// import store from "./common/redux/store";
// console.log("Default state ===>", store.getState());

// interface BLOG {
//   description: string;
// }
// const newBlog: BLOG = { description: "dummy description" };
// store.dispatch(blogActions.addBlog(newBlog));
// console.log("Add state ===>", store.getState());

// let _id={id:1}
// store.dispatch(blogActions.removeBlog(_id));
// console.log("Remove state ===>", store.getState());

import store from "./common/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Router>
        <Provider store={store}>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Provider>
    </Router>
  );
};

export default App;
