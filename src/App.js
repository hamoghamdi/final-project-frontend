import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import ChatRoom from './chat-room/ChatRoom'
import IndexChatRooms from "./chat-room/IndexChatRooms";
import CreateChatRoom from './chat-room/CreateChatRoom';
import Home from './chat-room/Home'
import UserRooms from './chat-room/UserRooms'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible
            key={index}
            variant={alert.type}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route
            path="/sign-up"
            render={() => (
              <SignUp alert={this.alert} setUser={this.setUser} />
            )}
          />
          <Route
            path="/sign-in"
            render={() => (
              <SignIn alert={this.alert} setUser={this.setUser} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path="/chatrooms"
            render={() => <IndexChatRooms user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path="/myrooms"
            render={() => <UserRooms user={user} />}
          />
          <AuthenticatedRoute
            user={user}
            exact
            path="/chatrooms/:id"
            render={props => (
              <ChatRoom
                alert={this.alert}
                user={user}
                roomId={props.match.params.id}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/create"
            render={props => (
              <CreateChatRoom alert={this.alert} user={user} />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/sign-out"
            render={() => (
              <SignOut
                alert={this.alert}
                clearUser={this.clearUser}
                user={user}
              />
            )}
          />
          <AuthenticatedRoute
            user={user}
            path="/change-password"
            render={() => <ChangePassword alert={this.alert} user={user} />}
          />
        </main>
        <Route exact path="/" render={() => <Home  />} />
      </React.Fragment>
    );
  }
}

export default App
