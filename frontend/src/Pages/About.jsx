import React from 'react'
import Button from '../Components/Button'
import Detailcard from '../Components/Detailcard'
import lab from '/image/lab.png'

const About = () => {
  return (
    <div className="mt-8 mx-4 sm:mx-6 md:mx-10 my-6 flex flex-collg:flex-row gap-8 p-6 md:px-16">

      {/* LEFT SECTION */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">

        <span className="
          bg-white
          rounded-full
          px-6 py-2
          w-fit
          font-semibold
          shadow-md
          text-sm sm:text-base
          text-blue-800
        ">
          About us
        </span>

        <h1 className="
          text-xl
          sm:text-2xl
          md:text-3xl
          lg:text-4xl
          font-semibold
          leading-snug
        ">
          We work for you <br className="hidden sm:block" />
          and your health
        </h1>

        <div className="text-sm sm:text-base text-gray-600 space-y-3">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>

        <Button
          name="Learn more"
          bgColor="bg-blue-800"
          textColor="text-white"
          className="
            w-full
            sm:w-1/2
            md:w-1/3
            rounded-full
            text-sm
          "
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="
        w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4
      ">
        <Detailcard name="Modern Laboratory" description="Lorem ipsum dolor sit amet." image={lab} />
        <Detailcard name="Comfortable Space" description="Lorem ipsum dolor sit amet." image={lab} />
        <Detailcard name="Experienced Doctors" description="Lorem ipsum dolor sit amet." image={lab} />
        <Detailcard name="Advanced Technologies" description="Lorem ipsum dolor sit amet." image={lab} />
      </div>

    </div>
  )
}

export default About
