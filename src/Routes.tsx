import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Page404 } from "./Components/404/Page404";
import { Loginization } from "./Components/Loginization/Loginization";
import { NewPassword } from "./Components/NewPassword/NewPassword";
import { PasswordRecovery } from "./Components/PasswordRecovery/PasswordRecovery";
import { Profile } from "./Components/Profile/Profile";
import { Registration } from "./Components/Registration/Registration";
import { TestPage } from "./Components/TestPage/TestPage";
import { Packs } from "./Components/Packs/Packs";
import { Cards } from "./Components/Cards/Cards";
import LearnPage from './Components/LearnPage/LearnPage';


export const PATH = {
    LOGIN: '/login',
    NEW_PASS: '/newPassword/:token',
    RECOVERY_PASS: '/recoveryPass',
    PROFILE: '/profile',
    REGISTRATION: '/registration',
    TEST_PAGE: '/testt',
    CARDS_PAGE: '/cards/:packId',
    PACKS_PAGE: '/packs',
    LEARN_PAGE: '/learn/:id'
}

function Routes() {
    return (
        <div>
            {/*//Switch выбирает первый подходящий роут*/}
            <Switch>

                {/*exact нужен чтоб указать полное совпадение (что после '/' ничего не будет)*/}
                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.NEW_PASS} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.RECOVERY_PASS} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.REGISTRATION} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.TEST_PAGE} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.PACKS_PAGE} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.CARDS_PAGE} />} />
                <Route path={'/'} exact render={() => <Redirect to={PATH.LEARN_PAGE} />} />

                <Route path={PATH.LOGIN} render={() => <Loginization />} />
                <Route path={PATH.NEW_PASS} render={() => <NewPassword />} />
                <Route path={PATH.RECOVERY_PASS} render={() => <PasswordRecovery />} />
                <Route path={PATH.PROFILE} render={() => <Profile />} />
                <Route path={PATH.REGISTRATION} render={() => <Registration />} />
                <Route path={PATH.TEST_PAGE} render={() => <TestPage />} />
                <Route path={PATH.PACKS_PAGE} render={() => <Packs />} />
                <Route path={PATH.CARDS_PAGE} render={() => <Cards />} />
                <Route path={PATH.LEARN_PAGE} render={() => <LearnPage />} />

                {/*    // add routes*/}

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route render={() => <Page404 />} />

            </Switch>
        </div>
    )
}

export default Routes
