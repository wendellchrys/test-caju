import { useHistory } from "react-router-dom";

export const useGoToHome = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/dashboard");
  };

  return goToHome;
};
