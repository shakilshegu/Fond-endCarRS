import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosUser } from "../../../Api/Axiosinstance";
import { toast } from "react-hot-toast";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { useDispatch } from "react-redux";

const Otppage = () => {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = async (e) => {
    try {
      e.preventDefault();
      const enteredOtp = otp.join("");
      dispatch(showLoading());
      const response = await AxiosUser.post(`userOtp`,{ enteredOtp });
      dispatch(hideLoading());
      console.log(response.data);
      if (response.data.success) { 
        toast.success(response.data.message);
        navigate("/login")
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div class="flex flex-col items-center justify-center text-center space-y-2">
              <div class="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div class="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
              </div>
            </div>

            <div>
              <form action="" >
                <div class="flex flex-col space-y-16">
                  <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((digit, index) => (
                      <div key={index} className="w-16 h-16 ">
                        <input
                          className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          name={`otp-${index}`}
                          value={digit}
                          onChange={(e) =>{
                            handleOtpChange(index, e.target.value)
                          }
                          }
                          maxLength="1"
                        />
                      </div>
                    ))}
                  </div>
                  <div class="flex flex-col space-y-5">
                    <div>
                      <button
                        onClick={handleVerify}
                        class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>

                    <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        class="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otppage;
