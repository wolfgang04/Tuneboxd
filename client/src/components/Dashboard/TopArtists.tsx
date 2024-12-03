import React from 'react';

const TopArtists: React.FC = () => {
  return (
    <div data-layername="column" className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div data-layername="column" className="flex flex-col w-[34%] max-md:ml-0 max-md:w-full">
          </div>
          <div data-layername="column" className="flex flex-col ml-5 w-[66%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-right text-black max-md:mt-10 max-md:max-w-full">
              <h2 data-layername="loremIpsumDolorSitAmet" className="ml-5 text-5xl font-bold max-md:max-w-full max-md:text-4xl">
              Dive into the World of Music 
              </h2>
              <p data-layername="loremIpsumDolorSitAmetConsecteturAdipiscingElitNuncAcMollisEstPellentesqueHabitantMorbiTristiqueSenectusEtNetusEtMalesuadaFamesAcTurpisEgestas" className="mt-12 text-base font-light max-md:mt-10 max-md:mr-1 max-md:max-w-full">
              Rate albums, write reviews, and share your music journey with a community of passionate listeners. Discover new artists and revisit classics, all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default TopArtists;