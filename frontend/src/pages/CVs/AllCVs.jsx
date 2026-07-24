import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import CVList from "../../components/CV/CVList";
import { getAllCVs } from "../../services/cv.service";

export default function AllCVsPage() {
  const [cvs, setCVs] = useState([]);

  useEffect(() => {
    const loadCVs = async () => {
      try {
        const data = await getAllCVs();
        setCVs(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCVs();
  }, []);

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>
        All CVs
      </Typography>

      <CVList cvs={cvs} />
    </>
  );
}