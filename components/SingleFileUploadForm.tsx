import Image from "next/image";
import { ChangeEvent, MouseEvent, useState } from "react";

const SingleFileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("application/pdf")) {
       console.log(file.type); 
      alert("Please select a valid pdf file");
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(file.name); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  const onUploadFile = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("came");
    if (!file) {
        console.log("came2");
      return;
    }

    try {
      var formData = new FormData();
      formData.append("resume", file);

      const res = await fetch("https://ankitkf.ngrok.io/candidates/upload_resume/", {
        method: "POST",
        body: formData,
        headers: {
            // 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            'Authorization': 'Token ' + '3ab2cc5d65a28f45fb2cf5a9e38579ce67cb80ec'
          }
      });

      const data = await res.json();

    //   const {
    //     data,
    //     error,
    //   }: {
    //     data: {
    //       uuid: string | string[];
    //       resume: string | string[];
    //     } | null;
    //     error: string | null;
    //   } = await res.json();

      if (data) {
        alert("Resume was uploaded successfylly");
      }
      else{
        alert("Sorry! something went wrong.");
      }
    //   if (error || !data) {
    //     alert(error || "Sorry! something went wrong.");
    //     return;
    //   }
    //   alert("File was uploaded successfylly");
    //   console.log("File was uploaded successfylly:", data);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };

  return (
    <form
      className="w-full p-3 border border-gray-500 border-dashed"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col md:flex-row gap-1.5 md:py-4">
        <div className="flex-grow">
          {previewUrl ? (
            // <div className="mx-auto w-80">
            //   <Image
            //     alt="file uploader preview"
            //     objectFit="cover"
            //     src={previewUrl}
            //     width={320}
            //     height={218}
            //     layout="fixed"
            //   />
            // </div>
            <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
            <strong className="text-sm font-medium">{previewUrl}</strong>
            <input
              className="block w-0 h-0"
              name="file"
              type="file"
              onChange={onFileUploadChange}
            />
          </label>
          ) : (
            <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <strong className="text-sm font-medium">Choose resume </strong>
              <input
                className="block w-0 h-0"
                name="file"
                type="file"
                onChange={onFileUploadChange}
              />
            </label>
          )}
        </div>
        <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">
          {/* <button
            disabled={!previewUrl}
            onClick={onCancelFile}
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
          >
            Cancel file
          </button> */}
          <button
            disabled={!previewUrl}
            onClick={onUploadFile}
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
          >
            Upload file
          </button>
        </div>
      </div>
    </form>
  );
};

export default SingleFileUploadForm;