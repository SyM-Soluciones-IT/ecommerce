import React from "react";

function LeftSider() {
  return (
    <div className="fixed left-0 bottom-0 px-10 sm:static">
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="mailto:pena_matias@hotmail.com" target="_blank">
            <i class="ri-mail-line text-gray-600"></i>
          </a>
          <a href="https://github.com/peniamati" target="_blank">
            <i class="ri-github-fill text-gray-600"></i>
          </a>
          <a href="https://www.linkedin.com/in/peniamatias/" target="_blank">
            <i class="ri-linkedin-box-fill text-gray-600"></i>
          </a>
        </div>
        <div className="w-[1px] h-32 bg-[#125f63] sm:hidden"></div>
      </div>
    </div>
  );
}

export default LeftSider;
