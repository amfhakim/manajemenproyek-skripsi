import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/posts/SinglePost";
import Projects from "./pages/projects/Projects";
import Customers from "./pages/customers/Customers";
import AddCustomer from "./pages/customers/AddCustomer";
import SingleCustomer from "./pages/customers/SingleCustomer";
import Users from "./pages/users/Users";
import SingleUser from "./pages/users/SingleUser";
import Workers from "./pages/workers/Workers";
import AddWorker from "./pages/workers/AddWorker";
import SingleWorker from "./pages/workers/SingleWorker";
import SingleProject from "./pages/projects/SingleProject";
import AddProject from "./pages/projects/AddProject";
import UpdateCustomer from "./pages/customers/UpdateCustomer";
import UpdateWorker from "./pages/workers/UpdateWorker";
import AddTask from "./pages/tasks/AddTask";
import SingleTask from "./pages/tasks/SingleTask";
import UpdateTask from "./pages/tasks/UpdateTask";
import Managers from "./pages/managers/Managers";
import SingleManager from "./pages/managers/SingleManager";
import Profile from "./pages/managers/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <AuthRoute exact path="/" component={Login} />
          <AuthRoute exact path="/login" component={Login} />
          <Route exact path="/home" component={Projects} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/customers" component={Customers} />
          <Route exact path="/managers" component={Managers} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/workers" component={Workers} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/users/:userId" component={SingleUser} />
          <Route exact path="/workers/:workerId" component={SingleWorker} />
          <Route exact path="/projects/:projectId" component={SingleProject} />
          <Route
            exact
            path="/customers/:customerId"
            component={SingleCustomer}
          />
          <Route exact path="/managers/:managerId" component={SingleManager} />
          <Route exact path="/customers/addcustomer" component={AddCustomer} />
          <Route exact path="/workers/addworker" component={AddWorker} />
          <Route exact path="/projects/addproject" component={AddProject} />
          <Route
            exact
            path="/customers/:customerId/update"
            component={UpdateCustomer}
          />
          <Route
            exact
            path="/workers/:workerId/update"
            component={UpdateWorker}
          />
          <Route
            exact
            path="/projects/:projectId/addtask"
            component={AddTask}
          />
          <Route
            exact
            path="/projects/:projectId/:taskId"
            component={SingleTask}
          />
          <Route
            exact
            path="/projects/:projectId/:taskId/update"
            component={UpdateTask}
          />
          <Route exact path="/profile/:userId" component={Profile} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
