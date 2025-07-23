import ImagemFundoMobile from "../public/images/illustration-sign-up-mobile.svg";
import ImagemFundoTablet from "../public/images/illustration-sign-up-tablet.svg";
import ImagemFundoDesktop from "../public/images/illustration-sign-up-desktop.svg";

import IconList from "../public/images/icon-list.svg";
import IconSuccess from "../public/images/icon-success.svg";

import { useState } from "react";
import Form from "./components/form/Form";

export default function App() {
  const [success, setSuccess] = useState(false);

  const listOfInfos = [
    "Product discovery and building what matters",
    "Measuring to ensure updates are a success",
    "And much more!",
  ];
  
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-slate-700">
        <div className="bg-white p-0 md:p-6 w-full h-screen lg:h-auto lg:w-auto lg:rounded-xl">
          {!success && (
            <div className="flex flex-col-reverse lg:flex-row md:justify-between xl:max-w-4xl items-center">
              <section className="w-full md:flex-1/2 p-6 flex flex-col text-justify space-y-10">
                <h1 className="text-5xl font-bold text-center">
                  Stay updated!
                </h1>
                <p className="text-lg text-gray-700">
                  Join 60,000+ product managers receiving monthly updates on:
                </p>

                <ul className="list-inside flex flex-col space-y-4">
                  {listOfInfos.map((info, index) => (
                    <li key={index}>
                      <img src={IconList} alt="Icon" className="inline mr-2" />
                      {info}
                    </li>
                  ))}
                </ul>

                <Form onSuccess={() => setSuccess(true)} />
              </section>
              <section className="w-full md:flex-1/2 flex justify-center md:justify-end">
                <picture className="w-full lg:w-auto">
                  <source
                    media="(min-width: 1024px)"
                    srcSet={ImagemFundoDesktop}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={ImagemFundoTablet}
                  />
                  <img
                    src={ImagemFundoMobile}
                    alt="Ilustração de newsletter"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </section>
            </div>
          )}

          {success && (
            <div className="flex items-center space-y-6 h-screen md:h-full w-full lg:max-w-sm">
              <section className="w-full flex flex-col justify-center text-justify space-y-4 m-5 gap-5">
                <img
                  src={IconSuccess}
                  alt="Success Icon"
                  className="w-16 mb-6"
                />
                <div className="flex flex-col space-y-4">
                  <h2 className="text-4xl font-bold text-start text-slate-950">
                    Thanks for subscribing!
                  </h2>
                  <p className="text-gray-700">
                    A confirmation email has been sent to{" "}
                    <span className="font-bold text-shadow-blue-950">
                      ash@loremcompany.com.
                    </span>
                    Please open it and click the button inside to confirm your
                    subscription.
                  </p>
                  <button
                    className="button w-full"
                    onClick={() => setSuccess(false)}
                  >
                    Dismiss message
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
