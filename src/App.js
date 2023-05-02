import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Route, Switch } from 'react-router-dom';
import styles from './App.module.css';
import './api/axiosDefaults';
import NavBar from './components/NavBar';
import SignInForm from './pages/auth/SignInForm';
import SignUpForm from './pages/auth/SignUpForm';

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const handleMount = async (event) => {
        try {
            const { data } = await axios.get('dj-rest-auth/user/');
            setCurrentUser(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        handleMount();
    }, []);
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
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
                                            The page you're looking for does not
                                            exist!
                                        </p>
                                    </div>
                                )}
                            />
                        </Switch>
                    </Container>
                </div>
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
