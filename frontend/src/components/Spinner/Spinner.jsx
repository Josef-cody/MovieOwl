import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export const MySpinner = () => {

  return (
    <div className="spinner_container">
      <div><Spinner animation="border" role="status" variant="light" className="spinner">
        <span className="visually-hidden m-auto text-light">Loading...</span>
      </Spinner>
      </div>
    </div>
  );
};

export const ErrorMessage = () => {
  const navigate = useNavigate()
  return (
    <div className="spinner_container text-light">
        <h4 className="text-light">Something went wrong!</h4>
      <div className="error-text-container">
        <p>Click </p><a href="/">here</a><p> to go to home page</p>
      </div>
    </div>
  )
};
