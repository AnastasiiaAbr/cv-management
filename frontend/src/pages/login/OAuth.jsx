import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function OAuth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const authenticate = async () => {
      try {
        await login(token);
        navigate("/");
      } catch (error) {
        console.error(error);
        navigate("/login");
      }
    };

    authenticate();
  }, [login, navigate, searchParams]);

  return <p>Signing in...</p>;
}