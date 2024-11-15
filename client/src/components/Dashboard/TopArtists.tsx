import React from 'react';

const TopArtists: React.FC = () => {
  return (
    <div data-layername="column" className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
      <div className="grow mt-20 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div data-layername="column" className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
            <div className="flex shrink-0 mx-auto rounded-3xl aspect-square bg-stone-900 h-[244px] w-[245px] max-md:mt-10" />
          </div>
          <div data-layername="column" className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-right text-black max-md:mt-10 max-md:max-w-full">
              <h2 data-layername="loremIpsumDolorSitAmet" className="ml-5 text-5xl font-bold max-md:max-w-full max-md:text-4xl">
                Lorem ipsum dolor sit amet?
              </h2>
              <p data-layername="loremIpsumDolorSitAmetConsecteturAdipiscingElitNuncAcMollisEstPellentesqueHabitantMorbiTristiqueSenectusEtNetusEtMalesuadaFamesAcTurpisEgestas" className="mt-12 text-base font-light max-md:mt-10 max-md:mr-1 max-md:max-w-full">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac mollis est. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopArtists;