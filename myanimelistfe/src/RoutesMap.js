import {BrowserRouter,Routes,Route, useRoutes} from 'react-router-dom';
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {AnimeInfo} from './pages/AnimeInfo'
import {NotFound} from './pages/NotFound'
export const RoutesMap = () =>

{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/">
                        <Login />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/anime_info">
                    <AnimeInfo />
                </Route>
                <Route >
                    <NotFound />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
export default Routes;