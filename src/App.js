import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';

function App() {
    return (
        <div className={styles.App}>
            <NavBar />
            <Container className={styles.Main}>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={() => <h1>Home page</h1>}
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
                        render={() => (
                            <div>
                                <p>
                                    The page you're looking for does not exist!
                                </p>
                            </div>
                        )}
                    />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
