"use client";
import { Clock } from "lucide-react";

const DataHora = () => {
  return (
    <div className="flex sm:gap-1 md:gap-2 lg:gap-3 xl:gap-4 items-center  sm:p-1 md:p-2 lg:p-3 xl:p-4 rounded-full bg-black/10">
      <Clock size={24} className="sm:size-4 md:size-6 lg:size-10 xl:size-12" />
      <div className="text-lg sm:text-2xl md:text-2xl lg:text-4xl xl:text-5xl  font-semibold">
        <span className="mr-3">QUI. 29/05</span>
        16:39
      </div>
    </div>
  );
};

export default DataHora;
