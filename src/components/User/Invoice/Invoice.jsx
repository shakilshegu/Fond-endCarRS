import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Invoice = () => {
  const location = useLocation();
  const data = location.state;
  const user = data[0].userId;
  const invoiceRef = useRef(null);

  const downloadAsPDF = () => {
    if (invoiceRef.current) {
      const input = invoiceRef.current;

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
        pdf.save("invoice.pdf");
      });
    }
  };

  return (
    <div>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="mb-5 pb-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-black">
              Invoice
            </h2>
          </div>

          <div className="inline-flex gap-x-2 ">
            <div ref={invoiceRef}>
              <button
                onClick={downloadAsPDF}
                className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-black shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              >
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                </svg>
                Download PDF
              </button>
            </div>
            <a
              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              href="#"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
              </svg>
              Print
            </a>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <div className="grid space-y-3">
              <dl className="grid sm:flex gap-x-3 text-sm">
                <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                  Billed to:
                </dt>
                <dd className="text-balck dark:text-black">
                  <a
                    className="inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 hover:underline font-medium"
                    href="#"
                  >
                    CarRS@.com
                  </a>
                </dd>
              </dl>

              <dl className="grid sm:flex gap-x-3 text-sm">
                <dt className="min-w-[150px] max-w-[200px] text-gray-500">
                  Billing details:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-black">
                  <span className="block font-semibold">{user?.name}</span>
                  <address className="not-italic font-normal">
                    {user?.email}
                    <br />
                    Wayanad
                    <br />
                  </address>
                </dd>
              </dl>
            </div>
          </div>

          <div>
            <div className="grid space-y-3">
              <dl className="grid sm:flex gap-x-3 text-sm">
                <dt className="min-w-[150px] max-w-[200px] text-black">
                  Invoice number:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-black">
                  0000-21
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-4 dark:border-black">
          <div className="hidden sm:grid sm:grid-cols-5">
            <div className="sm:col-span-2 text-xs font-medium text-black uppercase">
              Item
            </div>
            <div className="text-left text-xs font-medium text-black uppercase">
              Qty
            </div>
            <div className="text-left text-xs font-medium text-black uppercase">
              Rate
            </div>
            <div className="text-right text-xs font-medium text-black uppercase">
              Amount
            </div>
          </div>

          <div className="hidden sm:block border-b border-gray-200 dark:border-balck"></div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <div className="col-span-full sm:col-span-2">
              <h5 className="sm:hidden text-xs font-medium text-balck uppercase">
                Item
              </h5>
              <p className="font-medium text-gray-800 dark:text-black">
                {data[0].name}
              </p>
            </div>
            <div>
              <h5 className="sm:hidden text-xs font-medium text-black uppercase">
                Qty
              </h5>
              <p className="text-gray-800 dark:text-black">1</p>
            </div>
            <div>
              <h5 className="sm:hidden text-xs font-medium text-black uppercase">
                Rate
              </h5>
              <p className="text-gray-800 dark:text-black">1</p>
            </div>
            <div>
              <h5 className="sm:hidden text-xs font-medium text-black uppercase">
                Amount
              </h5>
              <p className="sm:text-right text-gray-800 dark:text-black">
                ${data[0].totalAmount}
              </p>
            </div>
          </div>
          <div className="sm:hidden border-b border-gray-200 dark:border-black"></div>
          <div className="sm:hidden border-b border-black dark:border-black"></div>
        </div>

        <div className="mt-8 flex sm:justify-end">
          <div className="w-full max-w-2xl sm:text-right space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                <dt className="col-span-3 text-black">Subtotal:</dt>
                <dd className="col-span-2 font-medium text-black dark:text-black">
                  ${data[0].totalAmount}
                </dd>
              </dl>

              <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                <dt className="col-span-3 text-black">Tax:</dt>
                <dd className="col-span-2 font-medium text-black dark:text-black">
                  $0.00
                </dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
                <dt className="col-span-3 text-black">Total balance:</dt>
                <dd className="col-span-2 font-medium text-black dark:text-black">
                  ${data[0].totalAmount}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
