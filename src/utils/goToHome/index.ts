import { useHistory } from "react-router-dom";

import routes from "~/router/routes";

export const GoToHome = () => {
    console.log('executei')
    const history = useHistory();
    history.push(routes.dashboard);
}