import React from "react";

const Products = () => {
  return (
    <>
      <div className="p-3 uppercase font-semibold bg-white text-app">
        Sản phẩm SPA
      </div>
      <div className="p-1.5 grid grid-cols-2 gap-1.5">
        {Array(6)
          .fill()
          .map((_, index) => (
            <div className="bg-white" key={index}>
              <div>
                <img src="https://mykella.vn/wp-content/uploads/2023/03/KEM-LUOI-DUONG-DA-CO-MAU-H.jpg" />
              </div>
              <div className="p-2">
                <div className="line-clamp-2 text-xs leading-4 mb-2">
                  Kem Dưỡng Trang Điểm 20 – Trung Bình
                </div>
                <div className="text-danger font-semibold text-sm">499.000đ</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export { Products };
