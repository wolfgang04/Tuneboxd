const SongHeader = () => {
  return (
    <thead className="text-left">
      <tr>
        <th scope="col" className="w-2/5 font-normal">
          Song
        </th>
        <th scope="col" className="font-normal">
          Artist
        </th>
        <th scope="col" className="font-normal">
          Album
        </th>
        <th scope="col" className="w-1/12 font-normal">
          Time
        </th>
      </tr>
    </thead>
  );
};

export default SongHeader;
