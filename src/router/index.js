import React from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import Dashbord from '../pages/Dashbord'
import LayoutView from '../pages/Layout'
import Rank from '../pages/Rank'
import Heroview from '../pages/Heroview'
import Revision from '../pages/Revision'
import EquipmentView from '../pages/EquipmentView'

function PageRoutes() {
    return (
        <Router>
            <Route path="/">
                <LayoutView>
                    <Switch>
                        <Route path="/dashbord" component={Dashbord} />
                        <Route path="/datalol/hero" component={Heroview} />
                        <Route path="/datalol/equipment" component={EquipmentView} />
                        <Route path="/rank" component={Rank} />
                        <Route path="/revisions" component={Revision} />
                        <Redirect to="/dashbord" from="/" />
                    </Switch>
                </LayoutView>
            </Route>
        </Router>
    )
}

export default PageRoutes
