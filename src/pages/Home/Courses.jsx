import React, { useState } from 'react'
import SectionTitle from '../../components/SectionTitle'
import { useSelector } from 'react-redux'

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const {portfolioData} = useSelector((state) => state.root)
  const {courses} = portfolioData;

  const isSpanish = courses[0].language === "ES";
  return (
    <div>
      <SectionTitle title={isSpanish ? "Cursos" : "Courses"}/>   

      <div className="flex py-10 gap-20 text-center sm:flex-col">
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] overflow-y-scroll h-[400px] w-1/3 sm:flex-row sm:overflow-x-scroll sm:w-full sm:h-fit sm:overflow-y-hidden">
          {courses.map((course, index) => (
            <div 
              onClick={() => {
                setSelectedItemIndex(index)
              }}
              className="cursor-pointer"  
            >
              <h1
                className={`text-xl px-5 py-2
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4 -ml-[2px] bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 w-2/3 items-center sm:w-full">
          <img src={courses[selectedItemIndex].image} alt="" className='max-h-[250px] w-fit'/>
          <p className="text-white">{courses[selectedItemIndex].description}</p>
          <a href={courses[selectedItemIndex].link} className="text-tertiary">View Certificate</a>
        </div>
      </div>
    </div>
  )
}

export default Courses