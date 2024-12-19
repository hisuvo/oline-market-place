/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

const JobCard = ({ job }) => {
  const [startDate, setStartDate] = useState(new Date());
  const {
    title,
    date,
    buyer,
    description,
    category,
    minPrice,
    maxPrice,
    bit_count,
  } = job || {};

  return (
    <Link
      to={`/job/1`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
          {category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">{title}</h1>

        <p className="mt-2 text-sm text-gray-600 ">
          {/* {description?.slice(0, 150)} */}
          {description?.substring(0, 150)}
          {"..."}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Range: ${maxPrice} - ${minPrice}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">
          Total Bids: {bit_count || 0}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
