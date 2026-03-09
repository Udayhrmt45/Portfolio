import { useEffect, useState } from "react";
import CertificationCarousel from "./CertificationCarousel";
import { apiUrl } from "../utils/api";

const Certifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchCertifications = async () => {
    try {
      const res = await fetch(apiUrl("/api/certifications"));
      const data = await res.json();
      setCertifications(data);
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  return (
    <section id="certifications" className="py-28 bg-white transition-colors dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading certifications...</p>
        ) : certifications.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No certifications available.</p>
        ) : (
          <CertificationCarousel certifications={certifications} />
        )}
      </div>
    </section>
  );
};

export default Certifications;
