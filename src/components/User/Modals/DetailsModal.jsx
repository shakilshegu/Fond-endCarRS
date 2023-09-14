import React from "react";

const DetailsModal = ({ order, onClose }) => {
  if (!order) return null;
  console.log("kkki", order);
  return (
    <div className="w-full flex justify-center items-center rounded-md">
      <div className="modal absolute top-0 w-[800px]  ">
        <div className="modal-content ">
          <span className="close bg-white w-[100px]" onClick={onClose}>
            &times;
          </span>
          <img src={order.CarId.Images[0]} alt="Car" />
          <div className="bg-slate-500">
            <p className="text-black font-bold">{order.brand}</p>
            <p>{order.CarId.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
