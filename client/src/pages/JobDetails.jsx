import axios from "axios";
import { useContext, useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const JobDetails = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigare = useNavigate();
  const [job, setjob] = useState({});

  useEffect(() => {
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/job/${id}`
      );
      setjob(data);
      setStartDate(data.date);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();
    const form = e.target;
    const price = form.price.value;
    const email = form.email.value;
    const date = startDate;
    const comment = form.comment.value;

    const bidData = {
      title: job.title,
      category: job.category,
      jobId: job._id,
      price,
      bid_email: email,
      date,
      comment,
      status: "pending",
      buyer: job?.buyer?.email,
    };

    // user and buyer email if will be same
    // -------------------------------------
    if (user?.email === job.buyer?.email) {
      return toast.error("Action not promoted");
    }

    // If price is gaterthen Maximum parice
    // ---------------------------
    if (price > job.maxPrice) {
      toast.error(`Bid Price maximum will be ${job.maxPrice}$`);
      return;
    }

    // If Date is expire
    if (new Date() > new Date(job.date)) {
      return toast.error("Time over to bid this job");
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-bid`, bidData);
      toast.success("Bid Upload Successfuly Done");
      navigare("/my-bids");
    } catch (error) {
      toast.error(error.response?.data);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            Deadline:{" "}
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {job.category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {job.title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">
            {job.description?.slice(0, 150)}
            {"....."}
          </p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm  text-gray-600 ">
                Name: {job.buyer?.name}
              </p>
              <p className="mt-2 text-sm  text-gray-600 ">
                Email: {job.buyer?.email}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img src={job.buyer?.photo} alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: ${job.minPrice} - ${job.maxPrice}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleBid}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                disabled
                defaultValue={user?.email}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md   focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className={`px-8 ${
                user?.email === job.buyer?.email && "btn-disabled bg-red-500"
              }  py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600`}
            >
              {user?.email === job.buyer?.email ? "Disable" : "Place Bid"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
