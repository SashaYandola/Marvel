import ErrorMessage from "../errorMessages/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  function goBack() {
    window.history.length > 1 ? navigate(-1) : navigate('/');
  }

  return (
    <div>
      <ErrorMessage />
      <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
      <Link
        to={'#'}
        onClick={goBack}
        style={{ 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'color': '#9f0013', 'marginTop': '30px' }}>Back</Link>
    </div>
  );
};

export default NotFound;
