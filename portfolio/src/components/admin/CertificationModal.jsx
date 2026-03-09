import { useState } from "react";
import { apiUrl } from "../../utils/api";

const CertificationModal = ({ close, refresh, existing }) => {
  const [title, setTitle] = useState(existing?.title || "");
  const [issuer, setIssuer] = useState(existing?.issuer || "");
  const [year, setYear] = useState(existing?.year || "");
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null);
  const inputClassName =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 dark:bg-gray-900 dark:text-gray-100";

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = existing ? "PUT" : "POST";
    const url = existing
      ? apiUrl(`/api/certifications/${existing.id}`)
      : apiUrl("/api/certifications/create");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("issuer", issuer);
    formData.append("year", year);
    formData.append("image", image);
    formData.append("document", document);

    await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 w-full max-w-lg p-8 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-6">
          {existing ? "Edit Certification" : "Add Certification"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cert-title" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Certification Title
            </label>
            <input
              id="cert-title"
              placeholder="Enter certification title"
              className={inputClassName}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cert-issuer" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Issuer
            </label>
            <input
              id="cert-issuer"
              placeholder="Enter issuing organization"
              className={inputClassName}
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cert-year" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Year
            </label>
            <input
              id="cert-year"
              placeholder="Enter completion year"
              className={inputClassName}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cert-image" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Certificate Image
            </label>
            <input
              id="cert-image"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="cert-document" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Certificate File
            </label>
            <input
              id="cert-document"
              type="file"
              name="document"
              onChange={(e) => setDocument(e.target.files[0])}
              className={inputClassName}
            />
          </div>

          {image && (
            <p className="text-sm text-gray-500">Selected: {image.name}</p>
          )}

          {!image && existing?.image && (
            <p className="text-sm text-gray-500">
              Current: {existing.image.split("/").pop()}
            </p>
          )}

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={close}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationModal;
