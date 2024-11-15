import React from 'react';

const Boxbox: React.FC = () => {
  return (
    <div data-layername="column" className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow max-md:mt-3 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div data-layername="column" className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex shrink-0 mx-auto mt-20 rounded-3xl aspect-square bg-stone-900 h-[244px] w-[245px] max-md:mt-10" />
          </div>
          <div data-layername="column" className="flex flex-col ml-5 w-2/5 max-md:ml-0 max-md:w-full">
            <div className="flex z-10 shrink-0 mr-0 w-80 max-w-full rounded-3xl bg-zinc-300 h-[295px]" />
          </div>
          <div data-layername="column" className="flex flex-col ml-5 w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex shrink-0 mx-auto mt-20 rounded-3xl aspect-square bg-stone-900 h-[244px] w-[245px] max-md:mt-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxbox;