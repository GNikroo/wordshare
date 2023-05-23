import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import { useCurrentUser } from './contexts/CurrentUserContext';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostEditForm from './pages/posts/PostEditForm';
import PostPage from './pages/posts/PostPage';
import PostsPage from './pages/posts/PostsPage';
import ProfileEditForm from './pages/profiles/ProfileEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UserPasswordForm from './pages/profiles/UserPasswordForm';
import UsernameForm from './pages/profiles/UsernameForm';

function App() {
    const currentUser = useCurrentUser();
    const profile_id = currentUser?.profile_id || '';

    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <PostsPage
                                message='No results found. Try a different search keyword or follow a user'
                                filter={`owner__followed__owner__profile=${profile_id}&`}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/feed'
                        render={() => (
                            <PostsPage message='No results found. Try a different search keyword.' />
                        )}
                    />
                    <Route
                        exact
                        path='/liked'
                        render={() => (
                            <PostsPage
                                message='No results found. Try a different search keyword or like a post.'
                                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/signin'
                        render={() => <SignInForm />}
                    />
                    <Route
                        exact
                        path='/signup'
                        render={() => <SignUpForm />}
                    />
                    <Route
                        exact
                        path='/posts/create'
                        render={() => <PostCreateForm />}
                    />
                    <Route
                        exact
                        path='/posts/:id'
                        render={() => <PostPage />}
                    />
                    <Route
                        exact
                        path='/posts/:id/edit'
                        render={() => <PostEditForm />}
                    />
                    <Route
                        exact
                        path='/profiles/:id'
                        render={() => <ProfilePage />}
                    />
                    <Route
                        exact
                        path='/profiles/:id/edit/username'
                        render={() => <UsernameForm />}
                    />
                    <Route
                        exact
                        path='/profiles/:id/edit/password'
                        render={() => <UserPasswordForm />}
                    />
                    <Route
                        exact
                        path='/profiles/:id/edit'
                        render={() => <ProfileEditForm />}
                    />
                    <Route
                        render={() => (
                            <p>The page you're looking for doesn't exist!</p>
                        )}
                    />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
