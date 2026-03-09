import { motion } from "framer-motion";

const CertificateModal = ({ image, onClose }) => {

  if (!image) return null;

  return (

    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={onClose}
    >

      <motion.img
        src={image}
        alt="certificate"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
      />

    </div>

  );

};

export default CertificateModal;