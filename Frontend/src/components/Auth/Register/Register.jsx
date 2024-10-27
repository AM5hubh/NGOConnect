import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    registration: "",
    password: "",
    description: "",
    achievements: "",
    type: "",
    website: "",
    instagram: "",
    facebook: "",
    imageUrl: null,
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/ngouser/register",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("accessToken", res.data.accessToken);
      toast.success("NGO registered successfully!");
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data.messagetext ||
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        err.message ||
        "Something went wrong. Please try again.";

      console.error("Error response:", err.response);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Register your NGO
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Join our community and make a difference
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-8 divide-y divide-gray-700">
              <div className="space-y-6">
                <h3 className="text-lg leading-6 font-medium text-blue-300">
                  NGO Information
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300"
                    >
                      NGO Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="organization"
                        required
                        className="shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 sm:text-sm border-2 border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="registration"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Registration Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="registration"
                        id="registration"
                        required
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.registration}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Location
                    </label>
                    <div className="mt-1">
                      <input
                        id="location"
                        name="location"
                        type="location"
                        autoComplete="location"
                        required
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Contact Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="contact"
                        id="contact"
                        autoComplete="tel"
                        required
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.contact}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="new-password"
                        required
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows="3"
                        className="shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Brief description of your NGO's mission and activities.
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="achievements"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Achievements
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="achievements"
                        name="achievements"
                        rows="3"
                        className="shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.achievements}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Highlight your NGO's key accomplishments.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-blue-300">
                    Additional Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-400">
                    Provide more details about your NGO.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-300"
                    >
                      NGO Type
                    </label>
                    <div className="mt-1">
                      <select
                        name="type"
                        id="type"
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.type}
                        onChange={handleChange}
                      >
                        <option value="">Select NGO Type</option>
                        <option value="humanitarian">Humanitarian Aid</option>
                        <option value="environmental">Environmental</option>
                        <option value="education">Education</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="human-rights">Human Rights</option>
                        <option value="animal-welfare">Animal Welfare</option>
                        <option value="arts-culture">Arts & Culture</option>
                        <option value="community">Community Development</option>
                        <option value="youth">Youth Empowerment</option>
                        <option value="women">Women's Rights</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Website
                    </label>
                    <div className="mt-1">
                      <input
                        type="url"
                        name="website"
                        id="website"
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="instagram"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Instagram
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="instagram"
                        id="instagram"
                        className="h-10 p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        value={formData.instagram}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="facebook"
                      className="block text-sm font-medium text-gray-300"
                    >
                      Facebook
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="facebook"
                        id="facebook"
                        className="h-10 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-600 p-2 rounded-md bg-gray-700 text-white"
                        value={formData.facebook}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-300"
                    >
                      NGO Logo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <input
                        type="file"
                        name="imageUrl"
                        id="imageUrl"
                        accept="image/*"
                        className="ml-5 bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-700 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register NGO
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
