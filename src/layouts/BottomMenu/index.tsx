import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { CgArrowsExchangeAltV } from "react-icons/cg";
import { FaChartPie } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { IoMdAddCircle } from "react-icons/io";
import { TbPigMoney } from "react-icons/tb";
const BottomMenu = () => {
  return (
    <div className="fixed z-50 w-[90%] h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-1 left-1/2 ">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {[
          { icon: <TbPigMoney />, tooltip: "Balance" },
          { icon: <FaChartPie />, tooltip: "Categorías" },
        ].map((j, i) => (
          <React.Fragment key={i}>
            <Tooltip title={j.tooltip}>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <IconButton size="large" color="secondary">
                    {j.icon}
                  </IconButton>
                </div>
              </div>
            </Tooltip>
          </React.Fragment>
        ))}
        <Tooltip title="Nueva operación">
          <div className="flex flex-col justify-center items-center">
            <div>
              <IconButton size="large" color="secondary">
                <IoMdAddCircle />
              </IconButton>
            </div>
          </div>
        </Tooltip>
        {[
          { icon: <CgArrowsExchangeAltV />, tooltip: "Transacciones" },
          { icon: <GoGraph />, tooltip: "Resumen" },
        ].map((j, i) => (
          <React.Fragment key={i}>
            <Tooltip title={j.tooltip}>
              <div className="flex flex-col justify-center items-center">
                <div>
                  <IconButton size="large" color="secondary">
                    {j.icon}
                  </IconButton>
                </div>
              </div>
            </Tooltip>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
